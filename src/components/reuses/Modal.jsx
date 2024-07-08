import { useState } from "react";
import validator from "validator";
import HttpReg from "../../httpReq/HttpReg";

// eslint-disable-next-line react/prop-types
export default function Modal({ setShowModal, handleSubmitApply }) {
  const [cvLink, setCvlink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [file, setFile] = useState(null);
  const { post } = HttpReg();

  const validate = (value) => {
    setCvlink(value);
    if (validator.isURL(value)) {
      setErrorMessage(`${value} is a valid URL`);
      setIsDisabled(file === null); // Enable button only if file is also selected
    } else {
      setErrorMessage(`${value} is not a valid URL`);
      setIsDisabled(true);
    }
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile && validator.isURL(cvLink)) {
      setIsDisabled(false); // Enable button only if URL is valid
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await post(`/files/cv/upload/`, formData);
      console.log(response.data);
      if (response.status === 200) {
        handleSubmitApply(response.data.url, cvLink); // Assuming handleSubmitApply needs to be called after successful upload
        console.log(response.data.url);
      }
    } catch (error) {
      /* empty */
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center text-black">
          Add Your CV Link
        </h2>
        <input
          type="text"
          placeholder="Enter your social media link"
          value={cvLink}
          onChange={(e) => validate(e.target.value)}
          className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p
          className={`${
            validator.isURL(cvLink) ? "text-green-600" : "text-red-600"
          }`}
        >
          {errorMessage}
        </p>
        <input
          type="file"
          onChange={handleChange}
          className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={(e) => handleSubmit(e)}
          disabled={isDisabled}
        >
          Apply
        </button>
        <button
          className="w-full bg-red-400 text-white p-3 rounded-lg mt-4 hover:bg-red-600 transition duration-300"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
