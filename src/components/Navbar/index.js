import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import NavLink from "../NavLink";

export default function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/talents">Talents</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/payments">Payments</NavLink>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
