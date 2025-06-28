import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <p>This page could not be found</p>
      <Link to={"/"}>Back</Link>
    </div>
  );
};

export default NotFound;
