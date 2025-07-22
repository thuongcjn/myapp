import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { fetchName } from "../requests/FetchName";

const PostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (message.msg) {
      toast.dismiss();
      if (message.status !== "true") {
        toast.error(message.msg);
      } else {
        toast.error(message.msg);
      }
    }
  }, [message]);

  useEffect(() => {
    fetchName(post?.userId).then((name) => setAuthor(name));
  }, [post?.userId]);

  useEffect(() => {
    const getPost = async (id) => {
      try {
        const data = await fetch(`http://localhost:8080/api/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        if (!data.ok || !response.success) {
          setMessage({ status: "false", msg: "An error occured" });
          return navigate("/");
        }
        const { title, body } = response.data;
        if (!title || !body) {
          setMessage({
            status: "false",
            msg: `Post with id ${id} not found`,
          });
          return navigate("/");
        }
        setPost(response.data);
      } catch {
        setMessage({ status: "false", msg: `An error occured` });
        return navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    getPost(params.id?.toString());
  }, []);

  return !isLoading ? (
    <section className="w-2/3 flex flex-col my-10 p-4 mx-auto space-y-2">
      <h3 className="text-3xl">{post?.title}</h3>
      <p className="text-lg">{post?.body}</p>
      <span className="text-right italic text-pink-500">
        {author || "Unknown"}
      </span>
      <div className="pt-6 pr-3 space-x-3 flex justify-end">
        {user?._id == post?.userId && (
          <>
            <Link
              className="border-4 border-green-600 bg-white shadow-md py-1 px-2 rounded-xl hover:bg-green-600 hover:text-white transition"
              to={`/edit-post/${post?._id}`}
            >
              Edit Post
            </Link>
            <Link
              to={`/delete-post/${post?._id}`}
              className="border-4 border-red-600 bg-white shadow-md py-1 px-2 rounded-xl hover:bg-red-600 hover:text-white transition"
            >
              Delete Post
            </Link>
          </>
        )}
      </div>
    </section>
  ) : (
    <Spinner loading={isLoading} />
  );
};

export default PostPage;
