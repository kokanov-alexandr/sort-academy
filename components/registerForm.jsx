"use client";
import { useState } from "react";
import usersService from "../serviсes/usersService";

const RegisterForm = () => {
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

  return (
    <div>
      <h2>Регистрация</h2>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}

      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Подтвердите пароль:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} onClick={handleRegistration}>
          {"Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
