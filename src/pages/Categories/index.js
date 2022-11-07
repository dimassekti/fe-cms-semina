import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import Breadcrumb from "../../components/BreadCrumb";
import SButton from "./../../components/Button/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  console.log("data>>");
  console.log(data);

  const getAPICategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/api/v1/cms/categories"
      );
      console.log(res.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAPICategories();
  }, []);
  return (
    <Container>
      <Breadcrumb textSecound="Categories" />
      <SButton action={() => navigate("/categories/create")}>Tambah</SButton>
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
                  action={() => navigate("/categories/edit/${data._id}")}
                >
                  Edit
                </SButton>
                <SButton size="sm" variant="danger" className="mx-2">
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
