/* eslint-disable no-empty */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HttpReg from "../../httpReq/HttpReg";
import { LoadingContext } from "../../context";
import Error from "../common/Error";

export default function AllAplicat() {
  const navigate = useNavigate();
  const { get, put } = HttpReg();
  const { id } = useParams();
  const [allApplicant, setAllApplicant] = useState([]);
  const [statusInfo, setStatusInfo] = useState({});
  const { isLoading } = useContext(LoadingContext);
  const handleChange = (e, applicantId) => {
    setStatusInfo((prev) => ({
      ...prev,
      [applicantId]: e.target.value,
    }));
  };

  async function handleSubmit(applicant) {
    const submitData = {
      id: applicant.id,
      resumeLink: applicant.resumeLink,
      status: statusInfo[applicant.id],
      jobOpeningId: applicant.jobOpeningId,
      userId: applicant.userId,
    };

    const response = await put(
      `/applications/${submitData.id}/updateStatus/${submitData.status}`,
      submitData
    );
    if (response.status === 200) {
      fetchData();
    }
  }

  const fetchData = async () => {
    const response = await get(`/applications/jobs/${id}`);
    if (response.status === 200) {
      setAllApplicant(response.data.content);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!allApplicant || allApplicant.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <button
          className="mb-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <p className="text-6xl font-bold text-red-500">
          There is no applicant for this role
        </p>
      </div>
    );
  }
  if (isLoading) return <Error />;
  return (
    <div className="bg-gray-900 text-white p-4">
      <button
        className="mb-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      {allApplicant.map((applicant, index) => (
        <div
          key={applicant.id}
          className="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg"
        >
          <p>Applicant {index + 1}</p>
          <div className="flex flex-col space-y-2">
            <p>
              CV Link:{" "}
              <a
                href={applicant.resumeLink}
                className="text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {applicant.resumeLink}
              </a>
            </p>
            <div>
              <h1 className="text-lg font-semibold mb-2">Applicant Status</h1>
              <select
                value={statusInfo[applicant.id] || applicant.status}
                onChange={(e) => handleChange(e, applicant.id)}
                className="bg-gray-700 text-white border border-gray-600 rounded p-2"
              >
                <option value="PENDING">PENDING</option>
                <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                <option value="SHORTLISTED">SHORTLISTED</option>
                <option value="INTERVIEW_SCHEDULED">INTERVIEW_SCHEDULED</option>
                <option value="INTERVIEWED">INTERVIEWED</option>
                <option value="OFFER_ACCEPTED">OFFER_ACCEPTED</option>
                <option value="OFFER_DECLINED">OFFER_DECLINED</option>
                <option value="WITHDRAWN">WITHDRAWN</option>
                <option value="NOT_SELECTED">NOT_SELECTED</option>
              </select>
              <p className="mt-2">Current Status: {applicant.status}</p>
              <button
                onClick={() => handleSubmit(applicant)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
