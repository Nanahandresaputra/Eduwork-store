import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { createAddress, kabupaten, kecamatan, kelurahan, provinsi } from "../../app/api/address";
import { useHistory } from "react-router";

let schema = yup
  .object({
    nama: yup.string().required("Nama alamat harus diisi"),
    detail: yup.string().required("Detail alamat harus diisi"),
    provinsi: yup.string().required("Provinsi belum dipilih").nullable(),
    kabupaten: yup.string().required("Kabupaten belum dipilih").nullable(),
    kecamatan: yup.string().required("Kecamatan belum dipilih").nullable(),
    kelurahan: yup.string().required("kelurahan belum dipilih").nullable(),
  })
  .required();

export default function AddAddress() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [apiProvinsi, setApiProvinsi] = useState("");
  const [apiKabupaten, setApiKabupaten] = useState("");
  const [apiKecamatan, setApiKecamatan] = useState("");
  const [apiKelurahan, setApiKelurahan] = useState("");
  const [status, setStatus] = useState("idle");
  const history = useHistory();

  let onSubmit = async (data) => {
    const payload = {
      nama: data.nama,
      detail: data.detail,
      provinsi: data.provinsi,
      kabupaten: data.kabupaten,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
    };
    setStatus("process");
    if (!data.errors) {
      setStatus("success");
      createAddress(payload);
      history.push("/account/address");
      console.log(payload);
    }
  };

  let handleProvId = (q) => {
    kabupaten(q.target.options[q.target.selectedIndex].getAttribute("code")).then((res) => setApiKabupaten(res.data));
  };

  let handleKabId = (q) => {
    kecamatan(q.target.options[q.target.selectedIndex].getAttribute("code")).then((res) => setApiKecamatan(res.data));
  };

  let handleKecId = (q) => {
    kelurahan(q.target.options[q.target.selectedIndex].getAttribute("code")).then((res) => setApiKelurahan(res.data));
  };

  useEffect(() => {
    provinsi().then((res) => setApiProvinsi(res.data));
  }, []);

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Masukan nama" {...register("nama")} isInvalid={errors.nama} />
                <Form.Control.Feedback type="invalid" className="text-danger text-center">
                  {errors.nama?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Detail alamat</Form.Label>
                <Form.Control as="textarea" rows={9} placeholder="Masukan detail alamat" {...register("detail")} isInvalid={errors.detail} />
                <Form.Control.Feedback type="invalid" className="text-danger text-center">
                  {errors.detail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <div>
                <label>Provinsi: </label>
                <Form.Select aria-label="Default select example" {...register("provinsi")} isInvalid={errors.provinsi} onChange={handleProvId}>
                  <option value="">Pilih lokasi...</option>
                  {apiProvinsi &&
                    apiProvinsi.map((index, i) => (
                      <option key={i} value={index.name} code={index.id}>
                        {index.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="text-danger text-center">
                  {errors.provinsi?.message}
                </Form.Control.Feedback>

                <label>Kabupaten: </label>
                <Form.Select aria-label="Default select example" {...register("kabupaten")} isInvalid={errors.kabupaten} onChange={handleKabId}>
                  <option value="">Pilih lokasi...</option>
                  {apiKabupaten &&
                    apiKabupaten.map((index, i) => (
                      <option key={i} value={index.name} code={index.id}>
                        {index.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="text-danger text-center">
                  {errors.kabupaten?.message}
                </Form.Control.Feedback>

                <label>Kecamatan: </label>
                <Form.Select aria-label="Default select example" {...register("kecamatan")} isInvalid={errors.kecamatan} onChange={handleKecId}>
                  <option value="">Pilih lokasi...</option>
                  {apiKecamatan &&
                    apiKecamatan.map((index, i) => (
                      <option key={i} value={index.name} code={index.id}>
                        {index.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="text-danger text-center">
                  {errors.kecamatan?.message}
                </Form.Control.Feedback>

                <label>Kelurahan: </label>
                <Form.Select aria-label="Default select example " {...register("kelurahan")} isInvalid={errors.kelurahan}>
                  <option value="">Pilih lokasi...</option>
                  {apiKelurahan && apiKelurahan.map((index, i) => <option key={i}>{index.name}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="text-danger text-center">
                  {errors.kelurahan?.message}
                </Form.Control.Feedback>

                <Button style={{ width: "95%" }} variant="primary" type="submit" disabled={status === "process"}>
                  {status === "process" ? "process..." : "simpan"}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
