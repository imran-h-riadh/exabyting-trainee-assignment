/* eslint-disable no-empty */

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import HttpReg from "../../httpReq/HttpReg";
import { ErrorPageContext } from "../../context";

export default function JobDetails() {
  const { get, post } = HttpReg();
  const { isError } = useContext(ErrorPageContext);
  const { id } = useParams();
  const auth = JSON.parse(localStorage.getItem("user"));

  const [detailInfo, setDetailInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await get(`/jobs/${id}`);
    if (response.status === 200) {
      setDetailInfo(response.data);
    }
  };

  const navigateToUser = (id) => {
    navigate(`/createJob?id=${id}`);
  };

  function isAuth(role) {
    return auth?.userDto?.roles?.some((each) => each === role);
  }
  async function handleSubmitApply(cvLink, socialUrl) {
    const submitData = {
      resumeLink: cvLink,
      status: "PENDING",
      jobOpeningId: id,
      userId: auth.userDto.id,
      socialUrl: socialUrl,
    };
    console.log(submitData);

    const response = await post(`/applications/`, submitData);
    if (response.status === 201) {
      navigate("/");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  if (isError)
    return (
      <div className="flex justify-center items-center h-full">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            You can not apply twice for an application.
          </span>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md ">
      <button
        className="mb-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>

      <h1 className="text-3xl font-bold mb-4">{detailInfo.jobTitle}</h1>
      <p className="text-gray-700 mb-4">{detailInfo.jobDescription}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Requirements:</h2>
        <p className="text-gray-700">{detailInfo.requirements}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Status:</h2>
        <p
          className={`text-sm font-medium ${
            detailInfo.status === "OPEN" ? "text-green-500" : "text-red-500"
          }`}
        >
          {detailInfo.status}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Deadline:</h2>
        <p className="text-gray-700">
          {new Date(detailInfo.deadLine).toLocaleDateString()}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Number of Vacancies:</h2>
        <p className="text-gray-700">{detailInfo.noOfVacancy || "N/A"}</p>
      </div>
      <div className="flex space-x-4">
        {isAuth("ADMIN") || isAuth("HR") ? (
          <button
            onClick={() => navigateToUser(id)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Job Post
          </button>
        ) : null}

        {detailInfo.status === "OPEN" && isAuth("APPLICANT") ? (
          <button
            onClick={() => setShowModal(!showModal)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            APPLY
          </button>
        ) : null}
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleSubmitApply={handleSubmitApply}
        />
      )}
    </div>
  );
}
