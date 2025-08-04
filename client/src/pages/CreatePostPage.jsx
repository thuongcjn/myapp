import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ status: "false", msg: "" });

  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    if (params.id) {
      setIsEditing(true);

      const getPost = async (id) => {
        setIsLoading(true);
        try {
          const data = await fetch(
            `https://myapp-be.onrender.com/api/posts/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const response = await data.json();

          if (!data.ok || !response.success) {
            throw new Error("An error occured");
          }

          const { title, body } = response.data;

          if (!title || !body) {
            throw new Error("Post not found");
          }

          setTitle(title);
          setBody(body);
        } catch (error) {
          setMessage({ status: "false", msg: `Error: ${error.message}` });
          return navigate("/");
        } finally {
          setIsLoading(false);
        }
      };

      getPost(params.id?.toString());
    }
  }, []);

  const createPost = async (post) => {
    setIsLoading(true);
    try {
      const reqUrl = isEditing
        ? `https://myapp-be.onrender.com/api/posts/${params?.id}`
        : "https://myapp-be.onrender.com/api/posts";

      const data = await fetch(reqUrl, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      const response = await data.json();

      if (!data.ok || !response.success) {
        throw new Error("An error occured");
      }

      setMessage({
        status: "true",
        msg: isEditing
          ? "Successfully edited post"
          : "Successfully created post",
      });

      return navigate("/");
    } catch (error) {
      setMessage({ status: "false", msg: `Error: ${error.message}` });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic here
    if (!title.trim() || !body.trim()) {
      setMessage({
        status: "false",
        msg: "Please, fill all fields correctly",
      });
      return;
    }

    const newPost = { title, body };
    createPost(newPost);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="my-10 w-full px-2">
      <h2 className="text-2xl sm:text-3xl text-center font-extrabold text-gray-700">
        {isEditing ? "Edit Post" : "Create Post"}
      </h2>
      <form
        className="border-4 border-gray-300 rounded-md flex flex-col gap-y-4 px-4 py-6 sm:px-8 md:px-12 lg:px-20 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto my-10 w-full bg-white shadow"
        onSubmit={handleSubmit}
      >
        <h3 className="text-red-500 text-center">{message?.msg}</h3>
        <label htmlFor="title" className="text-lg">
          Title:
        </label>
        <input
          required
          className="border-gray-500 border-2 rounded w-full p-2"
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="body" className="text-lg">
          Body:
        </label>
        <textarea
          required
          className="border-gray-500 border-2 rounded w-full p-2"
          onChange={(e) => setBody(e.target.value)}
          name="body"
          id="body"
          rows={6}
          value={body}
        ></textarea>
        <div>
          <label htmlFor="author" className="text-lg">
            Author:{" "}
          </label>
          <select
            name="author"
            id="author"
            className="p-1 mb-2 ml-2 w-1/2"
            disabled
          >
            <option value="user">{user?.userName}</option>
          </select>
        </div>
        <button
          type="submit"
          className="p-3 bg-white shadow-lg border-4 rounded-lg text-base border-green-500 hover:bg-green-500 hover:text-white transition-all w-full"
        >
          {isEditing ? "Edit post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
