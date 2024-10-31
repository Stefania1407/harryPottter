import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hp-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCharacters = async () => {
  const response = await apiClient.get("/characters");
  return response.data;
};
