import { FiMenu } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleMenu = () => {
    document.getElementById("menu").classList.toggle("hidden");
    document.getElementById("menu").classList.toggle("flex");
  };

  const createPostNavigate = () => {
    if (!user) {
      toast.dismiss();
      toast.warn("Login to continue");
      return navigate("/login?redirect=create-post");
    }
    navigate("/create-post");
  };

  return (
    <nav className="fixed h-14 w-full mb-12 flex items-center justify-between bg-blue-300 m-auto p-3">
      <div className="text-3xl font-bold">Posts App</div>
      <div className="justify-between md:hidden">
        <FiMenu
          className="mr-3 mt-2 md:hidden cursor-pointer"
          onClick={toggleMenu}
        />
        <div
          className="hidden bg-blue-200 absolute top-[60px] left-0 right-0  flex-col text-center space-y-3 py-3 md:hidden"
          onMouseLeave={toggleMenu}
          id="menu"
        >
          <Link to="/" className="w-full border-b-2 pb-2 hover:text-gray-500">
            Home
          </Link>
          {user ? (
            <Link
              to="/logout"
              className="w-full border-b-2 pb-2 hover:text-gray-500"
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-full border-b-2 pb-2 hover:text-gray-500"
            >
              Login
            </Link>
          )}
          <button onClick={createPostNavigate} className="hover:text-gray-500">
            Create Post
          </button>
        </div>
      </div>
      <div className="hidden min-w-10 space-x-6 justify-between font-bold pr-6 md:flex">
        <Link to="/" className="hover:text-gray-500">
          Home
        </Link>

        {user ? (
          <Link to="/logout" className="hover:text-gray-500">
            Logout
          </Link>
        ) : (
          <Link to="/login" className="hover:text-gray-500">
            Login
          </Link>
        )}

        <button onClick={createPostNavigate} className="hover:text-gray-500">
          Create Post
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
