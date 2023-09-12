import { useSearchParams } from "react-router-dom";

import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login"; // true we are on the login page

  return (
    <>
      {/* <h1 className="font-sans text 4xl">This is the Auth Page</h1> */}
      <AuthForm isLogin={isLogin} />
    </>
  );
};

export default AuthPage;
