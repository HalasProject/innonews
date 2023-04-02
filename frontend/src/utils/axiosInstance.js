import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message === "Unauthenticated.") {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
