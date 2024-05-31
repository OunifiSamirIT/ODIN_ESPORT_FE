import React, { useState, Fragment, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Config } from "../config";
import { Context } from "../index";

function VerificationCode() {
  const { getTranslation } = useContext(Context);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const storeduser = JSON.parse(localStorage.getItem("idusercode"));

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const userId = localStorage.getItem("idusercode"); // Get user ID from local storage

      // Concatenate the values from the three inputs
      const verificationToken = data.input1 + data.input2 + data.input3;

      const response = await fetch(
        `${Config.LOCAL_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verificationToken, userId }), // Send concatenated verificationToken
        }
      );

      const result = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setErrMsg(result.message);
      }
    } catch (error) {
      setErrMsg("An error occurred during verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleOtpForm = () => {
      const form = document.getElementById("otp-form");
      const inputs = [...form.querySelectorAll("input[type=text]")];
      const submit = form.querySelector("button[type=submit]");

      const handleKeyDown = (e) => {
        const { key, target } = e;
        if (
          !/^[0-9]{1}$/.test(key) &&
          key !== "Backspace" &&
          key !== "Delete" &&
          key !== "Tab" &&
          !e.metaKey
        ) {
          e.preventDefault();
        }

        if (key === "Delete" || key === "Backspace") {
          const index = inputs.indexOf(target);
          if (index > 0 && target.value === "") {
            inputs[index - 1].focus();
          }
        }
      };

      const handleInput = (e) => {
        const { target } = e;
        const index = inputs.indexOf(target);
        const newValue = target.value.replace(/[^0-9]/g, "").slice(0, 2); // Allow only numbers and limit length to 2
        target.value = newValue;
        if (newValue.length === 2 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      };

      const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        const digits = text
          .replace(/[^0-9]/g, "")
          .slice(0, 6)
          .split(""); // Allow only numbers and limit length to 6
        inputs.forEach((input, index) => {
          input.value = digits[index] || "";
          if (index < digits.length - 1) {
            inputs[index + 1].focus();
          }
        });
      };

      inputs.forEach((input) => {
        input.addEventListener("input", handleInput);
        input.addEventListener("keydown", handleKeyDown);
        input.addEventListener("paste", handlePaste);
      });
    };

    handleOtpForm();

    return () => {
      // Clean up event listeners if component unmounts
      const form = document.getElementById("otp-form");
      if (form) {
        const inputs = [...form.querySelectorAll("input[type=text]")];
        inputs.forEach((input) => {
          input.removeEventListener("input", handleOtpForm);
          input.removeEventListener("keydown", handleOtpForm);
          input.removeEventListener("paste", handleOtpForm);
        });
      }
    };
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col justify-center bg-gray-200 min-h-screen">
        <div className="flex items-center justify-center w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
          <div className="w-full">
            <Link
              to="/"
              className="self-center mt-6 mb-6 max-w-full aspect-[2.78] w-[132px] max-md:mt-10"
            >
              {" "}
              <svg
                width="73"
                height="64"
                className="md:w-[100%] w-[100%] my-4"
                viewBox="0 0 73 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".cls-1{fill:#2e71eb;}.cls-2{fill:#ff7f00;}.cls-3{fill:none;stroke:#2e71eb;stroke-miterlimit:10;stroke-width:0.25px;}",
                    }}
                  />
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className="cls-1"
                      d="M66.81,14.07V52.31H40.53L38.1,47.53l-2.39-4.78L33.32,38l-2.39-4.78,2.39-4.78,2.39-4.78,2.39-4.76,2.43-4.8ZM42.9,18.87l-2.37,4.76L38.1,28.41l-2.39,4.78L38.1,38l2.39,4.78,2.39,4.78H62V18.87Z"
                    />
                    <path
                      className="cls-1"
                      d="M26.3,14.07l2.39,4.78,2.39,4.78,2.39,4.78,2.39,4.78L33.47,38l-2.39,4.78-2.39,4.78L26.3,52.31H0V14.07ZM4.78,18.87V47.55H23.91l2.39-4.78L28.69,38l2.39-4.78-2.39-4.78L26.3,23.65l-2.39-4.78Z"
                    />
                    <path className="cls-2" d="M73.17,0H68.34V4.6h4.83Z" />
                    <rect
                      className="cls-3"
                      x="16.62"
                      y="56.56"
                      width="34.34"
                      height="7.37"
                      rx="2.83"
                    />
                    <path
                      className="cls-1"
                      d="M28.48,62.1a1.13,1.13,0,0,1-.61-.16,1,1,0,0,1-.4-.43,1.4,1.4,0,0,1-.16-.63h.12V62h-.3V58.4h.37v1.81l-.14.33a1.38,1.38,0,0,1,.16-.67,1.08,1.08,0,0,1,.4-.42,1.25,1.25,0,0,1,.59-.14,1.06,1.06,0,0,1,.51.11,1.18,1.18,0,0,1,.4.29,1.2,1.2,0,0,1,.25.44,1.44,1.44,0,0,1,.09.51v.07a1.44,1.44,0,0,1-.09.51,1.36,1.36,0,0,1-.25.44A1.27,1.27,0,0,1,29,62,1.25,1.25,0,0,1,28.48,62.1Zm0-.33a.93.93,0,0,0,.51-.14,1,1,0,0,0,.33-.39,1.33,1.33,0,0,0,.11-.54,1.2,1.2,0,0,0-.12-.55.87.87,0,0,0-.33-.38.92.92,0,0,0-.5-.14,1,1,0,0,0-.48.12.88.88,0,0,0-.35.34,1,1,0,0,0-.12.5v.25a1,1,0,0,0,.12.48.93.93,0,0,0,.35.33A1,1,0,0,0,28.44,61.77Z"
                    />
                    <path
                      className="cls-1"
                      d="M32.59,62.1A1.34,1.34,0,0,1,32,62a1.13,1.13,0,0,1-.4-.31,1.26,1.26,0,0,1-.24-.44,1.69,1.69,0,0,1-.08-.5v-.07a1.62,1.62,0,0,1,.08-.49,1.26,1.26,0,0,1,.24-.44,1.1,1.1,0,0,1,.39-.31,1.4,1.4,0,0,1,.56-.11,1.22,1.22,0,0,1,.69.18,1.16,1.16,0,0,1,.41.47,1.4,1.4,0,0,1,.14.61v.19H31.46v-.29h2.08l-.09.15a1.13,1.13,0,0,0-.1-.51.79.79,0,0,0-.3-.35.91.91,0,0,0-.49-.13.8.8,0,0,0-.5.15.83.83,0,0,0-.31.38,1.51,1.51,0,0,0,0,1.08.92.92,0,0,0,.31.39,1,1,0,0,0,.53.14.89.89,0,0,0,.56-.16.6.6,0,0,0,.26-.36h.35a1.17,1.17,0,0,1-.21.45,1.06,1.06,0,0,1-.4.29A1.4,1.4,0,0,1,32.59,62.1Z"
                    />
                    <path
                      className="cls-1"
                      d="M35.1,59.68V59.4h1.77v.28ZM36.45,62A1.13,1.13,0,0,1,36,62a.62.62,0,0,1-.31-.27,1,1,0,0,1-.1-.51V58.57h.35v2.67a.5.5,0,0,0,.12.35.51.51,0,0,0,.36.12h.47V62Z"
                    />
                    <path
                      className="cls-1"
                      d="M39.27,62.08a1.07,1.07,0,0,1-.49-.1.75.75,0,0,1-.33-.28.85.85,0,0,1-.12-.46.72.72,0,0,1,.13-.44.66.66,0,0,1,.35-.28,1.32,1.32,0,0,1,.55-.1h.77v.28h-.79a.69.69,0,0,0-.48.15.51.51,0,0,0-.16.4.48.48,0,0,0,.17.39.68.68,0,0,0,.47.15,1,1,0,0,0,.35-.07.62.62,0,0,0,.28-.23.72.72,0,0,0,.12-.44l.11.15a1,1,0,0,1-.14.49.65.65,0,0,1-.32.29A1,1,0,0,1,39.27,62.08Zm.88-.07v-.78h-.06V60.3a.61.61,0,0,0-.15-.45.65.65,0,0,0-.47-.16h-.59l-.24,0V59.4l.22,0h.47a1.67,1.67,0,0,1,.65.1.69.69,0,0,1,.36.31,1.22,1.22,0,0,1,.11.55V62Z"
                    />
                  </g>
                </g>
              </svg>
            </Link>
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold text-zinc-900">
                {getTranslation("Welcome!", "Bienvenue!", "Hoş geldin")}
              </h1>
              <h3 className="text-xl font-bold text-zinc-800">
                {getTranslation(
                  "Check your mailbox and insert the verification code received!",
                  "Vérifiez votre boite Mail et Insérez Le code de Verification reçu!",
                  "Hoş geldin"
                )}
              </h3>
            </div>

            <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center justify-center gap-5">
                <input
                  type="text"
                  {...register("input1", {
                    required: true,
                    minLength: 1,
                    maxLength: 2,
                  })}
                  placeholder="_ _"
                  className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-slate-100 border border-black hover:border-slate-500 appearance-none rounded  focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <input
                  type="text"
                  placeholder="_ _"
                  {...register("input2", {
                    required: true,
                    minLength: 1,
                    maxLength: 2,
                  })}
                  className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-500 appearance-none rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                <input
                  type="text"
                  placeholder="_ _"
                  {...register("input3", {
                    required: true,
                    minLength: 1,
                    maxLength: 2,
                  })}
                  className="w-14 h-14 text-center text-2xl font-bold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-500 appearance-none rounded outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              {errors.input1 && errors.input2 && errors.input3 && (
                <span className="text-red-500">Champs est obligatoire</span>
              )}

              {errMsg && (
                <div className="bg-red-100 mt-4 text-red-700 text-sm p-2 rounded-md mb-4">
                  {errMsg}
                </div>
              )}
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-blue-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  disabled={isSubmitting}
                >
                  Verifier votre compte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default VerificationCode;
