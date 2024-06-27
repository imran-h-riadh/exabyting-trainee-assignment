import { useAuth } from "../hooks/useAuth";
import AllJobs from "../components/reuses/allJobs";


import { Link } from "react-router-dom";

const HomePage = () => {
  const { auth } = useAuth();

  function isAuth(role) {
    return auth.userDto.roles.some((each) => each == role);
  }

  return (
    <div>
      {(isAuth("ADMIN") || isAuth("HR")) && (
        <div className=" my-24 mx-40 " ><Link
        className="text-white transition-all hover:text-lwsGreen hover:underline mx-2 bg-slate-500 text-3xl "
        to="/createJob"
      >
        Create New Job Post
      </Link></div>
      )}

      <AllJobs />
    </div>
  );
};

export default HomePage;
