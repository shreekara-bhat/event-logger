import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/events";

export const logEvent = async (event) => {
  return await axios.post(`${API_BASE_URL}`, event);
};

export const getEvents = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  return await axios.get(`${API_BASE_URL}?${query}`);
};

export const validateChain = async () => {
  return await axios.get(`${API_BASE_URL}/validate`);
};
