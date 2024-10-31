import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hp-api.onrender.com/apia",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCharacters = async () => {
  const response = await apiClient.get("/characters");
  return response.data;
};

export async function fetchCharacterById(id: string) {
  const response = await apiClient.get(`/characters/${id}`);
  return response.data;
}
