"use client";

import {Button} from "@/components/ui/button";
import {useFormStatus} from "react-dom";

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Submit
    </Button>
  );
}

export default SubmitButton;
