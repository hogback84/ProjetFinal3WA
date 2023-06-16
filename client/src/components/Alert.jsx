import React, { useEffect, useState } from "react";
import "../assets/styles/components/_alert.scss";

const Alert = ({ message, type }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  const alertClass = type === "error" ? "alert-error" : "alert-success";

  return (
    <div className={`alert ${alertClass} ${show ? "show" : ""}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;
