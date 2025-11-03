import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Home!</h1>
      <div className="flex gap-4">
        <Link
          to="/user-form"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New User
        </Link>
        <Link
          to="/user-list"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Users List
        </Link>
      </div>
    </div>
  );
}

export default Home;
