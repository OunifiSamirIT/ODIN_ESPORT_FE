import React, { useState, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Context } from "../../../index";

import Loading from "../../../components/Loading";
import { Config } from "../../../config";
function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [PasswordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State to store confirmed password
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues, // Access the form values
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      // Check if passwords match
      if (data.password !== confirmPassword) {
        throw new Error("Les mots de passes ne sont pas identique");
      }

      setIsSubmitting(true);
      // Extract the reset token from the URL (replace this with your actual logic)
      const pathTokens = window.location.pathname.split("/");
      const resetToken = pathTokens[pathTokens.length - 1];

      // Make an API request to reset the password using fetch
      const response = await fetch(
        `${Config.LOCAL_URL}/api/auth/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: resetToken,
            password: data.password,
          }),
        }
      );

      const result = await response.json();
      navigate("/login");
      // Handle success (you might want to redirect the user to a login page)
    } catch (error) {
      // Handle errors (display error message to the user)

      setErrMsg({
        status: "failed",
        message: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Fragment>
      {/* <div className='w-full h-[100vh] bg-slate-100 flex items-center justify-center p-6'>
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
    </div> */}

      <div className="flex flex-col justify-center text-base bg-zinc-100 text-zinc-900">
        <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-12 w-full min-h-[1024px] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative flex-col p-12 mt-48 mb-36 max-w-full rounded-xl bg-zinc-100 w-[782px] max-md:px-5 max-md:my-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c65bfcf8bb3554a7102634f0328dde42e3b8f29c41e3a69e0c27343a5900b8d9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
              className="self-center max-w-full aspect-[2.78] w-[132px]"
            />
            <div className="self-center mt-10 md:text-5xl text-3xl  font-bold leading-10 text-center max-md:max-w-full">
              {getTranslation(
                `Ready for a new beginning!`,
                ` Prêt pour un nouveau départ !`
              )}
            </div>
            <div className="self-center md:text-2xl text-xl  text-center max-md:max-w-full">
              {getTranslation(
                `Enter your new password below.`,
                ` Entrez votre nouveau mot de passe ci-dessous.`
              )}
            </div>

            <div className="flex items-center justify-center h-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md w-full"
              >
                <div className="flex gap-2  justify-between px-4 mt-4 text-lg max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/57edfbdbfb51f4894d754d65f24afb188fead8316f7ffe01e5d1defef74fd8ee?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start w-5 aspect-square"
                  />
                  <div className="grow md:text-lg text-sm max-md:max-w-full">
                    {getTranslation(`New password`, ` Nouveau mot de passe`)}
                  </div>
                </div>
                <div className="px-4">
                  <input
                    name="password"
                    placeholder={getTranslation(
                      `New password`,
                      ` Nouveau mot de passe`
                    )}
                    type="password"
                    className="flex flex-col justify-center mt-2 py-2 px-4 whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:max-w-full"
                    {...register("password", {
                      required: getTranslation(
                        `This field is required`,
                        ` Ce champs est Obligatoire !`
                      ),
                    })}
                  />
                  {errors.password && (
                    <span
                      role="alert"
                      className="text-sm text-[#f64949fe] mt-0.5"
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 justify-between px-4 mt-4 text-lg max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/57edfbdbfb51f4894d754d65f24afb188fead8316f7ffe01e5d1defef74fd8ee?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="self-start w-5 aspect-square"
                  />
                  <div className="grow md:text-lg text-sm max-md:max-w-full">
                    {getTranslation(
                      `Confirm your password`,
                      `Confirmer votre mot de passe`
                    )}
                  </div>
                </div>
                <div className="px-4">
                  <input
                    name="confirmPassword"
                    placeholder={getTranslation(
                      `Confirm your password`,
                      `Confirmer votre mot de passe`
                    )}
                    type="password"
                    className="flex flex-col justify-center mt-2 py-2 px-4 whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:max-w-full"
                    onChange={handleConfirmPasswordChange} // Add onChange event to update confirmed password
                  />
                  {errors.confirmPassword && (
                    <span
                      role="alert"
                      className="text-sm text-[#f64949fe] mt-0.5"
                    >
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                {confirmPassword !== getValues("password") &&
                  errMsg && ( // Display error message when passwords don't match
                    <span
                      role="alert"
                      className="text-sm text-[#f64949fe] mt-0.5"
                    >
                      {errMsg.message}
                    </span>
                  )}
                <div className="shrink-0 mt-8 h-px bg-stone-300 max-md:max-w-full" />

                {isSubmitting ? (
                  <Loading />
                ) : (
                  <>
                    <div className="flex justify-center items-center px-16 py-2 mt-4 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea4299d0c44911f98424151c7a12e49ccf31dc7dc28abecc45b30e241619fe61?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                          className="w-5 aspect-square"
                        />
                        <button
                          type="submit"
                          onClick={handleSubmit(onSubmit)}
                          className="grow"
                        >
                          {" "}
                          {getTranslation(`Submit`, `Confirmer`)}
                        </button>{" "}
                      </div>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
