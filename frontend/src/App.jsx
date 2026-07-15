import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard"
import PlacementDashboard from "./pages/placement_cell/PlacementDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"

import PublishAptitudeTest from "./pages/placement_cell/PublishAptitudeTest";
import AptitudeTestList from "./pages/student/AptitudeTestList";
import AptitudeTestRunner from "./pages/student/AptitudeTestRunner";
import AptitudeTestResult from "./pages/student/AptitudeTestResult";



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

         {/* Aptitude Evaluation - placement */}
         <Route
         path="/placement/aptitude-tests/publish"
         element={<PublishAptitudeTest/>}
         />

         {/* Aptitude Evaluation - student */}
         <Route
         path="/student/aptitude-tests"
         element={<AptitudeTestList/>}
         />

         <Route
         path="/student/aptitude-tests/:testId/take"
         element={<AptitudeTestRunner/>}
         />

         <Route
         path="/student/aptitude-tests/:testId/result"
         element={<AptitudeTestResult/>}
         />

      </Routes>


    </BrowserRouter>

  );

}


export default App;