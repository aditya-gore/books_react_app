import http from "./httpService";
// import { apiUrl } from "../config.json";

export function getGenres() {
  return http.get("http://localhost:8000/api/getGenres");
}
