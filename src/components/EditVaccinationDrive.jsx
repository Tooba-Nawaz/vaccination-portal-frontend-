import React from "react";
import Model from "./Model";
import VaccinationForm from "./VaccinationForm";

const VaccinationDriveEditModal = ({
  VaccinationDrive,
  show,
  onClose,
  onSave,
}) => {
  return (
    <Model title="Edit Vaccination Drive" show={show} onClose={onClose}>
      <VaccinationForm
        initialData={VaccinationDrive}
        onSubmit={onSave}
        buttonText="Update Vaccination Drive"
      />
    </Model>
  );
};

export default VaccinationDriveEditModal;
