import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import { SyntheticEvent } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface LoginActionCreator {
  (email: string, password: string): ThunkDispatch<any, any, AnyAction> | any;
}

function Demo() {
  const dispatch = useDispatch();
  const demoLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    const email: string = "jon";
    const password: string = "snow";
    const loginAction: LoginActionCreator = login;
    return dispatch(loginAction(email, password)).catch(
      async (res: Response) => {
        await res.json();
      }
    );
  };

  return (
    <button className="demo-button" onClick={demoLogin}>
      Demo
    </button>
  );
}

export default Demo;
