import axios from "axios";

const url = "http://127.0.0.1:8000/";

const instance = axios.create({
  baseURL: url,
});

export default instance;
