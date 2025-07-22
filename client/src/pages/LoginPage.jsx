import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import LogoutPage from "./LogoutPage";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const { search } = useLocation();

  useEffect(() => {
    if (message.msg) {
      toast.dismiss();
      if (message.status !== "true") {
        toast.error(message.msg);
      } else {
        toast.success(message.msg);
      }
    }
  }, [message]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage({
        status: "false",
        msg: "Please fill in all fields",
      });
      return;
    }
    setIsLoading(true);

    try {
      const data = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await data.json();

      if (!data.ok || !response.success) {
        throw new Error(response.message);
      }

      const { _id, userName, email: userEmail, token } = response.data;
      if (!_id || !userName || !userEmail || !token) {
        throw new Error("User not found");
      }
      login({ _id, userName, email: userEmail }, token);
      setMessage({ status: "true", msg: "Successfully logged in" });
      const redirect = new URLSearchParams(search).get("redirect");
      if (redirect) return navigate(`/${redirect}`);
      return navigate("/");
    } catch {
      setMessage({
        status: "false",
        msg: "An error occured",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return !user ? (
    isLoading ? (
      <div className="bg-transparent relative top-0 right-0 left-0 h-full">
        <Spinner loading={isLoading} />
      </div>
    ) : (
      <section className="flex flex-col items-center justify-center min-h-screen px-2">
        <h2 className="text-2xl sm:text-3xl text-center font-extrabold text-gray-700 mt-8">
          Login to your account
        </h2>
        <h3 className="hidden text-red-500">{message.msg}</h3>
        <form
          className="border-4 border-gray-300 rounded-md flex flex-col gap-y-4 px-4 py-6 sm:px-8 md:px-12 lg:px-20 max-w-md sm:max-w-lg md:max-w-xl w-full bg-white shadow mx-auto my-10"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            required
            className="border-gray-500 border-2 rounded w-full p-2"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="text-lg">
            Password:
          </label>
          <input
            required
            className="border-gray-500 border-2 rounded w-full p-2"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-green-600 text-white text-base rounded-lg hover:bg-green-500 transition-all w-full"
          >
            Sign in
          </button>
        </form>
        <p className="text-center mb-8">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-700 underline hover:text-red-500"
          >
            Signup
          </Link>{" "}
          to get started
        </p>
      </section>
    )
  ) : (
    <LogoutPage />
  );
};

export default LoginPage;
