/* eslint-disable no-empty */


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Modal from './Modal';
import HttpReg from '../../httpReq/HttpReg';

export default function JobDetails() {
  
  const { get } = HttpReg();

  const { api } = useAxios();
  const { id } = useParams();
  const { auth } = useAuth();

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
    return auth.userDto.roles.some((each) => each === role);
  }
  async function handleSubmitApply(cvLink){
    const submitData = {
      resumeLink: cvLink,
      status: "PENDING",
      jobOpeningId: id,
      "userId": auth.userDto.id

  }
  try {
    const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/applications/`,submitData);
    if (response.status === 201) {
      navigate("/");
    }
  } catch (error) {
    
  }

}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold mb-4">{detailInfo.jobTitle}</h1>
      <p className="text-gray-700 mb-4">{detailInfo.jobDescription}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Requirements:</h2>
        <p className="text-gray-700">{detailInfo.requirements}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Status:</h2>
        <p className={`text-sm font-medium ${detailInfo.status === 'OPEN' ? 'text-green-500' : 'text-red-500'}`}>
          {detailInfo.status}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Deadline:</h2>
        <p className="text-gray-700">{new Date(detailInfo.deadLine).toLocaleDateString()}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Number of Vacancies:</h2>
        <p className="text-gray-700">{detailInfo.noOfVacancy || 'N/A'}</p>
      </div>
      <div className="flex space-x-4">
        {isAuth('ADMIN') || isAuth('HR') ? (
          <button
            onClick={() => navigateToUser(id)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Job Post
          </button>
        ) : null}
        {isAuth('APPLICANT') ? (
          <button
            onClick={() => setShowModal(!showModal)}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            APPLY
          </button>
        ) : null}
      </div>
      {showModal && <Modal setShowModal={setShowModal} handleSubmitApply={handleSubmitApply} />}
    </div>
  );
}
