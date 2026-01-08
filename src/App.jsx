import React, { useEffect, useState } from "react";
import { getApiData } from "./services/dummyApi";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1)

  // 2) Using axios instance
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const response = await getApiData()
    setData(response?.data)
  }

  // 1) Using fetch() api method
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json()) // res.json() converts the response body into a JavaScript object/array.
  //     .then((result) => {
  //       console.log(result);
  //       setData(result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);


  // Filter data
  const flterData = data.filter((d) =>
    d.title.toLowerCase().includes(input.toLowerCase())
  );

  // For pagination
  useEffect(() => {
    setCurrentPage(1)
  }, [input])

  const itemsPerPage = 10;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedData = flterData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(flterData.length / itemsPerPage);

  return (
    <>
      <div className="flex justify-between mr-5">
        <div className="input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-black p-2 ml-5 mt-4"
            placeholder="Filter Title"
          />
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex gap-3 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="border px-3 py-1"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="border px-3 py-1"
          >
            Next
          </button>
        </div>
      </div>

      <div className="p-5">
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User ID</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.userId}</td>
                  <td>{item.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="ml-5 mt-2">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default App;