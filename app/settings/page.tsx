import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import React from "react";
import SignOutButton from "./sign-out-button";

async function SettingsPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  return <div>{!!session && <SignOutButton />}</div>;
}

export default SettingsPage;
