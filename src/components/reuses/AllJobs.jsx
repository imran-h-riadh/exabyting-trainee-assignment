/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import HttpReg from "../../httpReq/HttpReg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AllJobs() {
  const { auth } = useAuth();
  const { get, remove } = HttpReg();

  const [allJobInfo, setAllJobInfo] = useState([]);
  const [jobStatus, setJobStatus] = useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await get(`/jobs/`);
    console.log(response);

    if (response.status === 200) {
      setAllJobInfo(response.data.content);
    }
  };
  function isAuth(role) {
    return auth.userDto.roles.some((each) => each == role);
  }
  async function handleStatusChange(newStatus) {
    if (newStatus == "ALL") {
      setJobStatus(newStatus);
      fetchData();
    } else {
      const response = await get(`/jobs/status/${newStatus}`);
      console.log(response);

      if (response.status === 200) {
        setAllJobInfo(response.data.content);
        setJobStatus(newStatus);
      }
    }
  }
  async function handleJobdelete(id) {
    const response = await remove(
      `${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${id}`
    );
    if (response.status === 200) {
      setAllJobInfo((allJobInfo) => allJobInfo.filter((job) => job.id !== id));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Job List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Job Title</th>
            <th className="py-3 px-6 text-left">No. of Vacancies</th>
            <th className="py-3 px-6 text-left">
              <select
                value={jobStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-600 py-1 px-2 rounded-lg"
              >
                <option value="ALL">All</option>
                <option value="OPEN">OPEN</option>
                <option value="CLOSE">CLOSE</option>
              </select>
            </th>
            {(isAuth("ADMIN") || isAuth("HR")) && (
              <th className="py-3 px-6 text-left">Actions</th>
            )}
            {(isAuth("ADMIN") || isAuth("HR")) && (
              <th className=" py-3 px-6 text-left">All Applicant</th>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {allJobInfo.map((jobInfo) => (
            <tr
              key={jobInfo.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">
                {" "}
                <Link to={`/JobDetails/${jobInfo.id}`}>
                  {jobInfo.jobTitle}
                </Link>{" "}
              </td>
              <td className="py-3 px-6 text-left">
                {jobInfo.noOfVacancy ?? 0}
              </td>
              <td className="py-3 px-6 text-left">{jobInfo.status}</td>
              {(isAuth("ADMIN") || isAuth("HR")) && (
                <td className="py-3 px-6">
                  <button
                    type="button"
                    onClick={() => handleJobdelete(jobInfo.id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              )}
              {(isAuth("ADMIN") || isAuth("HR")) && (
                <td className="py-3 px-6 text-left">
                  {" "}
                  <Link to={`/allApplicant/${jobInfo.id}`}>
                    see all applicant
                  </Link>{" "}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
