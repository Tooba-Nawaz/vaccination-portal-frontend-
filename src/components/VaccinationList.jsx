import React, { useState, useEffect } from "react";
import VaccinationDriveEditModal from "./EditVaccinationDrive";

const VaccinationDriveList = ({ vaccinationDrives, setVaccinationDrives }) => {
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (drive) => {
    setSelectedDrive(drive);
    setShowModal(true);
  };

  const updateVaccinationDrive = async (updatedDrive) => {
    const response = await fetch(
      `https://localhost:7211/api/VaccinationDrive/${updatedDrive.vaccineId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDrive),
      }
    );

    if (!response.ok) throw new Error("Failed to update Vaccination Drive");

    alert("Vaccination Drive updated successfully.");
    return await response.json();
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this vaccination drive?")
    ) {
      fetch(`https://localhost:7211/api/VaccinationDrive/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            const updatedList = vaccinationDrives.filter(
              (drive) => drive.vaccineId !== id
            );
            setVaccinationDrives(updatedList);
            alert("Vaccination drive deleted successfully.");
          } else {
            console.error("Delete failed:", res.statusText);
            alert("Failed to delete vaccination drive.");
          }
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert(
            "An error occurred while trying to delete the vaccination drive."
          );
        });
    }
  };

  useEffect(() => {
    // This effect will run when vaccinationDrives updates
  }, [vaccinationDrives]);

  return (
    <>
      <div className="card p-4 shadow-lg bg-light mt-3 rounded-4">
        <div className="d-flex align-items-center mb-3 border-bottom pb-2">
          <i className="bi bi-list-check fs-4 text-primary me-2"></i>
          <h4 className="m-0 text-primary">Vaccination Drive List</h4>
        </div>

        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Vaccine ID</th>
              <th>Vaccine Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Location</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccinationDrives && vaccinationDrives.length > 0 ? (
              vaccinationDrives.map((drive, index) => (
                <tr key={index}>
                  <td>{drive.vaccineId}</td>
                  <td>{drive.vaccineName}</td>
                  <td>{drive.description}</td>
                  <td>{drive.startDate}</td>
                  <td>{drive.location}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(drive)}
                    >
                      <i className="bi bi-pencil-square me-1"></i>Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(drive.vaccineId)}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No vaccination drives found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <VaccinationDriveEditModal
        vaccinationDrive={selectedDrive}
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (updatedVaccinationDrive) => {
          try {
            await updateVaccinationDrive(updatedVaccinationDrive);
            setVaccinationDrives((prev) =>
              prev.map((d) =>
                d.vaccineId === updatedVaccinationDrive.vaccineId
                  ? updatedVaccinationDrive
                  : d
              )
            );
            setShowModal(false);
          } catch (error) {
            console.error("Error updating drive:", error);
            alert("Failed to update vaccination drive.");
          }
        }}
      />
    </>
  );
};

export default VaccinationDriveList;
