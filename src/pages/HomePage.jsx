import AllJobs from "../components/reuses/allJobs";
import { Link } from "react-router-dom";

const HomePage = () => {
  const auth  =JSON.parse(localStorage.getItem('user'))

  function isAuth(role) {
    return auth?.userDto?.roles?.some((each) => each == role);
  }

  return (
    <div>
      {(isAuth("ADMIN") || isAuth("HR")) && (
  <div className="flex justify-center items-center my-24 mx-40">
    <Link
      className="text-white bg-blue-600 hover:bg-blue-700 text-3xl font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      to="/createJob"
    >
      Create New Job Post
    </Link>
  </div>
)}
      <AllJobs />
    </div>
  );
};

export default HomePage;
