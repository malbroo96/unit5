import React from "react";
import Form from "./Form.jsx";

export default function Home() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const [page, setPage] = React.useState(1);
  const limit = 10;

  return (
    <div className="min-h-screen bg-linear-to-br from-peach-100 via-rose-100 to-green-100 text-red-800">
      <nav className="flex justify-between bg-green-200 p-2 shadow-md">
        <h1 className="text-2xl font-bold text-green-400 ">Health Tracker</h1>{" "}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold  px-4 rounded">
          Logout
        </button>
      </nav>
      <div>
        <Form/>
        {data.slice((page - 1) * limit, page * limit).map((char) => {
          return (
            <div key={char.id}>
              {char.id} . {char.title}
            </div>
          );
        })}
        <button onClick={() => setPage(page - 1)}>previous</button>
        <br />
        <>curent page: {page}</>
        <br />
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
