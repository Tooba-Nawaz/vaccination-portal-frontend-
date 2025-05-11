import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const metrics = {
    totalStudents: 15,
    vaccinatedStudents: 7,
    vaccinationRate: 46.6,
    upcomingDrives: [
      {
        vaccineId: 16,
        vaccineName: "Hepatitis-A",
        date: "2025-06-10T15:30:00",
        location: "Main Hall",
      },
      {
        vaccineId: 15,
        vaccineName: "Covid-19",
        date: "2025-05-30T12:00:00",
        location: "Medical Room",
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary text-center">Dashboard Overview</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Total Students</h5>
            <p className="fs-3 fw-bold text-dark">{metrics.totalStudents}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Vaccinated Students</h5>
            <p className="fs-3 fw-bold text-success">
              {metrics.vaccinatedStudents}
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Vaccination Rate</h5>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${metrics.vaccinationRate}%` }}
                aria-valuenow={metrics.vaccinationRate}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {metrics.vaccinationRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4>Upcoming Vaccination Drives (Next 30 Days)</h4>
        {metrics.upcomingDrives.length > 0 ? (
          <div className="row">
            {metrics.upcomingDrives.map((drive) => (
              <div className="col-md-6 mb-3" key={drive.vaccineId}>
                <div className="card shadow-sm p-3">
                  <div className="card-body">
                    <h5 className="card-title">{drive.vaccineName}</h5>
                    <p className="card-text">
                      <strong>Date:</strong> {drive.date} <br />
                      <strong>Location:</strong> {drive.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            No upcoming vaccination drives scheduled within the next 30 days.
          </div>
        )}
      </div>

      <div className="d-flex gap-4 mt-4 justify-content-center">
        <Link
          to="/students"
          className="btn btn-lg btn-outline-primary d-flex align-items-center"
        >
          <i className="bi bi-person-fill me-2"></i> Manage Students
        </Link>
        <Link
          to="/VaccinationDrive"
          className="btn btn-lg btn-outline-success d-flex align-items-center"
        >
          <i className="bi bi-calendar-check-fill me-2"></i> Manage Vaccination
          Drives
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
