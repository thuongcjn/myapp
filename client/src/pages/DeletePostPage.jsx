import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const DeletePostPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token") || null;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();

  const deletePost = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `https://mern-blog-posts.onrender.com/api/posts/${id?.toString()}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await data.json();
      if (!data.ok || !response.success) {
        throw new Error(response.message);
      }

      setMessage(response.message);
      toast.dismiss();
      toast.success("Post deleted successfully");
      setIsFetched(true);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="z-0 flex absolute top-[60px] right-0 left-0 h-full bg-gray-500 justify-center items-center">
      <div className="mx-2 p-6 space-y-3 border-2 rounded-2xl shadow-2xl bg-white flex flex-col">
        <p className="mb-4 font-bold text-xl text-center">
          {message || "Are you sure you want to delete this post?"}
        </p>

        <div className=" space-y-2 self-end md:space-x-6">
          {isFetched ? (
            <Link
              onClick={() => {
                navigate(`/posts/${id}`);
              }}
              to={`/posts/${id}`}
              className="mr-2 font-bold border-4 border-gray-600 bg-white shadow-md py-1 px-4 rounded-xl hover:bg-gray-600 hover:text-white transition"
            >
              Ok
            </Link>
          ) : (
            <>
              <Link
                to={`/posts/${id}`}
                className="mr-2 font-bold border-4 border-gray-600 bg-white shadow-md py-1 px-2 rounded-xl hover:bg-gray-600 hover:text-white transition"
              >
                Cancel
              </Link>
              <button
                onClick={deletePost}
                className="font-bold border-4 border-green-600 bg-white shadow-md py-1 px-2 rounded-xl hover:bg-green-600 hover:text-white transition"
              >
                Proceed
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletePostPage;
