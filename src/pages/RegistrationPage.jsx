import Field from "../components/common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


import axios from "axios";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    formData = {
      ...formData,
      roles: ["APPLICANT"],
      profile: {
        firstName: null,
        lastName: null,
        contactNumber: null,
        address: {
          street: null,
          city: null,
          country: null,
        },
      },
    };
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/signup`,
        formData
      );

      if (response.status === 201) {
        console.log("xxxxxxxx");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Registration failed`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px] mx-96"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="name" error={errors.name}>
        <input
          {...register("name", { required: "name ID is Required" })}
          className={`auth-input ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
          type="name"
          name="name"
          id="name"
        />
      </Field>
      <Field label="email" error={errors.email}>
        <input
          {...register("email", { required: "email ID is Required" })}
          className={`auth-input ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
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
        <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
          Registration
        </button>
      </Field>
    </form>
  );
};

export default RegistrationPage;
