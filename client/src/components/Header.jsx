// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

const Header = () => {
  // const authCtx = useContext(AuthContext);

  return (
    <>
      <header className="flex justify-between py-12 px-16">
        <div className="">
          <img src="" alt="company-logo" />
        </div>

        <div>
          <button className="bg-indigo-600 text-white py-3 px-8 rounded hover:bg-indigo-500">
            Start Now
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
