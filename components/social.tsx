"use client";
import React from "react";
import {Button} from "./ui/button";
import {FcGoogle} from "react-icons/fc";

import {FaGithub} from "react-icons/fa";
import {useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";
import {DEFAULT_LOGIN_REDIRECT} from "@/lib/routes";
function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT});
  };
  return (
    <div className="flex items-center w-full gap-x-2 px-2">
      <Button
        className="w-full"
        size={"lg"}
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-full"
        size={"lg"}
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
}

export default Social;
