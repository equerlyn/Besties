import { Link } from "react-router-dom";

const DummyErrorPage = () => {
    // Implement your component logic here
    return (
      <div className="flex flex-col w-full h-screen justify-center items-center gap-y-4">
        <div className="text-xl font-semibold">Forbidden</div>
        <Link to="/" className="text-blue-700">
          Go back
        </Link>
      </div>
    );
  };
  
export default DummyErrorPage;
  