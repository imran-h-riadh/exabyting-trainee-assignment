import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { auth } = useAuth();
  const { name, email, roles } = auth.userDto;
  console.log(auth);
  return (
    <div className="max-w-sm mx-auto  shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">User Information</h2>
        <div className="mb-4">
          <label className="block ">Name:</label>
          <p className="">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block ">Email:</label>
          <p className="">{email}</p>
        </div>
        <div className="mb-4">
          <label className="block ">Roles:</label>
          <ul className="list-disc list-inside ">
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div> 
      </div>
      
      <Link to={`/updateInfo?id=${auth.userDto.id}`} > update your Information</Link>
    </div>
  )
}
