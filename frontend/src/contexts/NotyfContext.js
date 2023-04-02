import { createContext } from "react";
import { Notyf } from "notyf";

export default createContext(
  new Notyf({
    dismissible: true,
    ripple: true,
    duration: 5000,
    position: {
      x: "right",
      y: "bottom",
    },
  })
);
