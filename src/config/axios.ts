import axios from "axios";

const axiosInstacne = axios.create({
  baseURL: "https://blog.yashuapervez.com/wp-json",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default axiosInstacne;
