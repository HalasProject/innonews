import React from "react";
import { Notyf } from "notyf";

export default React.createContext(
  new Notyf({
    dismissible: true,
    ripple: true,
    duration: 5000, // Set your global Notyf configuration here
    position: {
      x: "right",
      y: "bottom",
    },
  })
);
