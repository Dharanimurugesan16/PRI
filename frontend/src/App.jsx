import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard"
import PlacementDashboard from "./pages/placement_cell/PlacementDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"


function App() {


  return (

    <BrowserRouter>


      <Routes>


        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />

         <Route
         path="/student-dashboard"
         element={<StudentDashboard/>}
         />


         <Route
         path="/placement-dashboard"
         element={<PlacementDashboard/>}
         />


         <Route
         path="/admin-dashboard"
         element={<AdminDashboard/>}
         />

      </Routes>


    </BrowserRouter>

  );

}


export default App;