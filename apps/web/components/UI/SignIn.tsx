"use client";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../Input";
import { BottomGradient, LabelInputContainer } from "./SignupForm";
import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { useLoginContext } from "../../lib/context";
import { useRouter } from "next/navigation";

function SignIn() {
  const { userLogin, isLoggedIn } = useLoginContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(`${HTTP_BACKEND}/signin`, {
      username,
      password,
    });
    console.log(res.data, "dataaaaa");
    const token = res.data.token;
    console.log("extracted token:", token); // <-- and this

    localStorage.setItem("token", token);
    console.log("stored?", localStorage.getItem("token"));
    userLogin();
    console.log(isLoggedIn, token, "seeee");
    router.push("/#");
  };
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white/20 p-5 sm:p-8 backdrop-blur-sm shadow-xl">
      <h2 className="text-lg sm:text-xl font-bold text-neutral-800">
        Login to CoDraw
      </h2>
      <p className="mt-2 max-w-sm text-xs sm:text-sm font-semibold text-neutral-600">
        Explore the infinite canvas. Create without limits.
      </p>
      <form className="my-6 sm:my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Tyler@fclub.com"
              type="text"
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-11 sm:h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export default SignIn;
