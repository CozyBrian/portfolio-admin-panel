import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useAppDispatch } from "@/hooks";
import { isUserSignedIn, loginUser } from "@/firebase/authentication";
import { useNavigate } from "react-router-dom";
import { action } from "@/redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogin = () => {
    loginUser(email, pass)
      .then(() => {
        navigate("/");
        dispatch(action.auth.setIsAuthenticated(true));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const run = () => {
      if (isUserSignedIn()) {
        navigate("/");
        dispatch(action.auth.setIsAuthenticated(true));
      } else {
        setTimeout(run, 500);
      }
    };

    run();
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className="flex flex-col items-center w-[500px] gap-8 bg-white p-8 rounded-lg border border-gray-300">
        <h3 className="text-4xl font-Nunito font-light uppercase tracking-wide">
          Login
        </h3>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
          <div className="w-full">
            <input
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              type="password"
              placeholder="Password"
              className={cn(
                "h-12 w-full border-2 border-gray-400 rounded-md focus:outline-none px-3 text-lg"
              )}
            />
          </div>
        </div>
        <div className="w-full flex justify-end ">
          <button
            onClick={() => onLogin()}
            className="h-11 w-[100px] bg-slate-700 text-lg text-gray-200 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
