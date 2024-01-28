import React, { useState, Fragment } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";

function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Extract the reset token from the URL (replace this with your actual logic)
      const pathTokens = window.location.pathname.split('/');
      const resetToken = pathTokens[pathTokens.length - 1];
      
      // Make an API request to reset the password using fetch
      const response = await fetch("http://localhost:8088/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resetToken,
          password: data.password,
        }),
      });

      const result = await response.json();
      // navigate("/login");
      // Handle success (you might want to redirect the user to a login page)
      console.log("Password reset successful:", result.message);

    } catch (error) {
      // Handle errors (display error message to the user)
      console.error("Error resetting password:", error);
      setErrMsg({
        status: "failed",
        message:
          error.message || "An unexpected error occurred.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
     <div className='w-full h-[100vh] bg-slate-100 flex items-center justify-center p-6'>
      <div className='bg-slate-200 w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg'>
        <p className='text-ascent-1 text-lg font-semibold'>New password</p>

        <span className='text-sm text-ascent-2'>
          Enter New password
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='py-4 flex flex-col gap-5'
        >
          <input
  name="password"
  placeholder="Password"
  type="password"
  className="w-full rounded-full text-black"
  {...register("password", {
    required: "Password is required!",
  })}
/>
{errors.password && (
  <span role="alert" className="text-sm text-[#f64949fe] mt-0.5">
    {errors.password.message}
  </span>
)}

          {errMsg?.message && (
            <span
              role='alert'
              className={`text-sm ${
                errMsg?.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              } mt-0.5`}
            >
              {errMsg?.message}
            </span>
          )}

 {isSubmitting ? (
            <Loading />
          ) : (
          <button type="submit" title="Submit" className="bg-green-500 w-20 rounded-md" onClick={handleSubmit(onSubmit)}>
            Submit
          </button> 
          
          )}<a href="/login"> Aller a seconnecter </a> 
        </form>
      </div>
    </div>
    </Fragment>
  );
}

export default Login;