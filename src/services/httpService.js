import axios from "axios";
import { toast, Slide } from "react-toastify";
// import logger from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // console.log("Logging the error", error);
    // logger.log(error);
    toast.error("Operation failed! An unexpected error occured,", {
      position: toast.POSITION.TOP_CENTER,
      transition: Slide,
      autoClose: 2000,
    });
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
