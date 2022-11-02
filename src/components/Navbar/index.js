import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "../NavLink";

export default function Header() {
  const [token, setToken] = useState(true);
  return (
    <ul>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      {token ? <NavLink to="/about">Logout</NavLink> : <>login</>}
    </ul>
  );
}
