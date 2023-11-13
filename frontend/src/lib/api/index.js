import axios from "axios";
import { ERROR_CODES, HTTP_METHODS, STATUS_CODES } from "./const";

export async function request({
  baseURL = "http://127.0.0.1:8000",
  body = null, // eg. for POST
  method = HTTP_METHODS.get,
  token = "",
  url = "",
}) {
  return axios({
    baseURL,
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body,
  });
}
