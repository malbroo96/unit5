import React from "react";
import Form from "./Form.jsx";

export default function Home() {
  const [data, setData] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const limit = 10;

  React.useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((json) => setData(json.Result.Items.Item))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 text-gray-800">
      <nav className="flex justify-between items-center bg-green-200 p-3 shadow-md">
        <h1 className="text-2xl font-bold text-emerald-700">Health Tracker</h1>
        <button  onClick={()=>{
          window.location.href="/"
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-1 rounded">
          Logout
        </button>
      </nav>

      <div className="flex items-center justify-center mt-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-emerald-500 hover:to-green-600 active:scale-95 transition-all duration-200 ease-in-out"
        >
          Enter Your Data
        </button>
      </div>

      {isOpen && (
       
          <Form />
      )}

      <div className="p-4">
        {data.length > 0 ? (
          data.slice((page - 1) * limit, page * limit).map((item, idx) => (
            <div
              key={item.Id}
              className="p-2 border-b border-emerald-200 hover:bg-emerald-50"
            >
              {idx + 1 + (page - 1) * limit}. {item.Title}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">Loading data...</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 p-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-emerald-500 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">Current Page: {page}</span>
        <button
          disabled={page * limit >= data.length}
          onClick={() => setPage(page + 1)}
          className="bg-emerald-500 text-white px-4 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
