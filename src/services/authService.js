import http from "./httpService";

export function login(email, password) {
  return http.post("http://localhost:8000/api/login", { email, password });
}
