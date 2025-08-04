import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import HomeCard from "../components/HomeCard";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        "https://myapp-be.onrender.com/api/posts"
      );
      const results = await data.json();
      if (!data.ok || !results.success) {
        toast.dismiss();
        toast.error("Error fetching posts");
        return;
      }
      setPosts(results.data);
      toast.dismiss();
      toast.success("Posts successfully fetched");
    } catch {
      toast.dismiss();
      toast.error("Error fetching posts");
    } finally {
      setIsLoading(false);
    }
  };

  const sortedPosts = posts
    ?.slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return isLoading ? (
    <div>
      <Spinner loading={isLoading} />
    </div>
  ) : (
    <>
      {sortedPosts.length > 0 ? (
        <div className="grid gap-5 space-y-3 h-full md:grid-cols-2 lg:grid-cols-4">
          {sortedPosts.map((post) => (
            <Link to={`/posts/${post._id}`} key={post._id}>
              <HomeCard post={post} />
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={fetchPosts}
            className="justify-self-center border-4 border-green-600 bg-white shadow-md py-1 px-2 rounded-xl hover:bg-green-600 hover:text-white transition"
          >
            Fetch posts
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
