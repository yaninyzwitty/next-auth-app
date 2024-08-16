"use client";
import {loginAction} from "@/actions/login";
import {Input} from "@/components/ui/input";
import SubmitButton from "./submit-button";

function SignInForm() {
  const userId = crypto.randomUUID();
  return (
    <form className="flex flex-col space-y-4" action={loginAction}>
      <h3 className="font-bold text-2xl">User Registration</h3>
      <Input type="email" name="email" placeholder="john.doe@mail.com" />
      <Input type="password" name="password" placeholder="******" />
      <SubmitButton />
    </form>
  );
}

export default SignInForm;
