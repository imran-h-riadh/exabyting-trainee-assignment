import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export default function AllAplicat() {
  const { api } = useAxios();
  const { id } = useParams();
  const { auth } = useAuth();
  const [allApplicant,setAllApplicant] = useState([]);


  const fetchData = async () => {
    try {
      const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/applications/jobs/${id}`);
      if (response.status === 200) {
        setAllApplicant(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allApplicant);
  useEffect(() => {
    fetchData();
  }, []);
  return <div>AllAplicat</div>;
}
