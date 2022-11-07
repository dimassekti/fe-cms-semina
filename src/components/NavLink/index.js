import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavLink({ to, children }) {
  const navigate = useNavigate();

  const action = (to) => {
    navigate(to);
  };

  return <Nav.Link onClick={() => action(to)}>{children}</Nav.Link>;
}
