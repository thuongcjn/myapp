import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState({ status: "false", msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    if (password !== password2) {
      setMessage({ status: "false", msg: "Password mismatch" });
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://mern-blog-posts.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, email, password }),
        }
      );

      const response = await data.json();

      if (!data.ok || !response.success) {
        setMessage({ status: "false", msg: "Error" });
        return;
      }
      setMessage({ status: "true", msg: "Successfully created user" });
      return navigate("/login");
    } catch {
      setMessage({ status: "false", msg: "An error occured" });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Spinner loading={isLoading} />
  ) : (
    <section className="flex flex-col items-center justify-center min-h-screen px-2">
      <h2 className="text-2xl sm:text-3xl text-center font-extrabold text-gray-700 mt-8">
        Create an account to get started
      </h2>
      <form
        className="border-4 border-gray-300 rounded-md flex flex-col gap-y-4 px-4 py-6 sm:px-8 md:px-12 lg:px-20 max-w-md sm:max-w-lg md:max-w-xl w-full bg-white shadow mx-auto my-10"
        onSubmit={handleFormSubmit}
      >
        <h3 className="text-center text-red-500">{message.msg}</h3>
        <label htmlFor="name" className="text-lg">
          Name:
        </label>
        <input
          required
          className="border-gray-500 border-2 rounded w-full p-2"
          type="text"
          id="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

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

        <label htmlFor="password2" className="text-lg">
          Password (confirm):
        </label>
        <input
          required
          className="border-gray-500 border-2 rounded w-full p-2"
          type="password"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        <button
          className="bg-green-600 text-base rounded-lg p-3 hover:bg-green-500 text-white w-full transition-all"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center mb-8">
        Already have an account?{" "}
        <Link to="/login" className="text-red-700 underline hover:text-red-500">
          Login
        </Link>{" "}
        to continue
      </p>
    </section>
  );
};

export default SignupPage;
