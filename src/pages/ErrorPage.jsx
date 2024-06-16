import Lottie from "lottie-react";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import errorAnimation from "../assets/404.json";
import Button from "../components/Shared/Button/Button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto text-center border-2 border-gray-300 p-10 rounded-lg shadow-lg">
        <div className="flex justify-center">
          <Lottie className="size-96" animationData={errorAnimation} />
        </div>{" "}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Oops! Page not found.
        </h1>
        <p className="text-lg text-gray-600 md:text-xl mb-8">
          The URL you entered may be incorrect or the page may have been
          removed.
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <Button
            label="Go to Home"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            <FaHome className="h-5 w-5" />
            Go to Home
          </Button>
          <Button
            label="Go Back"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            <FaArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
