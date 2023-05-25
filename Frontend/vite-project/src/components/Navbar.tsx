import React, { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="h-[80px] w-[100%] bg-green">
      <div className="flex items-center justify-between px-5">
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <div className="flex items-center gap-3">
          <Link className="mx-2" to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
          <Link className="mx-2" to="/signup" onClick={() => setOpen(false)}>
            Signup
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="flex fixed flex-col justify-center bg-[#a6cfd5] w-[100%]">
          <Link
            to="/"
            className="hover:text-red-500 text-lg"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/trips"
            className="hover:text-red-500 text-lg "
            onClick={() => setOpen(false)}
          >
            Trips
          </Link>
          <Link
            to="/search"
            className="hover:text-red-500 text-lg"
            onClick={() => setOpen(false)}
          >
            Search
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
