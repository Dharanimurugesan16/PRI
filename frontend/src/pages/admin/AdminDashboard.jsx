import React from "react";


const AdminDashboard = () => {


return (

<div className="min-h-screen bg-gray-100 p-8">


<h1 className="text-3xl font-bold">
Admin Dashboard
</h1>


<p className="text-gray-600 mt-2">
Manage complete PRI platform
</p>



<div className="grid md:grid-cols-4 gap-6 mt-8">


{
[
["Users","2500"],
["Companies","150"],
["Departments","20"],
["Reports","100"]
].map((item,index)=>(


<div
key={index}
className="bg-white shadow rounded-xl p-6"
>


<h3 className="text-gray-500">
{item[0]}
</h3>


<h2 className="text-3xl font-bold mt-2">
{item[1]}
</h2>


</div>


))
}


</div>




<div className="mt-10 bg-white shadow rounded-xl p-6">


<h2 className="text-xl font-bold mb-5">
Admin Controls
</h2>


<div className="flex flex-wrap gap-4">


<button className="bg-black text-white px-5 py-3 rounded-lg">
Manage Users
</button>


<button className="bg-blue-600 text-white px-5 py-3 rounded-lg">
Manage Roles
</button>


<button className="bg-green-600 text-white px-5 py-3 rounded-lg">
PRI Weightage
</button>


<button className="bg-purple-600 text-white px-5 py-3 rounded-lg">
Analytics
</button>


</div>


</div>


</div>

);


};


export default AdminDashboard;