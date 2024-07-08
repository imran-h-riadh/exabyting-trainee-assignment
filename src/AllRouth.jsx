import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import CreateJobPost from "./components/reuses/CreateJobPost";
import JobDetails from "./components/reuses/JobDetails";
import AllAplicat from "./components/reuses/AllAplicat";
import AdminPanel from "./pages/AdminPanel";
import UpdateInfo from "./pages/UpdateInfo";
import Callback from "./pages/Callback";
export default function AllRouth() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/me/:id" />
          <Route element={<CreateJobPost />} path="/createJob" />
          <Route element={<AllAplicat />} path="/allApplicant/:id" />
          <Route element={<JobDetails />} path="/jobDetails/:id" />
          <Route element={<AdminPanel />} path="/adminPanel" />
          <Route element={<UpdateInfo />} path="/updateInfo" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route path="/sucess" element={<Callback />} />

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}
