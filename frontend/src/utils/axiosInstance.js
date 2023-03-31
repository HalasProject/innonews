import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(
  (response) => response, // If the response is OK, continue
  (error) => {
    if (error.response?.data?.message === "Unauthenticated") {
      // If the response is 403, remove the token from local storage
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
