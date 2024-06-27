import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import PrivateRoutes from './routes/PrivateRoutes';
import CreateJobPost from './components/reuses/CreateJobPost';
import JobDetails from './components/reuses/JobDetails';
import AllAplicat from './components/reuses/AllAplicat';
function App() {

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/me" />
          <Route element={<CreateJobPost />} path="/createJob" />
          <Route element={<AllAplicat />} path="/allApplicant/:id" />

          <Route element={<JobDetails />} path="/jobDetails/:id" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  )
}

export default App
