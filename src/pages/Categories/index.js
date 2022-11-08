import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import SBreadcrumb from "../../components/BreadCrumb";
import SButton from "./../../components/Button/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SAlert from "../../components/Alerts";
import Swal from "sweetalert2";
import { getData, deleteData } from "../../utils/fetch";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");

  // console.log("data>>");
  // console.log(data);

  const getAPICategories = async () => {
    try {
      //untuk mengatur durasi alert bisa menggunakan setTimeout seperti ini.
      setTimeout(() => {
        setStatus(false);
        setMessage("");
      }, 3000);
      const res = await getData("/v1/cms/categories");
      // console.log(res.data);
      setData(res.data.data);
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

            setStatus(true);
            setMessage("Berhasil hapus data");
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
      {status && <SAlert variant="success" message={message} />}

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
          {data.map((data, index) => (
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
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
