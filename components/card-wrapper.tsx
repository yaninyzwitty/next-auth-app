"use client";

import {PropsWithChildren} from "react";
import BackButton from "./back-button";
import Header from "./header";
import Social from "./social";
import {Card, CardContent, CardFooter, CardHeader} from "./ui/card";

function CardWrapper({
  children,
  backButtonHref,
  backButtonLabel,
  showSocial,
  headerLabel,
}: PropsWithChildren<{
  backButtonHref: string;
  showSocial: boolean;
  backButtonLabel: string;
  headerLabel: string;
}>) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <Social />}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
