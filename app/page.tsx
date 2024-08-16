import {Poppins} from "next/font/google";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import LoginButton from "./login-button";
import {prisma} from "@/lib/prisma";
const font = Poppins({subsets: ["latin"], weight: ["600"]});
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">Simple Auth Service</p>
        <LoginButton>
          <Button variant={"secondary"} size={"lg"}>
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
