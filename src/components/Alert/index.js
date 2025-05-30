import Alert from "react-bootstrap/Alert";
import React from "react";

export default function SAlert({ variant, message }) {
  return (
    <Alert className="my-2" variant={variant}>
      {message}
    </Alert>
  );
}
