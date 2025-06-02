import Image from "next/image";
import AuthorizationForm from "../components/authorizationForm";

export default function Home() {
  return (
    <div className="m-20 items-center justify-items-center">
      <AuthorizationForm></AuthorizationForm>
    </div>
  );
}
