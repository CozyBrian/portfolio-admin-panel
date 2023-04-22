import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useAppDispatch } from "@/hooks";
import { isUserSignedIn, loginUser } from "@/firebase/authentication";
import { useNavigate } from "react-router-dom";
import { action } from "@/redux";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogin = () => {
    setIsRequestSent(true);
    loginUser(email, pass)
      .then(() => {
        navigate("/", { replace: true });
        dispatch(action.auth.setIsAuthenticated(true));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsRequestSent(false);
      });
  };

  useEffect(() => {
    const run = (count: number) => {
      console.log(count);
      setLoading(true);
      if (count > 0) {
        console.log(count);
        if (isUserSignedIn()) {
          navigate(-1);
          dispatch(action.auth.setIsAuthenticated(true));
        } else {
          setTimeout(() => run(count - 1), 500);
        }
      } else {
        setLoading(false);
        return;
      }
    };

    run(6);
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      {loading ? (
        <Oval
          width={64}
          height={64}
          color="rgb(107 114 128)"
          secondaryColor="slate-500"
          strokeWidth={4}
        />
      ) : (
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
              className="h-11 w-[100px] flex items-center justify-center bg-slate-700 text-lg text-gray-200 rounded-md"
            >
              {isRequestSent ? (
                <Oval
                  width={24}
                  height={24}
                  color="rgb(229 231 235)"
                  secondaryColor="slate-500"
                  strokeWidth={6}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
