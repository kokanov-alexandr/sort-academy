"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Почта</Label>
              <Input type="email" id="email" placeholder="Введите почту" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pas">Пароль</Label>
              <Input type="password" id="email" placeholder="Введите почту" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Войти</Button>
      </CardFooter>
    </Card>
  );
};

export default Auth;
