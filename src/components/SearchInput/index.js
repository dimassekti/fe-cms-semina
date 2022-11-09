import React from "react";
import { Form } from "react-bootstrap";

function SearchInput({ handleChange, query, disabled }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        disabled={disabled}
        type="text"
        placeholder="Masukan pencarian disini"
        value={query}
        name="query"
        onChange={handleChange}
      />
    </Form.Group>
  );
}

export default SearchInput;

//Alasan kenapa tidak digabung dengan textinput

//agar placeholder tidak mengganggu
//agar lebih mudah dimaintenance
//khusus untuk filter keyword
