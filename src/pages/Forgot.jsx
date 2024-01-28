import React, { Component, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

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
        "http://localhost:8088/api/auth/forgotPassword",
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
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <a href="/">
              <i className="feather-zap text-success display1-size me-2 ms-0"></i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                Sociala.{" "}
              </span>{" "}
            </a>
            <button className="nav-menu me-0 ms-auto"></button>

            <a
              href="/login"
              className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
            >
              Login
            </a>
            <a
              href="/register"
              className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
            >
              Register
            </a>
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
                {/* {verificationMessage} */}
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group icon-input mb-3">
                    <input
                      name="email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                      register={register("email", {
                        required: "Email is required!",
                      })}
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                    />
                    <i className="font-sm ti-email text-grey-500 pe-0"></i>
                  </div>
                  {errMsg?.message && (
                    <span
                      role="alert"
                      className={`text-sm ${
                        errMsg?.status === "failed"
                          ? "text-[#f64949fe]"
                          : "text-[#2ba150fe]"
                      } mt-0.5`}
                    >
                      {errMsg?.message}
                    </span>
                  )} 
                
                  <button type="submit" title="Submit" className="bg-red-900"  >ddddd</button>

          
                 
                    <div className="col-sm-12 p-0 text-left">
                 
                </div>
                </form> */}
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
  
  {/* Display error message if there is an error */}
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
      </div>
    </Fragment>
  );
}

export default Forgot;
