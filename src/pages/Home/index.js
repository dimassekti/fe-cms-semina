import React, { useState, useEffect } from "react";
import Header from "../../components/Navbar";

export default function HomePage() {
  const [count, setCount] = useState(0);
  console.log("count >> state");
  console.log(count);
  // const [name, setName] = useState();
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     name: "Diam",
  //   },
  //   {
  //     id: 2,
  //     name: "Diam kedua",
  //   },
  // ]);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log("count >> useEffect", count);
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <Header />
      {console.log("count >> render", count)}
      {/* <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Nama Saya : {name}</p>
      <p>total = {count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
      {data.map((data) => (
        <ul key={data.id}>
          <li>{data.name}</li>
        </ul>
      ))} */}

      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
