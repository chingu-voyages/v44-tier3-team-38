import React, { useState } from "react";
import { Divide as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import LoginFormModal from "../components/auth/Login/LoginFormModal";
import SignUpFormModal from "../components/auth/SignUp/SignUpFormModal";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="h-[80px] w-[100%] bg-green position-fixed z-20">
      <div className="flex items-center justify-between px-5">
      <Link to="/">
          <img
            src="../../public/RoundTrip.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex items-center gap-3">
          {/* <Link className="mx-2" to="/login" onClick={() => setOpen(false)}>
            Login
            </Link>
            <Link className="mx-2" to="/signup" onClick={() => setOpen(false)}>
            Signup
          </Link> */}
          <LoginFormModal />
          <SignUpFormModal />
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>

      {isOpen && (
        <div className="flex fixed flex-col justify-center bg-[#a6cfd5] w-[97%]">
          <Link
            to="/"
            className="hover:text-white text-lg text-right"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/trips"
            className="hover:text-white text-lg text-right"
            onClick={() => setOpen(false)}
          >
            Trips
          </Link>
          <Link
            to="/search"
            className="hover:text-white text-lg text-right"
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
