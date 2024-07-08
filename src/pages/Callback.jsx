import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Callback = () => {
  const navigate = useNavigate();
  async function fetchData(token) {
    console.log(token);
    try {
      const response = await axios.get("http://172.16.20.24:8080/api/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const { jwtToken, userDto } = response.data;
        console.log(jwtToken);
        localStorage.setItem("user", JSON.stringify({ userDto, jwtToken }));

        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      const jwtToken = token;
      localStorage.setItem("user", JSON.stringify({ jwtToken }));
      fetchData(token);
    }
  }, [navigate]);

  return <p>alskdhjasklaskcjlkaslkasj</p>;
};

export default Callback;
