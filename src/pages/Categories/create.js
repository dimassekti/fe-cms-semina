import React, { Component, useState } from "react";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/BreadCrumb";
import SForm from "./form";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alerts";
import Swal from "sweetalert2";
import { postData } from "../../utils/fetch";

export default function CategoriesCreatePage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    status: false,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });

  // console.log("form");
  // console.log(form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await postData(`/v1/cms/categories`, form);
      // console.log("res.status");
      // console.log(res.status);

      if (res.status === 201) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: `${res.data.data.name} berhasil ditambahkan`,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);
        navigate("/categories");
      }
    } catch (err) {
      // console.log(err.response);
      setIsLoading(false);
      setErrors({ ...errors, status: true, message: err.response.data.msg });
    }
  };
  return (
    <Container>
      <SBreadcrumb
        textSecound="Categories"
        urlSecound="/categories"
        textThird="Create"
      />

      {errors.status && <SAlert variant="danger" message={errors.message} />}

      <SForm
        handleSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </Container>
  );
}
