import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import React from "react";

async function SettingsPage() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  console.log(session);

  return (
    <div>
      {!!session && (
        <form
          action={async () => {
            "use server";
            await signOut();
            revalidatePath("/");
          }}
        >
          <Button>Log out</Button>
        </form>
      )}
    </div>
  );
}

export default SettingsPage;
