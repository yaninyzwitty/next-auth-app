"use client";
import {useRouter} from "next/navigation";
import React, {PropsWithChildren} from "react";

function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: PropsWithChildren<{mode?: string; asChild?: boolean}>) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}

export default LoginButton;
