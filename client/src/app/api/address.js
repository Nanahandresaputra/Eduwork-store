import { config } from "../../config";
import axios from "axios";

export const getAddress = async () => {
  const { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

  return await axios.get(`${config.api_host}/api/delivery-addresses/`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const provinsi = async () => {
  const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`);
  return response;
};
export const kabupaten = async (q) => {
  const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${q}.json`);
  return response;
};
export const kecamatan = async (q) => {
  const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${q}.json`);
  return response;
};
export const kelurahan = async (q) => {
  const response = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${q}.json`);
  return response;
};

export const createAddress = async (data) => {
  const { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

  return await axios.post(`${config.api_host}/api/delivery-addresses`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
