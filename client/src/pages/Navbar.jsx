import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Main Page</Link>
      <br />
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/signin">Signin</Link>
    </nav>
  );
};

export default Navbar;
