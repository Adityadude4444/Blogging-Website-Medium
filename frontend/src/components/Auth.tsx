import { useState } from "react";
import { Input } from "./minicomponents/Input";
import { Signupinput } from "@aditya_4444/medium-zod1";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postinputs, setpostinputs] = useState<Signupinput>({
    username: "",
    password: "",
    name: "",
  });
  async function Senddata() {
    try {
      const response = await axios.post(
        `${BACKEND}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
        postinputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("error ocured on request");
      console.log(e);
    }
  }
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl font-bold pb-5">Create an account</div>
        <div className="flex flex-col gap-5 w-full items-center">
          {type == "signup" ? (
            <Input
              label="Name"
              placeholder="Enter your username"
              onchange={(e) => {
                setpostinputs({
                  ...postinputs,
                  name: e.target.value,
                });
              }}
            />
          ) : null}
          <Input
            label="Username"
            placeholder="johndoe@example.com"
            onchange={(e) => {
              setpostinputs({
                ...postinputs,
                username: e.target.value,
              });
            }}
          />
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
              Password
            </label>
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              onChange={(e) => {
                setpostinputs({
                  ...postinputs,
                  password: e.target.value,
                });
              }}
              type="password"
            />
          </div>
        </div>
        {type == "signup" ? (
          <div className="text-slate-500">
            Already have an account{" "}
            <Link to="/signin" className="underline">
              Login
            </Link>
          </div>
        ) : (
          <div className="text-slate-500">
            Don't have an account{" "}
            <Link to="/signup" className="underline">
              Signup
            </Link>
          </div>
        )}
        <button
          type="button"
          className="text-white w-96 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={Senddata}
        >
          {type == "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
