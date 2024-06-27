import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CreateJobPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const { api } = useAxios();

  const initialVal = {
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    NoOfVacancy: null,
    deadLine: "",
    status: "OPEN",
  };
  const [formData, setFormData] = useState(initialVal);
  const fetchData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${id}`
      );
      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
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
    if (name === "NoOfVacancy") {
      newValue = Number(value);
    }
    console.log("name==", name, "     val == ", newValue);
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    console.log("Form data submitted:", formData);

    if (id) {
      try {
        const response = await api.put(
          `${import.meta.env.VITE_SERVER_BASE_URL}/jobs/${id}`,
          formData
        );
        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
      setFormData(initialVal);
      
    }
     else {

      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/jobs/`,
          formData
        );
        if (response.status === 201) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
      setFormData(initialVal);
    }
  };

  return (
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
          <label htmlFor="NoOfVacancy" className="block  mb-2">
            Number of Vacancies
          </label>
          <input
            type="number"
            id="NoOfVacancy"
            name="NoOfVacancy"
            value={formData.NoOfVacancy?? 0}
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
  );
};

export default CreateJobPost;
