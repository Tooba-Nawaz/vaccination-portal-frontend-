import React, { useState } from "react";

const VaccinationDriveForm = ({
  initialData = {},
  onSubmit,
  buttonText = "Save Drive",
}) => {
  const [drive, setDrive] = useState({
    vaccineName: "",
    date: "",
    location: "",
    description: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrive((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(drive);
  };

  return (
    <div className="card p-4 shadow-lg rounded-4 bg-light">
      <div className="mb-4 border-bottom pb-2 d-flex align-items-center">
        <i className="bi bi-clipboard-plus fs-4 me-2 text-primary"></i>
        <h4 className="m-0 text-primary">Vaccination Drive Form</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-4">
            <label htmlFor="vaccineName" className="form-label">
              Vaccine Name
            </label>
            <input
              type="text"
              name="vaccineName"
              id="vaccineName"
              className="form-control"
              placeholder="e.g. Polio"
              value={drive.vaccineName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="driveDate" className="form-label">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="driveDate"
              className="form-control"
              placeholder="Select date"
              value={drive.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              className="form-control"
              placeholder="e.g. Medical Room"
              value={drive.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="form-label">
            Description (optional)
          </label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            placeholder="e.g. Students in Grade 1-5"
            rows="4"
            value={drive.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary px-4 py-2">
            <i className="bi bi-check-circle me-2"></i>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VaccinationDriveForm;
