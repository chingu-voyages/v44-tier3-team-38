import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import { SyntheticEvent } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

function Demo() {
  const dispatch = useDispatch();
  const demoLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    const username = "jon";
    const password = "jon";
    try {
      await dispatch(login(username, password));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button className="demo-button" onClick={demoLogin}>
      Demo
    </button>
  );
}

export default Demo;
