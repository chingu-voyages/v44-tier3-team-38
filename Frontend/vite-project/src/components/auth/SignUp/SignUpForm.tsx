import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
import { RootState, AppDispatch } from "../../../store/index";
import { signUp } from "../../../store/session";
// import Demo from "./Demo";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.session.user);
  const dispatch: AppDispatch = useDispatch();

  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await dispatch(
      signUp(username, email, password, repeatPassword)
    );
    if (data) {
      const updatedErrors = [...data];
      setErrors(updatedErrors);
      if (password !== repeatPassword) {
        setPassword("");
        setRepeatPassword("");
      }
    }
  };

  const updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  //   if (user) return <Redirect to="/" />;

  return (
    <form className="main-user-signup" onSubmit={onSignUp}>
      <div className="errors-list-signup">
        <ul className="single-error">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div>
        <div id="signup-titles">
          <h2 className="form-title">Signup</h2>
        </div>
      </div>
      <div>
        <label id="username-label">Username</label>
        <input
          className="form-input-user"
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div>
        <label className="email-label">Email</label>
        <input
          className="form-input-user"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          className="form-input-user"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          className="form-input-user"
          id="repeat-password-input"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className="auth-user-div">
        <button className="user-buttons" type="submit">
          Sign Up
        </button>
        {/* <Demo /> */}
      </div>
    </form>
  );
};

export default SignUpForm;
