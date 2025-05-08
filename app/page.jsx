"use client";
import Link from "next/link";
import { useState } from "react";
import usersService from "../serviсes/usersService";
import RegisterForm from "@/components/registerForm";
import AuthorizationForm from "@/components/authorizationForm";

const Home = ({}) => {
  const {
    trigger: createUser,
    error: createUserError,
    isMutatingCreateUserError,
  } = usersService.useCreateUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    let userDto = {
      email: email,
      password: password,
      isEmailConfirmed: false,
    };

    await createUser(userDto);

    console.log(result);
  };

  // const {
  //   data: sortings,
  //   error: testsError,
  //   isLoading: testsLoading,
  // } = sortingsService.useGetSortings();

  // if (testsLoading) return <p>Loading tests...</p>;
  // if (testsError) return <p>Error: {testsError.message}</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* <h1>Сортировки</h1>
        <div>
          {sortings.map((item) => (
            <div key={item.id}>
              <Link href={item.name}>{item.displayName}</Link>
            </div>
          ))}
        </div> */}
        <AuthorizationForm></AuthorizationForm>
      </main>
    </div>
  );
};

export default Home;
