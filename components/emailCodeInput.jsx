"use client";
import { useState } from "react";
import usersService from "../components/services/usersService";
import { Button } from "@/components/ui/button";
import Loadiing from "@/components/loading";
import { useRouter } from "next/navigation";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmailCodeInput = ({ salt }) => {
  const router = useRouter();

  const {
    trigger: confirmEmail,
    error: confirmEmailError,
    isMutating: isConfirmingEmail,
  } = usersService.useCConfirmEmail();

  const {
    trigger: auth,
    error: authError,
    isMutating: isAuth,
  } = usersService.useAuthorization();

  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const validateForm = async () => {
    // if (code.length < 6) {
    //   setError("Введите код!");
    //   return false;
    // }

    setError("");
    return true;
  };

  const handleEmailCode = async () => {
    let validateResult = await validateForm();
    if (!validateResult) {
      return;
    }
    try {
      let confirmEmailDto = {
        salt: salt,
        code: code,
      };

      await confirmEmail(confirmEmailDto);
    } catch (confirmEmailError) {
      setError(confirmEmailError.detail);
      return;
    }

    try {
      let userDto = {
        email: "kokanovvv@gmail.com",
        password: "1",
      };

      var authResult = await auth(userDto);
      console.log(authResult.token);
      localStorage.setItem("token", authResult.token);
    } catch (authError) {
      setError(error);
      return;
    }

    router.push("/bubble-sort");
  };

  return (
    <div>
      <Card className="max-w-lg min-w-sm">
        <CardHeader>
          <CardTitle>Подтверждение электронноый почты</CardTitle>
          <CardDescription>
            На вашу почты был выслан код подтверждения, пожалуйста введите его
            для подтверждения почты.
          </CardDescription>
          <CardDescription>
            Обращем ваше внимание, что срок действяи кода подтверждения - 5
            минут.
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <InputOTP maxLength={6} onChange={(value) => setCode(value)}>
            <InputOTPGroup className="">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error != "" && (
            <p className="text-red-600 text-base ml-1">{error}</p>
          )}
        </CardContent>
        {isConfirmingEmail != "" && <Loadiing></Loadiing>}
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onClick={handleEmailCode}>
            Подтвердить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailCodeInput;
