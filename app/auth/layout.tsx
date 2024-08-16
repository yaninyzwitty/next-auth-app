import React, {PropsWithChildren} from "react";

function AuthLayout({children}: PropsWithChildren<{}>) {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {children}
    </div>
  );
}

export default AuthLayout;
