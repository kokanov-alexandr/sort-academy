"use client";
import { useState } from "react";
import usersService from "../components/services/usersService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loadiing from "@/components/loading";
import EmailCodeInput from "@/components/emailCodeInput";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterForm = () => {
  const {
    trigger: createUser,
    error: createUserError,
    isMutating: isCreatingUser,
  } = usersService.useCreateUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailConfirmation, setisEmailConfirmation] = useState(false);
  const [salt, setSalt] = useState("");
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
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
    if (password != confirmPassword) {
      newErrors.confirmPasswordError = "Пароли не совпадают!";
      isValidate = false;
    }
    if (confirmPassword == "") {
      newErrors.confirmPasswordError = "Введите подтверждение пароля!";
      isValidate = false;
    }

    setErrors(newErrors);
    return isValidate;
  };

  const handleRegistration = async () => {
    let validateResult = await validateForm();
    if (!validateResult) {
      return;
    }
    let userDto = {
      email: email,
      password: password,
      isEmailConfirmed: false,
    };

    try {
      let createUserResult = await createUser(userDto);
      setSalt(createUserResult.salt);
      setisEmailConfirmation(true);
    } catch (error) {
      const newErrors = {};
      newErrors.confirmPasswordError = error.detail;
      setErrors(newErrors);
    }
  };

  if (isEmailConfirmation) {
    return <EmailCodeInput salt={salt}></EmailCodeInput>;
  }
  return (
    <Card className="max-w-lg min-w-sm">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardAction>
          <Button variant="link">Войти</Button>
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
            <div className="grid gap-2">
              <Label htmlFor="email">Подтверждение пароля</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {errors.confirmPasswordError != "" && (
              <p className="text-red-600 text-base ml-1">
                {errors.confirmPasswordError}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      {isCreatingUser != "" && <Loadiing></Loadiing>}
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          onClick={handleRegistration}
        >
          Зарегистрироваться
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
