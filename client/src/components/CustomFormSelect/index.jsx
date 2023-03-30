import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getLocation } from "../../app/api/address";
import PropTypes from "prop-types";

export default function CustomFormSelect({ location, code, onChange, isInvalid, value }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocation(location, code).then(({ data }) => setLocations(data));
  }, [location, code]);

  return (
    <Form.Select disabled={locations.length === 0} onChange={(e) => onChange(e.target.value)} isInvalid={isInvalid} defaultValue="">
      <option value="">Pilih lokasi...</option>
      {locations.map((location, i) => (
        <option value={JSON.stringify({ label: location.nama, value: location.kode })} key={i}>
          {location.nama}
        </option>
      ))}
    </Form.Select>
  );
}

CustomFormSelect.defaultProps = {
  location: "provinces",
  isInvalid: false,
  value: "",
};

CustomFormSelect.propTypes = {
  location: PropTypes.oneOf(["provinces", "regencies", "districts", "villages"]).isRequired,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};
