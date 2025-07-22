import { useEffect, useState } from "react";
import { fetchName } from "../requests/FetchName";

const HomeCard = ({ post }) => {
  const { title, body, userId, createdAt } = post;
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchName(userId).then((name) => setUser(name));
  }, [user, userId]);

  const truncatedBody = body?.substring(0, 40) + " ...";
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto h-full flex flex-col">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{title.substring(0, 25) + " ..."}</h2>
      <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 flex-grow">
        {truncatedBody}
      </p>
      <div className="flex justify-between text-xs sm:text-sm md:text-base text-gray-500 mt-auto">
        <span>By {user || "unknown"}</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default HomeCard;
