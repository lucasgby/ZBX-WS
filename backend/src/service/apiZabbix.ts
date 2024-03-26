import axios from "axios";
import { CONSTANTS } from "../config/server";

const apiZabbix = axios.create({
    baseURL: CONSTANTS.API_ZBX
});

export { apiZabbix };