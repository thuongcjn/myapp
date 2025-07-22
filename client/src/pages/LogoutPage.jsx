import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const signout = () => {
    logout();
    navigate("/");
    toast.dismiss();
    toast.info("User successfully logged out");
  };

  return (
    <div className="mt-10 flex flex-col">
      {user && (
        <div
          className="text-3xl self-center mb-4 font-extrabold  py-4 px-6 bg-white border-4 border-green-600 rounded-full cursor-pointer"
          title={user.userName}
        >
          {user.userName.split("")[0].toUpperCase()}
        </div>
      )}
      <h3 className="text-3xl">
        <span className="font-bold">{user?.userName}</span> is currently logged
        in
      </h3>
      <button
        className="mt-4 mx-auto w-min border-4 border-green-600 bg-white shadow-md py-1 px-4 rounded-xl hover:bg-green-600 hover:text-white transition"
        onClick={signout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutPage;
