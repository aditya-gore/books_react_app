import http from "./httpService";
// import { apiUrl } from "../config.json";
export function getBook(bookId) {
  return http.get("http://localhost:8000/api/getBook/" + bookId);
}

export function getBooks() {
  return http.get("http://localhost:8000/api/list");
}

export function deleteBook(bookId) {
  return http.delete("http://localhost:8000/api/delete/" + bookId);
}

export function saveBook(book) {
  if (book.id) {
    const body = { ...book };
    delete body.id;
    return http.put("http://localhost:8000/api/saveBook/" + book.id, body);
  }

  return http.post("http://localhost:8000/api/addBook" + book);
}
