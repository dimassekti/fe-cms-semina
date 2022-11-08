import React, { Component, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SBreadcrumb from "../../components/BreadCrumb";
import SForm from "./form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SAlert from "../../components/Alerts";
import Swal from "sweetalert2";
import { getData, putData } from "../../utils/fetch";

export default function CategoriesEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({
    status: false,
    message: "",
  });
  // console.log("id");
  // console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });

  // console.log("form");
  // console.log(form);

  //Mengambil data 1 Category
  const getOneCategories = async (id) => {
    const res = await getData(
      //jangan sampe salah `` dan '' itu beda, kalau link pakenya ``
      `/v1/cms/categories/${id}`
    );
    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    getOneCategories(id);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //logic untuk submitnya
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await putData(`/v1/cms/categories/${id}`, form);
      // console.log("res.status");
      // console.log(res.status);

      if (res.status === 200) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: `Berhasil ubah ${res.data.data.name} `,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);
        navigate("/categories");
      }
    } catch (err) {
      // console.log(err.response);
      setIsLoading(false);
      setErrors({
        ...errors,
        status: true,
        message: err.response.data.msg,
      });
    }
  };
  return (
    <Container>
      <SBreadcrumb
        textSecound="Categories"
        urlSecound="/categories"
        textThird="Edit"
      />

      {errors.status && <SAlert variant="danger" message={errors.message} />}

      <SForm
        handleSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        isLoading={isLoading}
        edit
      />
    </Container>
  );
}

// flow

// ambil dari logic add/submit kategori
// get categori
// set form
// benerin dibagian logic submit
