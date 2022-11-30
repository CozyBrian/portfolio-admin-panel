import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { action } from "../../redux";
import { loginUser } from "../../services/authentication";
import "./authentication.css";

const Authetication = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useAppDispatch();

  const onLogin = () => {
    loginUser(email, pass)
      .then((u) => {
        dispatch(action.system.setIsAuthenticated(true));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="Authentication">
      <div className="LoginCard">
        <div className="LoginHeader">
          <p className="LoginTitle">WELCOME</p>
        </div>
        <div className="login-inputs">
          <div className="login-input-container">
            <div className="text-field-title">Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login-text-input"
            />
          </div>
          <div className="login-input-container">
            <div className="text-field-title">Password</div>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className="login-text-input"
            />
          </div>
        </div>
        <div className="loginFooter">
          <div className="login-button" onClick={() => onLogin()}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authetication;
