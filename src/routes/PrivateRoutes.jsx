import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/common/Header";
const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user?.userDto ? (
        <>
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
