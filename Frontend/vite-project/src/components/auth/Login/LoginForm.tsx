import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { RootState, AppDispatch } from "../../../store/index";
import { login } from "../../../store/session";
import Demo from "../Demo";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state: RootState) => state.session.user);
  const dispatch: AppDispatch = useDispatch();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) setErrors(data);
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // if (user) return <Redirect to="/" />;

  return (
    <>
      <form className="main-user-login" onSubmit={onLogin}>
        <div className="errors-list-login">
          <ul className="single-error">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div id="sub-auth-div">
          <h2 className="form-title">Login</h2>
        </div>
        <div className="input-containers">
          <div className="email-container">
            <label className="email-label" htmlFor="email">
              Email{" "}
            </label>
            <input
              className="form-input-user"
              name="email"
              type="text"
              value={email}
              onChange={updateEmail}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input
              className="form-input-user"
              name="password"
              type="password"
              value={password}
              onChange={updatePassword}
              required={true}
            />
          </div>
        </div>
        <div className="auth-user-div">
          <button className="user-buttons" type="submit">
            Login
          </button>
          <Demo />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
