import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())    // res.json() converts the response body into a JavaScript object/array.
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const flterData = data.filter((d) => d.title.toLowerCase().includes(input.toLowerCase()))

  return (
    <>
      <div className='input'>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className='border-2 border-black p-2 ml-5 mt-4' placeholder='Filter Title' />
      </div>
      <div className='p-5'>
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
            {
              flterData.length > 0 ?
                (flterData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.userId}</td>
                    <td>{item.body}</td>
                  </tr>
                )))
                :
                <tr>
                  <td colSpan="4" className="ml-5 mt-2">
                    No data found
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App