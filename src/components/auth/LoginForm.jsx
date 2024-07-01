import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const {setAuth} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

      if (response.status === 200) {
        const { jwtToken, userDto,profile } = response.data;
        
        

          
          setAuth({userDto, jwtToken, profile});

          navigate("/");
        
      }
    } catch(error){
      console.error(error);
      setError("root.random", {
        type: "random",
        message:`User with email ${formData.email} is not found`,
      })
    }
  }

  return (
    <form
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
        >
           <Field label="username" error={errors.username}>
            <input
                {...register("username", {required: "username ID is Required"})}
                className={`auth-input ${
                    errors.username ? "border-red-500" : "border-gray-200"
                  }`}
                type="username"
                name="username"
                id="username"
             />
           </Field>

           <Field label="Password" error={errors.password}>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Your password must be at least 8 characters",
                },
              })}
              className={`auth-input ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
              type="password"
              name="password"
              id="password"
            />
          </Field>
          <p>{errors?.root?.random?.message}</p>
          <Field>
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
                Login
            </button>
          </Field>

    </form>
  )
}

export default LoginForm