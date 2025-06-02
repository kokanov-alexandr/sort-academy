"use client";
import { useDebugValue, useState } from "react";
import usersService from "../components/services/usersService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loadiing from "@/components/loading";
import { useRouter } from "next/navigation";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AuthorizationForm = () => {
  const router = useRouter();

  const {
    trigger: auth,
    error: authError,
    isMutating: isAuth,
  } = usersService.useAuthorization();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const validateForm = async () => {
    const newErrors = {};
    let isValidate = true;
    if (email == "") {
      newErrors.emailError = "Введите адрес алектронной почты!";
      isValidate = false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      newErrors.emailError = "Некорректный формам электронноый почты!";
      isValidate = false;
    }
    if (password === "") {
      newErrors.passwordError = "Введите пароль!";
      isValidate = false;
    }
    setErrors(newErrors);
    return isValidate;
  };

  const handleAuth = async () => {
    let validateResult = await validateForm();
    if (!validateResult) {
      return;
    }

    let userDto = {
      email: email,
      password: password,
    };

    try {
      var authResult = await auth(userDto);
      localStorage.setItem("token", authResult.token);
    } catch (error) {
      const newErrors = {};
      newErrors.passwordError = error.detail;
      setErrors(newErrors);
      return;
    }
    router.push("/bubble-sort");
  };

  return (
    <Card className="max-w-lg min-w-sm">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardAction>
          <Button variant="link">Зарегистрироваться</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Почта</Label>
              <Input
                className=""
                id="email"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.emailError != "" && (
                <p className="text-red-600 text-base ml-1">
                  {errors.emailError}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.passwordError != "" && (
                <p className="text-red-600 text-base ml-1">
                  {errors.passwordError}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      {isAuth != "" && <Loadiing></Loadiing>}
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isAuth}
          onClick={handleAuth}
        >
          Войти
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthorizationForm;
