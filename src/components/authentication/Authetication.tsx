import { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import "./authentication.css";

const Authetication = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const state = useAuthContext();
  if (!state) return null;
  const { onLogin } = state;

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
          <div className="login-button" onClick={() => onLogin(email, pass)}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authetication;
