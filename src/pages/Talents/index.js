import React, { useEffect, useState } from "react";
import { Container, Table, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import SBreadcrumb from "../../components/BreadCrumb";
import SButton from "./../../components/Button/index";
import SearchInput from "../../components/SearchInput";
import { getData } from "../../utils/fetch";

import { config } from "../../configs";
import debounce from "debounce-promise";
let debouncedFetchTalents = debounce(getData, 1000);

export default function TalentsPage() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  console.log("data");
  console.log(data);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const getAPITalents = async () => {
    setStatus("progress");
    const params = {
      keyword,
    };
    const res = await debouncedFetchTalents("/v1/cms/talents", params);
    if (res.status === 200) {
      setData(res.data.data);
      setStatus("success");
    }
  };
  useEffect(() => {
    getAPITalents();
  }, [keyword]);

  return (
    <Container>
      <SBreadcrumb textSecound="Talents" />
      <SButton className="mb-3" action={() => navigate(`/talents/create`)}>
        Tambah
      </SButton>
      <SearchInput handleChange={handleKeyword} query={keyword} />
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Avatar</th>
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
                <td>{data.role}</td>
                <td>
                  <Image
                    height={40}
                    width={40}
                    roundedCircle
                    src={`${config.api_image}/${data.image.name}`}
                  />
                </td>
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
                    // action={() => handleDelete(data._id)}
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
