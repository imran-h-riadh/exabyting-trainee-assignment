/* eslint-disable no-empty */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HttpReg from "../../httpReq/HttpReg";

const CreateJobPost = () => {
  const { get, post, put } = HttpReg();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const initialVal = {
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    noOfVacancy: null,
    deadLine: "",
    status: "OPEN",
  };
  const [formData, setFormData] = useState(initialVal);
  const fetchData = async () => {
    const response = await get(`/jobs/${id}`);
    if (response.status === 200) {
      setFormData(response.data);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "noOfVacancy") {
      newValue = Number(value);
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const response = await put(`/jobs/${id}`, formData);
      if (response.status === 200) {
        navigate("/");
      }

      setFormData(initialVal);
    } else {
      const response = await post(`/jobs/`, formData);

      if (response.status === 201) {
        navigate("/");
      }
      setFormData(initialVal);
    }
  };

  return (
    <>
      <button
        className="mb-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <div className="max-w-lg mx-auto p-6  shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create Job Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block  mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobDescription" className="block  mb-2">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="block  mb-2">
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="noOfVacancy" className="block  mb-2">
              Number of Vacancies
            </label>
            <input
              type="number"
              id="noOfVacancy"
              name="noOfVacancy"
              value={formData.noOfVacancy ?? 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deadLine" className="block  mb-2">
              Deadline
            </label>
            <input
              type="datetime-local"
              id="deadLine"
              name="deadLine"
              value={formData.deadLine}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block  mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            >
              <option value="OPEN">OPEN</option>
              <option value="CLOSE">CLOSE</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Create Job Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateJobPost;
