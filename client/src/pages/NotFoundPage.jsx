import { ImWarning } from "react-icons/im";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center">
      <ImWarning size={150} color="orange" />
      <h2 className="mt-10 text-5xl text-red-700 text-center font-extrabold">
        404: Page Not Found
      </h2>
    </div>
  );
};

export default NotFoundPage;
