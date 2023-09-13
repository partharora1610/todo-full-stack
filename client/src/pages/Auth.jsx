import { useSearchParams } from "react-router-dom";

import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  return (
    <>
      <AuthForm isLogin={isLogin} />
    </>
  );
};

export default AuthPage;
