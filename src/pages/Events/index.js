import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import SBreadcrumb from "../../components/BreadCrumb";
import SButton from "./../../components/Button/index";
import SearchInput from "../../components/SearchInput";
import { deleteData, getData } from "../../utils/fetch";
import Swal from "sweetalert2";

import debounce from "debounce-promise";
import SAlert from "../../components/Alert";
import SelectBox from "./../../components/SelectBox";

let debouncedFetchEvents = debounce(getData, 1000);

export default function EventPage() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  //talents
  const [talent, setTalent] = useState(null);
  const [listTalents, setListTalents] = useState([]);
  //category
  const [category, setCategory] = useState(null);
  const [listCategories, setListCategories] = useState([]);

  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: "",
  });

  console.log("category");
  console.log(category);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const getAPIEvents = async () => {
    setTimeout(() => {
      setAlert({ status: false, message: "" });
    }, 5000);

    setStatus("progress");
    let params = {
      keyword,
    };

    if (category) {
      params = { ...params, category: category.value };
    }
    if (talent) {
      params = { ...params, talent: talent.value };
    }
    const res = await debouncedFetchEvents("/v1/cms/events", params);
    if (res.status === 200) {
      setData(res.data.data);
      setStatus("success");
    }
  };
  useEffect(() => {
    getAPIEvents();
  }, [keyword, category, talent]);

  const getApiListCategories = async () => {
    const res = await getData(`/v1/cms/categories`);
    console.log(res);
    const temp = [];
    res.data.data.forEach((res) => {
      temp.push({
        value: res._id,
        label: res.name,
      });
    });
    setListCategories(temp);
  };

  const getApiListTalents = async () => {
    const res = await getData(`/v1/cms/talents`);
    console.log(res);
    const temp = [];
    res.data.data.forEach((res) => {
      temp.push({
        value: res._id,
        label: res.name,
      });
    });
    setListTalents(temp);
  };

  useEffect(() => {
    getApiListCategories();
    getApiListTalents();
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
          const res = await deleteData(`/v1/cms/events/${id}`);
          if (res.status === 200) {
            getAPIEvents();
            setAlert({
              status: true,
              message: `Berhasil hapus event ${res.data.data.title}`,
            });
          }
        } catch (error) {}
      }
    });
  };

  return (
    <Container>
      {alert.status && <SAlert variant="success" message={alert.message} />}

      <SBreadcrumb textSecound="Events" />
      <SButton className="mb-3" action={() => navigate(`/events/create`)}>
        Tambah
      </SButton>
      <Row>
        <Col>
          <SearchInput handleChange={handleKeyword} query={keyword} />

          {/* <SearchInput
            name="keyword"
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          /> */}
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian kategori"}
            value={category}
            options={listCategories}
            isClearable={true}
            handleChange={(value) => setCategory(value)}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian pembicara"}
            value={talent}
            options={listTalents}
            isClearable={true}
            handleChange={(value) => setTalent(value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Tempat</th>
            <th>Status</th>
            <th>Kategori</th>
            <th>Pembicara</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {status === "progress" ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                <div className="flex items-center justify-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((data, index) => (
              <tr key={index}>
                <td>{data.title}</td>
                <td>{data.venueName}</td>
                <td>{data.statusEvent}</td>
                <td>{data.category.name}</td>
                <td>{data.talent.name}</td>

                <td>
                  <SButton
                    size="sm"
                    variant="success"
                    //jangan sampe salah `` dan '' itu beda, kalau link pakenya ``
                    action={() => navigate(`/events/edit/${data._id}`)}
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
              <td colSpan={6} style={{ textAlign: "center" }}>
                Tidak Ditemukan Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
