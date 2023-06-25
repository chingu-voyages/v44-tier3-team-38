import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../../store/index";
import { login } from "../../../store/session";
import Demo from "../Demo";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state: RootState) => state.session.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) setErrors(data);
  };

  const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) navigate("/trips");
  }, [user, navigate]);

  if (user) return null;

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
          <div className="username-container">
            <label className="username-label" htmlFor="username">
              Username{" "}
            </label>
            <input
              className="form-input-user"
              name="username"
              type="text"
              value={username}
              onChange={updateUsername}
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
