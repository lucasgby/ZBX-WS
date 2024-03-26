import axios from "axios";

const apiZabbixGraph = axios.create({
  withCredentials: true,
  baseURL: "http://sede.vidatel.com.br",
})

export { apiZabbixGraph };