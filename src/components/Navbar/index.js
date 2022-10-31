import React from "react";
import { Link } from "react-router-dom";
import NavLink from "../NavLink";

export default function Header() {
  return (
    <ul>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </ul>
  );
}
