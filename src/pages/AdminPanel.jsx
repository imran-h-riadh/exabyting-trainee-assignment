import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HttpReg from "../httpReq/HttpReg";

export default function AdminPanel() {
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [userStatus, setUserStatus] = useState("ALL");
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const { get, remove } = HttpReg();

  async function handleStatusChange(newStatus) {
    if (newStatus == "ALL") {
      setUserStatus(newStatus);
      fetchData();
    } else {
      const response = await get(`/users/roles/${newStatus}`);

      if (response.status === 200) {
        setAllUserInfo(response.data);
        setUserStatus(newStatus);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [pageNumber]);
  const fetchData = async () => {
    const response = await get(`/users/?pageNumber=${pageNumber}&&pageSize=3`);

    if (response.status === 200) {
      setAllUserInfo(response.data);
    }
  };

  async function handleUserdelete(id) {
    const response = await remove(`/users/${id}`);
    if (response.status === 200) {
      setAllUserInfo((prevState) => ({
        ...prevState,
        content: prevState.content.filter((user) => user.id !== id),
      }));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6  shadow-md rounded-lg">
      <button
        className="mb-10 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <h2 className="text-2xl font-bold mb-4">Admin panel</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">
              <select
                value={userStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-gray-100 border border-gray-300 text-gray-600 py-1 px-2 rounded-lg"
              >
                <option value="ALL">All</option>
                <option value="APPLICANT">APPLICANT</option>
                <option value="HR">HR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </th>

            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {allUserInfo?.content?.map((userInfo) => (
            <tr
              key={userInfo.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">
                {" "}
                <Link to={`/me/${userInfo.id}`}>{userInfo.name}</Link>{" "}
              </td>

              <td className="py-3 px-6 text-left">{userInfo.roles[0]}</td>

              <td className="py-3 px-6">
                <button
                  type="button"
                  onClick={() => handleUserdelete(userInfo.id)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-3 mt-8 ">
        {pageNumber !== 0 && (
          <button
            onClick={() => setPageNumber((pageNumber) => pageNumber - 1)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            Previous
          </button>
        )}
        {pageNumber < Math.ceil(allUserInfo.totalElements / 3) - 1 && (
          <button
            onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
