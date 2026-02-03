import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// MENU
export const getMenuCards = async () => {
  const res = await API.get("/menucards");
  return res.data;
};

export const getBuilderItem = async (id) => {
  const res = await API.get(`/menubuilder/${id}`);
  return res.data;
};

// VIDEOS
export const getVideos = async (id) => {
  const res = await API.get(`/videos/${id}`);
  return res.data;
};

// AUTH
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);


