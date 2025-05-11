import React, { useState, useEffect } from "react";
import VaccinationForm from "./components/VaccinationForm";
import VaccinationDriveList from "./components/VaccinationList";

const VaccinationDrive = () => {
  const [vaccinationDrives, setVaccinationDrives] = useState([]);

  const fetchVaccinationDrives = async () => {
    try {
      const response = await fetch(
        "https://localhost:7211/api/VaccinationDrive"
      );
      const data = await response.json();
      setVaccinationDrives(data.vaccinationDrives);
      console.log(data);
    } catch (error) {
      console.error("Error fetching vaccination drives:", error);
    }
  };

  useEffect(() => {
    fetchVaccinationDrives();
  }, []);

  const handleAddVaccinationDrives = async (vaccinationDriveData) => {
    try {
      const response = await fetch(
        "https://localhost:7211/api/VaccinationDrive",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vaccinationDriveData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save Vaccination Drive");
      }

      const data = await response.json();
      alert("Vaccination Drive saved successfully!");
      setVaccinationDrives((prev) => [...prev, vaccinationDriveData]);
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving Vaccination Drive. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary text-center">
        Manage Vaccination Drives
      </h2>
      <VaccinationForm
        onSubmit={handleAddVaccinationDrives}
        buttonText="Add Vaccination Drive"
      />
      <VaccinationDriveList
        vaccinationDrives={vaccinationDrives || []}
        setVaccinationDrives={setVaccinationDrives}
      />
    </div>
  );
};

export default VaccinationDrive;
