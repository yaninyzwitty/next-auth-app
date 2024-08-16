"use client";

import CardWrapper from "@/components/card-wrapper";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {BeatLoader} from "react-spinners";
import FormSuccess from "../register/form-success";
import FormError from "../register/form-error";
import {newVerification} from "@/actions/new-verifcation";

function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token");
      return;
    }

    // server action to remove the token from db
    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    });
  }, [success, error, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocial={false}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />

        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}

export default NewVerificationForm;
