import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Students from "./Students";
import VaccinationDrive from "./VaccinationDrive";
// import ManageStudents from "../pages/ManageStudents";

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarOnRoutes = ["/"]; // Add any routes where navbar shouldn't be shown

  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />{" "}
        <Route path="/VaccinationDrive" element={<VaccinationDrive />} />
        {/* <Route path="/ManageStudents" element={<ManageStudents />} /> */}
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
