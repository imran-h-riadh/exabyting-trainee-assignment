import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import HttpReg from "../httpReq/HttpReg";
import Error from "../components/common/Error";
import { LoadingContext } from "../context";

export default function ProfilePage() {
  const { get, post, put } = HttpReg();
  const { isLoading } = useContext(LoadingContext);
  const auth = JSON.parse(localStorage.getItem("user"));
  let { id } = useParams();
  const [userData, setUserData] = useState({});
  const [appliedData, setAppliedData] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [file, setFile] = useState(null);
  let itSelf = false;

  if (auth?.userDto?.id == id) {
    itSelf = true;
  }

  if (!id) {
    id = auth?.userDto?.id;
  }

  async function fetchData() {
    try {
      const response = await get(`/users/${id}`);
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error("Failed to fetch user data", response);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  }

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await post(`/files/image/upload/`, formData);
      if (response.status === 200) {
        const submitData = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          roles: userData.roles,
          profile: {
            firstName: "",
            lastName: "",
            contactNumber: userData.profile.contactNumber,
            address: userData.profile.address,
            profileImgUrl: response.data.url,
          },
        };
        const updateResponse = await put(`/users/update/${id}`, submitData);
        if (updateResponse.status === 200) {
          fetchData();
        } else {
          console.error("Failed to update user", updateResponse);
        }
      } else {
        console.error("File upload failed", response);
      }
    } catch (error) {
      console.error("Error during file upload", error);
    }
  };

  function isAuth(role) {
    return auth?.userDto?.roles?.some((each) => each === role);
  }

  async function myAppliedJob() {
    try {
      const response = await get(`/applications/users/${id}`);
      if (response.status === 200) {
        const applications = response.data.content;
        setAppliedData(applications);
        await fetchJobDetails(applications);
      } else {
        console.error("Failed to fetch applied jobs", response);
      }
    } catch (error) {
      console.error("Error fetching applied jobs", error);
    }
  }

  async function fetchJobDetails(applications) {
    const jobDetailsMap = {};
    for (const application of applications) {
      try {
        const response = await get(`/jobs/${application.jobOpeningId}`);
        if (response.status === 200) {
          jobDetailsMap[application.jobOpeningId] = response.data;
        } else {
          console.error(
            `Failed to fetch job details for jobOpeningId ${application.jobOpeningId}`,
            response
          );
        }
      } catch (error) {
        console.error(
          `Error fetching job details for jobOpeningId ${application.jobOpeningId}`,
          error
        );
      }
    }
    setJobDetails(jobDetailsMap);
  }

  useEffect(() => {
    fetchData();
    if (isAuth("APPLICANT")) {
      myAppliedJob();
    }
  }, []);
  if (isLoading) return <Error />;
  return (
    <div className="max-w-full mx-auto p-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 mb-4 relative">
          <img
            src={userData?.profile?.profileImgUrl || "default-profile.png"}
            alt="profile pic"
            className="w-full h-full rounded-full object-cover shadow-lg"
          />
        </div>
        {itSelf && (
          <>
            <input
              type="file"
              onChange={handleChange}
              className="w-full max-w-sm p-3 border border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full max-w-sm bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Upload Photo
            </button>
          </>
        )}
      </div>

      <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            User Information
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Name:
            </label>
            <p className="text-gray-900 dark:text-gray-100">{userData.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <p className="text-gray-900 dark:text-gray-100">{userData.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Roles:
            </label>
            <ul className="list-disc list-inside text-gray-900 dark:text-gray-100">
              {userData?.roles?.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Contact Number:
            </label>
            <p className="text-gray-900 dark:text-gray-100">
              {userData?.profile?.contactNumber}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Street:
            </label>
            <p className="text-gray-900 dark:text-gray-100">
              {userData?.profile?.address?.street}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              City:
            </label>
            <p className="text-gray-900 dark:text-gray-100">
              {userData?.profile?.address?.city}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Country:
            </label>
            <p className="text-gray-900 dark:text-gray-100">
              {userData?.profile?.address?.country}
            </p>
          </div>
        </div>
        {itSelf && (
          <Link
            to={`/updateInfo?id=${auth?.userDto?.id}`}
            className="block text-center text-blue-500 dark:text-blue-300 p-4"
          >
            Update your Information
          </Link>
        )}
      </div>

      {isAuth("APPLICANT") && (
        <>
          <p className="text-gray-900 dark:text-gray-100 mt-6 text-xl font-semibold">
            Applied Jobs
          </p>
          {appliedData?.map((singleApplied) => (
            <div
              key={singleApplied.id}
              className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-bold">Job Name:</span>{" "}
                {jobDetails[singleApplied.jobOpeningId]?.jobTitle ||
                  "Loading..."}
              </p>
              <div className="text-gray-900 dark:text-gray-100">
                <span className="font-bold">Resume Link:</span>{" "}
                <a
                  href={singleApplied.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {singleApplied.resumeLink}
                </a>
              </div>
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-bold">Status:</span>{" "}
                {singleApplied.status}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
