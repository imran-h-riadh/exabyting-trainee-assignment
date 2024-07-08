import { useContext, useEffect, useState } from "react";
import HttpReg from "../httpReq/HttpReg";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../context";
import Error from "../components/common/Error";

export default function UpdateInfo() {
  const { isLoading } = useContext(LoadingContext);

  const { get, put } = HttpReg();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    roles: [],
    profile: {
      contactNumber: "",
      address: {
        street: "",
        city: "",
        country: "",
      },
    },
  });

  async function fetchData() {
    const response = await get(`/users/${id}`);
    if (response.status === 200) {
      const data = response.data;
      setFormData((prevState) => ({
        ...prevState,
        ...data,
        profile: {
          ...prevState.profile,
          ...data.profile,
          address: {
            ...prevState.profile.address,
            ...data.profile?.address,
          },
        },
      }));
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "country"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          address: {
            ...prevState.profile.address,
            [name]: value,
          },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      roles: formData.roles,
      profile: {
        contactNumber: formData.profile.contactNumber,
        address: formData.profile.address,
        profileImgUrl: formData?.profile?.profileImgUrl,
      },
    };
    console.log(submitData);
    const response = await put(`/users/update/${id}`, submitData);
    if (response.status === 200) {
      navigate(`/me/${id}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) return <Error />;

  return (
    <>
      <button
        className="mb-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Update User Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={formData.profile.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="street"
            >
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={formData.profile.address.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.profile.address.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
              htmlFor="country"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={formData.profile.address.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 dark:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
