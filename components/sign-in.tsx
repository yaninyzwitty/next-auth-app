import {auth, signIn} from "@/auth";
import {Button} from "./ui/button";

export async function SignIn() {
  const session = await auth();
  console.log(session);
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit">Signin with GitHub</Button>
    </form>
  );
}
