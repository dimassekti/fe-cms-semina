import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import SBreadcrumb from "../../components/BreadCrumb";
import SButton from "./../../components/Button/index";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { fetchCategories } from "../../redux/categories/actions";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "./../../redux/notif/actions";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { notif, categories } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
            dispatch(fetchCategories());
            dispatch(
              setNotif(
                true,
                "success",
                `berhasil hapus kategori ${res.data.data.name}`
              )
            );
          }
        } catch (error) {}
      }
    });
  };

  return (
    <Container>
      {notif.status && (
        <SAlert variant={notif.typeNotif} message={notif.message} />
      )}

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
          {categories.status === "progress" ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                <div className="flex items-center justify-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              </td>
            </tr>
          ) : categories.data.length > 0 ? (
            categories.data.map((data, index) => (
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
