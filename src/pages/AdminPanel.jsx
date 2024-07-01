import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HttpReg from "../httpReq/HttpReg";

export default function AdminPanel() {
    const [allUserInfo, setAllUserInfo] = useState([]);
  const [userStatus, setUserStatus] = useState("ALL");

  const { get, remove } = HttpReg()

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
      const fetchData = async () => {
        const response = await get(`/users/`);
    
        if (response.status === 200) {
          setAllUserInfo(response.data);
        }
      };
      async function handleUserdelete(id) {
        const response = await remove(
          `/users/${id}`
        );
        if (response.status === 200) {
            
          setAllUserInfo((prevState) => ({
            ...prevState,
            content: prevState.content.filter(user => user.id !== id)
          }));
          
        }
      }
    
  return (
    <div className="max-w-4xl mx-auto p-6  shadow-md rounded-lg">
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
                <Link to={`/JobDetails/${userInfo.id}`}>
                  {userInfo.name}
                </Link>{" "}
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
    </div>
  )
}
