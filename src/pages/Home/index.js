import axios from "axios";
import React, { useState, useEffect } from "react";
// import Header from "../../components/Navbar";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState({ status: false, msg: "" });
  const [type, setType] = useState(false);
  const [id, setId] = useState(null);

  const getAPICategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/api/v1/cms/categories"
      );
      // console.log(res.data);
      setData(res.data.data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getAPICategories();
  }, []);

  const handleSubmit = async () => {
    try {
      if (type) {
        const res = await axios.put(
          "http://localhost:9000/api/v1/cms/categories/" + id,
          { name }
        );
        if (res.status === 200) {
          getAPICategories();
        }
      } else {
        const res = await axios.post(
          "http://localhost:9000/api/v1/cms/categories",
          { name }
        );
        if (res.status === 201) {
          getAPICategories();
        }
      }
    } catch (err) {
      // console.log(err.response.data);
      setError({ status: true, msg: err.response.data.msg });
    }
  };

  const getOneCategories = async (id) => {
    const res = await axios.get(
      `http://localhost:9000/api/v1/cms/categories/${id}`
    );
    // console.log(res);
    setName(res.data.data.name);
    setId(res.data.data._id);
    setType(true);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:9000/api/v1/cms/categories/${id}`
    );
    getAPICategories();
  };

  return (
    <div>
      {error.status && <p style={{ color: "red" }}>{error.msg}</p>}
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {data.map((data, index) => (
        <ul key={index}>
          <li>{data.name}</li>
          <button onClick={() => handleDelete(data._id)}>Delete</button>
          <button onClick={() => getOneCategories(data._id)}>Edit</button>
        </ul>
      ))}
    </div>
  );
}

// export default function HomePage() {
//   const [count, setCount] = useState(0);
//   const [age, setAge] = useState(0);
//   console.log("count >> state");
//   console.log(count);
//   // const [name, setName] = useState();
//   const [data, setData] = useState([
//     {
//       id: 1,
//       name: "Diam",
//     },
//     {
//       id: 2,
//       name: "Diam kedua",
//     },
//   ]);

//   // // Similar to componentDidMount and componentDidUpdate:
//   // useEffect(() => {
//   //   // Update the document title using the browser API
//   //   console.log("count >> useEffect", count);
//   //   document.title = `You clicked ${count} times`;
//   // });

//   useEffect(() => {
//     console.log("dijalankan 1 kali saat pertama kali pages dibuka");
//   }, []); // Only re-run the effect if count changes

//   // useEffect(() => {
//   //   console.log("setiap count berubah akan dirender ulang");
//   //   setAge(count + 5);
//   // }, [count]); // Only re-run the effect if count changes

//   return (
//     <div>
//       <Header />
//       {console.log("count >> render", count)}
//       {/* <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <p>Nama Saya : {name}</p>
//       <p>total = {count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//       {data.map((data) => (
//         <ul key={data.id}>
//           <li>{data.name}</li>
//         </ul>
//       ))} */}

//       <p>You clicked {count} times</p>
//       <p>Umur Saya : {age} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }
