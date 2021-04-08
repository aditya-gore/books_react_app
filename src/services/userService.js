import http from "./httpService";

export function register(user) {
  return http.post("http://localhost:8000/api/register", {
    name: user.name,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
  });
}

export function getUserById(userId) {
  return http.get("http://localhost:8000/api/getUserById/" + userId);
}
