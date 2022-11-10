import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import SBreadcrumb from "../../components/BreadCrumb";
import SButton from "./../../components/Button/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { getData, deleteData } from "../../utils/fetch";

import debounce from "debounce-promise";
let debouncedFetchCategories = debounce(getData, 1000);

export default function CategoriesPage() {
  const [status, setStatus] = useState("idle");
  const [alert, setAlert] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // console.log("data>>");
  // console.log(data);

  const getAPICategories = async () => {
    try {
      //untuk mengatur durasi alert bisa menggunakan setTimeout seperti ini.

      setStatus("progress");
      setTimeout(() => {
        setAlert({
          status: false,
          message: "",
        });
      }, 3000);
      const res = await debouncedFetchCategories(`/v1/cms/categories`);
      if (res.status === 200) {
        setData(res.data.data);
        setStatus("success");
      }
      // console.log(res.data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getAPICategories();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteData(`/v1/cms/categories/${id}`);
          if (res.status === 200) {
            getAPICategories();
            setAlert({
              status: true,
              message: `Berhasil hapus data ${res.data.data.name}`,
            });
          }
        } catch (error) {}
      }
    });
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(
  //       `http://localhost:9000/api/v1/cms/categories/${id}`
  //     );
  //     if (res.status === 200) {
  //       getAPICategories();

  //       setStatus(true);
  //       setMessage("Berhasil hapus data");
  //     }
  //   } catch (error) {}
  // };

  return (
    <Container>
      {alert.status && <SAlert variant="success" message={alert.message} />}

      <SBreadcrumb textSecound="Categories" />
      <SButton action={() => navigate(`/categories/create`)}>Tambah</SButton>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {status === "progress" ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                <div className="flex items-center justify-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>
                  <SButton
                    size="sm"
                    variant="success"
                    //jangan sampe salah `` dan '' itu beda, kalau link pakenya ``
                    action={() => navigate(`/categories/edit/${data._id}`)}
                  >
                    Edit
                  </SButton>
                  <SButton
                    size="sm"
                    variant="danger"
                    className="mx-2"
                    action={() => handleDelete(data._id)}
                  >
                    Hapus
                  </SButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                Tidak Ditemukan Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
