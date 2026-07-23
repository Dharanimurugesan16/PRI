// // import React from "react";
// //
// //
// // const StudentDashboard = () => {
// //
// //
// // return (
// //
// // <div className="min-h-screen bg-gray-100 p-8">
// //
// //
// // <h1 className="text-3xl font-bold text-gray-800">
// // Student Dashboard
// // </h1>
// //
// //
// // <p className="text-gray-600 mt-2">
// // Track your Placement Readiness Index and improve your skills.
// // </p>
// //
// //
// //
// // <div className="grid md:grid-cols-4 gap-6 mt-8">
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // PRI Score
// // </h3>
// //
// // <h2 className="text-3xl font-bold text-blue-600">
// // 78%
// // </h2>
// //
// // <p>
// // Current readiness
// // </p>
// //
// // </div>
// //
// //
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // Assessments
// // </h3>
// //
// // <h2 className="text-3xl font-bold">
// // 12
// // </h2>
// //
// // <p>
// // Completed tests
// // </p>
// //
// // </div>
// //
// //
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // Skills
// // </h3>
// //
// // <h2 className="text-3xl font-bold">
// // 6
// // </h2>
// //
// // <p>
// // Evaluated skills
// // </p>
// //
// // </div>
// //
// //
// //
// //
// // <div className="bg-white rounded-xl shadow p-6">
// //
// // <h3 className="text-gray-500">
// // Companies
// // </h3>
// //
// // <h2 className="text-3xl font-bold">
// // 25
// // </h2>
// //
// // <p>
// // Recommended
// // </p>
// //
// // </div>
// //
// //
// //
// // </div>
// //
// //
// //
// // <div className="mt-10 bg-white rounded-xl shadow p-6">
// //
// //
// // <h2 className="text-xl font-bold mb-5">
// // Student Actions
// // </h2>
// //
// //
// //
// // <div className="flex flex-wrap gap-4">
// //
// //
// // <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
// //
// // Take Assessment
// //
// // </button>
// //
// //
// //
// // <button className="bg-gray-800 text-white px-5 py-3 rounded-lg">
// //
// // View PRI Report
// //
// // </button>
// //
// //
// //
// // <button className="bg-green-600 text-white px-5 py-3 rounded-lg">
// //
// // Track Improvement
// //
// // </button>
// //
// //
// //
// // <button className="bg-purple-600 text-white px-5 py-3 rounded-lg">
// //
// // Company Roadmap
// //
// // </button>
// //
// //
// //
// // </div>
// //
// //
// // </div>
// //
// //
// // </div>
// //
// //
// // );
// //
// //
// // };
// //
// //
// // export default StudentDashboard;
//
// import { useEffect, useState } from "react";
// import { StudentDashboardApi } from "../../api/studentDashboardApi";
//
// import WelcomeCard from "./WelcomeCard";
// import PriCard from "./PriCard";
// import QuickStats from "./QuickStats";
// import SkillBreakdown from "./SkillBreakdown";
// import CompanyReadiness from "./CompanyReadiness";
// import AptitudeTestList from "./AptitudeTestList";
//
// import "../../styles/dashboard.css";
//
// export default function StudentDashboard() {
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//
//   useEffect(() => {
//     let cancelled = false;
//     StudentDashboardApi.getSummary()
//       .then((data) => {
//         if (!cancelled) setSummary(data);
//       })
//       .catch(() => {
//         if (!cancelled) setError("Couldn't load your dashboard right now.");
//       })
//       .finally(() => {
//         if (!cancelled) setLoading(false);
//       });
//     return () => {
//       cancelled = true;
//     };
//   }, []);
//
//   if (loading) {
//     return (
//       <div className="dash-page">
//         <div className="dash-container">
//           <p>Loading your dashboard…</p>
//         </div>
//       </div>
//     );
//   }
//
//   if (error || !summary) {
//     return (
//       <div className="dash-page">
//         <div className="dash-container">
//           <p style={{ color: "#dc2626" }}>{error || "Something went wrong."}</p>
//         </div>
//       </div>
//     );
//   }
//
//   return (
//     <div className="dash-page">
//       <div className="dash-container">
//         <WelcomeCard
//           student={summary.student}
//           nextAssessment={summary.upcomingAssessments?.[0]}
//         />
//
//         <div className="dash-grid">
//           <PriCard pri={summary.pri} />
//           <QuickStats quickStats={summary.quickStats} />
//         </div>
//
//         <SkillBreakdown skills={summary.skills} />
//         <CompanyReadiness companies={summary.companies} />
//         <AptitudeTestList />
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
const navigate = useNavigate();

return (

<div className="min-h-screen bg-gray-100 p-8">


<h1 className="text-3xl font-bold text-gray-800">
Student Dashboard
</h1>


<p className="text-gray-600 mt-2">
Track your Placement Readiness Index and improve your skills.
</p>



<div className="grid md:grid-cols-4 gap-6 mt-8">


<div className="bg-white rounded-xl shadow p-6">

<h3 className="text-gray-500">
PRI Score
</h3>

<h2 className="text-3xl font-bold text-blue-600">
78%
</h2>

<p>
Current readiness
</p>

</div>




<div className="bg-white rounded-xl shadow p-6">

<h3 className="text-gray-500">
Assessments
</h3>

<h2 className="text-3xl font-bold">
12
</h2>

<p>
Completed tests
</p>

</div>




<div className="bg-white rounded-xl shadow p-6">

<h3 className="text-gray-500">
Skills
</h3>

<h2 className="text-3xl font-bold">
6
</h2>

<p>
Evaluated skills
</p>

</div>




<div className="bg-white rounded-xl shadow p-6">

<h3 className="text-gray-500">
Companies
</h3>

<h2 className="text-3xl font-bold">
25
</h2>

<p>
Recommended
</p>

</div>



</div>



<div className="mt-10 bg-white rounded-xl shadow p-6">


<h2 className="text-xl font-bold mb-5">
Student Actions
</h2>



<div className="flex flex-wrap gap-4">


<button
  className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
  onClick={() => navigate("/student/aptitude-tests")}
>
  View Assessment
</button>



<button
  className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
  onClick={() => navigate("/student/coding-tests")}
>
  Coding Tests
</button>



<button className="bg-gray-800 text-white px-5 py-3 rounded-lg">

View PRI Report

</button>



<button className="bg-green-600 text-white px-5 py-3 rounded-lg">

Track Improvement

</button>



<button className="bg-purple-600 text-white px-5 py-3 rounded-lg">

Company Roadmap

</button>



</div>


</div>


</div>


);


};


export default StudentDashboard;