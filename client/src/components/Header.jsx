import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser, loggedIn, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <header className="flex items-center justify-between py-4 px-12  bg-slate-200">
        <div className="">
          <img src="" alt="TODOC" className="bg-slate-600" />
        </div>

        <div className="flex">
          {loggedIn ? (
            <div>
              <p>{currentUser?.username}</p>
            </div>
          ) : (
            ""
          )}

          {!loggedIn ? (
            <button className="bg-indigo-600 text-white py-3 px-8 rounded hover:bg-indigo-500">
              Start Now
            </button>
          ) : (
            <div className="flex items-center gap-8">
              <img
                alt="avatar"
                src=""
                className="bg-slate-300 w-12 h-12 rounded-full"
              />
              <button
                className="bg-indigo-600 text-white py-3 px-8 rounded hover:bg-indigo-500"
                onClick={() => {
                  onLogout();
                  navigate("/auth");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
