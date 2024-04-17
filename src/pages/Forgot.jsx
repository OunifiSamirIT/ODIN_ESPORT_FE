import React, { Component, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { Config } from "../config";
function Forgot() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Form submitted!", data);

    try {
      setIsSubmitting(true);

      // Make an API request to initiate the password reset
      const response = await fetch(
        `${Config.LOCAL_URL}/api/auth/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        console.log("Password reset email sent successfully:", result.message);
        setVerificationMessage(
          <div className="flex items-center justify-between bg-primary text-xl mt-8 animate-bounce">
            Please verify your email before logging in.
          </div>
        );
        setIsFormSubmitted(true); // Set the state to true after successful submission
        // Optionally, you can redirect the user to a success page or display a success message
        // navigate("/success");
      } else {
        // Handle error response from the server
        console.error(
          "Error sending password reset email:",
          result.error || "An unexpected error occurred."
        );
        setErrMsg({
          status: "failed",
          message: result.error || "An unexpected error occurred.",
        });
      }
    } catch (error) {
      // Handle errors (display error message to the user)
      console.error("Error sending password reset email:", error);
      setErrMsg({
        status: "failed",
        message: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Fragment>
      {/* <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
        <div className="flex gap-5 justify-between py-6 w-full text-base font-medium text-white whitespace-nowrap max-w-[1184px] max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0413e8a01fde75a6e85ca564684bc6f7a566ec32588ee9716634efb33c5b73df?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
          className="ml-9 w-36 max-w-full aspect-[2.7]"
        />
        <div className="justify-center px-8 py-2 my-auto mr-5 bg-zinc-900 rounded-[30px] max-md:px-5">
          Log In
        </div>
      </div>
        </div>

        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url("https://via.placeholder.com/800x950.png")`,
            }}
          ></div>

          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-4">
                  Forgot Password
                </h2>
                <span className="text-sm text-ascent-2">Enter Your Email</span>
               
<form onSubmit={handleSubmit(onSubmit)}>
  <div className="form-group icon-input mb-3">
    <input
      name="email"
      label="Email"
      placeholder="Email"
      type="email"
      {...register("email", {
        required: "Email is required!",
      })}
      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
    />
    <i className="font-sm ti-email text-grey-500 pe-0"></i>
  </div>
  
  {errors.email && (
    <span className="text-sm text-[#f64949fe] mt-0.5">
      {errors.email.message}
    </span>
  )}

  <button type="submit" title="Submit" className="w-40 h-10 rounded-md  bg-blue-500 ">
    Submit
  </button>
</form>

              
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col justify-center text-base bg-zinc-100">
        <div className="flex overflow-hidden relative flex-col justify-center items-center md:px-16  px-2 py-0 w-full min-h-[1024px] max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/dd7cc95bf1ef4d7884cc8ee2815350e91d3556fbab00930f533e05884526516b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="flex relative flex-col p-12 mt-6  mb-20 max-w-full md:rounded-xl rounded-lg  bg-zinc-100 w-[782px] max-md:px-5 max-md:my-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/29d8fa56686a8659c275f3be19cc8dbb868964c5783c5de0de15d0332ce23f91?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
              className="self-center max-w-full aspect-[2.78] w-[132px]"
            />
            <div className="self-center mt-10 md:text-5xl text-2xl font-bold leading-7 text-center text-zinc-900 w-[482px] max-md:max-w-full">
              Besoin de réinitialiser votre mot de passe ?
            </div>
            <div className="self-center text-lg md:text-2xl text-center mt-3 text-zinc-900 w-[482px] max-md:max-w-full">
              Entrez votre adresse e-mail ci-dessous et nous vous enverrons un
              lien pour réinitialiser votre mot de passe.
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center flex-col w-full mt-4"
            >
              <div className="w-full ">
                <div className="flex gap-2 md:items-center items-start md:justify-center  justify-start md:mx-0 px-6  mt-4 text-lg whitespace-nowrap text-zinc-900  ">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ba5157f473db3352f2534a6bec159a2f875c4a9b8899aaf842b6be66f33272d?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                    className="mt-1 self-start aspect-[1.1] w-[19px] md:w-[22px]"
                  />
                  <div className="">Email</div>
                </div>
                
              </div>
              <input
                  name="email"
                  label="Email"
                  placeholder="Insérer votre email"
                  type="email"
                  {...register("email", {
                    required: "Ce champ est obligatoire",
                  })}
                  className="py-3.5 pr-16 pl-4 mt-2 whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 mx-auto w-full md:w-fit"
                />
              {errors.email && (
                <span className="text-sm text-[#f64949fe] mt-0.5">
                  {errors.email.message}
                </span>
              )}
              <button
                type="submit"
                className="justify-center items-center px-16 py-2 pt-2 mt-6 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:mt-10 w-full md:w-fit  hover:bg-blue-900
                duration-150 "
              >
                Envoyer le lien
              </button>
              {isFormSubmitted && (
                <div className="flex justify-center items-center text-center px-4 py-2 mt-6 md:text-xl text:sm  font-medium text-white bg-green-500 rounded-lg">
                  Veuillez accéder à votre boîte email pour confirmer votre
                  adresse e-mail !{" "}
                </div>
              )}
              <Link to="/login" className="w-full text-center">
                <button className="justify-center items-center px-16 py-2 mt-3 font-medium text-blue-600 whitespace-nowrap border border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5  w-full md:w-fit md:bg-transparent hover:bg-blue-200 bg-blue-200 
                duration-150 ">
                  Se connecter
                </button>
              </Link>
            </form>

            <div className="flex justify-center flex-col md:justify-around md:flex-row self-center my-4 max-w-full w-[458px]  max-md:px-5">
              <div className=" text-zinc-900 md:w-fit  mt-0  w-full text-center text-sm md:text-base">
                Vous n'avez pas compte ?
              </div>
              <Link
                to="/register"
                className="font-medium md:w-fit w-full mt-2 md:mt-0 text-center text-blue-600 underline text-sm md:text-base"
              >
                Creer un compte{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Forgot;
