import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Students = () => {
  const [student, setStudent] = useState({
    id: null,
    student: "",
    className: "",
    age: "",
    vaccinationStatus: "",
  });

  const [newStudent, setNewStudent] = useState({
    student: "",
    className: "",
    age: "",
    vaccinationStatus: "",
  });

  const [students, setStudents] = useState([]);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable("#studentsTable")) {
      $("#studentsTable").DataTable().destroy();
    }

    if (students.length > 0) {
      setTimeout(() => {
        $("#studentsTable").DataTable();
      }, 100);
    }
  }, [students]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("https://localhost:7211/api/Student");
      const data = await res.json();

      // If the response is an object with a 'students' array
      if (data && Array.isArray(data.students)) {
        setStudents(data.students);
      } else {
        console.error("Expected an object with a 'students' array, got:", data);
        setStudents([]); // fallback to avoid .map error
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = newStudent.id ? "PUT" : "POST";
      const url = newStudent.id
        ? `https://localhost:7211/api/Student/${newStudent.id}`
        : "https://localhost:7211/api/Student";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (res.ok) {
        alert(
          newStudent.id ? "Student updated successfully!" : "Student added!"
        );
        setNewStudent({
          student: "",
          className: "",
          age: "",
          vaccinationStatus: "",
        });
        setIsModalOpen(false);
        fetchStudents();
      }
    } catch (error) {
      console.error("Error submitting student:", error);
    }
  };

  const handleEdit = (s) => {
    setNewStudent(s); // Set the student data for the modal separately
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      const res = await fetch(`https://localhost:7211/api/Student/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Student deleted successfully!");
        fetchStudents();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();

    // Check if a file is selected
    if (!file) {
      alert("Please select a file.");
      return;
    }

    // Read the CSV file
    Papa.parse(file, {
      complete: async (result) => {
        const studentsData = result.data;

        // Assuming the CSV columns are student name, class, age, vaccination status
        const students = studentsData.map((row) => ({
          student: row[0], // Name
          className: row[1], // Class
          age: row[2], // Age
          vaccinationStatus: row[3], // Vaccination Status
        }));

        // Send the data to the backend
        try {
          const res = await fetch("https://localhost:7211/api/Student/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ students }), // Sending students array to backend
          });

          if (res.ok) {
            alert("CSV uploaded successfully!");
            fetchStudents(); // Refresh the students list
          } else {
            alert("Error uploading CSV.");
          }
        } catch (error) {
          console.error("Error uploading CSV:", error);
          alert("Error uploading CSV.");
        }
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary text-center">Manage Students</h2>
      {/* Card for adding student */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Add a Student</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <input
                name="student"
                placeholder="Name"
                className="form-control"
                value={newStudent.student}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                name="className"
                placeholder="Class"
                className="form-control"
                value={newStudent.className}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                name="age"
                placeholder="Age"
                type="number"
                className="form-control"
                value={newStudent.age}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <select
                name="vaccinationStatus"
                className="form-select"
                value={newStudent.vaccinationStatus}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Vaccinated">Vaccinated</option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-center">
              <button type="submit" className="btn btn-primary w-100">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Card for CSV upload */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3 className="card-title">Upload CSV</h3>
          <form onSubmit={handleCsvUpload} className="d-flex gap-2">
            <input
              type="file"
              accept=".csv"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="btn btn-secondary">
              Upload
            </button>
          </form>
        </div>
      </div>

      {/* Students Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">All Students</h3>
          <table
            id="studentsTable"
            className="table table-striped table-bordered table-hover"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.student}</td>
                  <td>{s.id}</td>
                  <td>{s.className}</td>
                  <td>{s.age}</td>
                  <td>{s.vaccinationStatus}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing student */}
      {isModalOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="student"
                      className="form-control"
                      value={newStudent.student}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Class</label>
                    <input
                      type="text"
                      name="className"
                      className="form-control"
                      value={newStudent.className}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      value={newStudent.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Vaccination Status</label>
                    <select
                      name="vaccinationStatus"
                      className="form-select"
                      value={newStudent.vaccinationStatus}
                      onChange={handleChange}
                    >
                      <option value="">Select Status</option>
                      <option value="Vaccinated">Vaccinated</option>
                      <option value="Not Vaccinated">Not Vaccinated</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
