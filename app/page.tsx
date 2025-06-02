import Image from "next/image";
import RegistrationForm from "../components/registerForm";

export default function Home() {
  return (
    <div className="m-20 items-center justify-items-center">
      <RegistrationForm></RegistrationForm>
    </div>
  );
}
