import React from "react";
import { useNavigate } from "react-router-dom";

const PlacementDashboard = () => {

    const navigate = useNavigate();
    return (

        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Placement Cell Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
                Monitor student placement preparation and manage placement activities.
            </p>

            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Total Students
                    </h3>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        2500
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Registered students
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Average PRI Score
                    </h3>

                    <h2 className="text-3xl font-bold text-green-600 mt-2">
                        72%
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Student readiness
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Training Required
                    </h3>

                    <h2 className="text-3xl font-bold text-red-600 mt-2">
                        340
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Students need improvement
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-gray-500">
                        Placement Reports
                    </h3>

                    <h2 className="text-3xl font-bold text-purple-600 mt-2">
                        50
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Reports generated
                    </p>
                </div>
            </div>

            {/* Placement Controls */}
            <div className="bg-white rounded-xl shadow p-6 mt-10">

                <h2 className="text-xl font-bold text-gray-800 mb-5">
                    Placement Cell Controls
                </h2>

                <div className="flex flex-wrap gap-4">
                    <button
                        className="
                        bg-blue-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-blue-700
                        "
                        onClick={() => navigate("/placement/aptitude-tests/publish")}
                    >
                        Create Aptitude Assessment
                    </button>

                    <button
                        className="
                        bg-indigo-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-indigo-700
                        "
                        onClick={() => navigate("/placement/coding-tests/publish")}
                    >
                        Create Coding Assessment
                    </button>

                    <button
                        className="
                        bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-green-700
                        "
                        onClick={() => navigate("/placement/coding-tests/manage")}
                    >
                        Review Violations &amp; Results
                    </button>

                    <button
                        className="
                        bg-purple-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-purple-700
                        "
                    >
                        Department Statistics
                    </button>

                    <button
                        className="
                        bg-gray-800
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-gray-900
                        "
                    >
                        Generate Reports
                    </button>
                </div>
            </div>

            {/* Student Performance Section */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

                <div
                    className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg"
                    onClick={() => navigate("/placement/coding-tests/publish")}
                >
                    <h3 className="font-bold text-lg">
                        Technical Assessment
                    </h3>

                    <p className="text-gray-600 mt-2">
                        Create and evaluate coding and technical tests.
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="font-bold text-lg">
                        Aptitude Training
                    </h3>

                    <p className="text-gray-600 mt-2">
                        Track aptitude improvement and performance.
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="font-bold text-lg">
                        Resume Review
                    </h3>

                    <p className="text-gray-600 mt-2">
                        Review resumes and provide feedback.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default PlacementDashboard;