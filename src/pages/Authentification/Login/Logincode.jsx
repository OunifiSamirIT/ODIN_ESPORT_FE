import React, { Fragment, useEffect, useState, useRef } from "react";
import { Config } from "../../../config";
import { useNavigate } from "react-router";
import Header from "../../../components/Header3";
import { Context } from "../../../index";
import secureLocalStorage from "react-secure-storage";
const VerificationCode = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
  useEffect(() => {
    const storedUserId = secureLocalStorage.getItem("idusercode");
    const storedEmail = secureLocalStorage.getItem("useremail");
    setUserId(storedUserId);
    setEmail(storedEmail || "");
  }, []);

  const handleChange = (value, index) => {
    if (/^\d$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value.slice(-1);
      setCode(newCode);

      if (value !== "" && index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      if (index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        handleSubmit();
      }
    } else if (e.key === "Backspace") {
      if (code[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          const newCode = [...code];
          newCode[index - 1] = "";
          setCode(newCode);
        }
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\s+/g, "");
    if (/^\d{6}$/.test(paste)) {
      const newCode = paste.split("");
      setCode(newCode);
      inputRefs.current.forEach((input, index) => {
        input.value = newCode[index];
      });
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async () => {
    const enteredCode = code.join("");
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verificationToken: enteredCode,
          }),
        }
      );

      if (response.ok) {
        setError(false);
        navigate("/login");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError(true);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/auth/resend-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (response.ok) {
        console.log("Verification email resent successfully!");
      } else {
        console.error("Failed to resend verification email.");
      }
    } catch (error) {
      console.error(
        "Error occurred while resending verification email:",
        error
      );
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen flex flex-col bg-gray-100 overflow-y-scroll">
        <Header />
        <div className="flex justify-center items-center flex-grow">
          <div className="bg-white md:p-8 p-4 rounded-lg shadow-md md:w-[530px] w-[400px] mt-24 md:mt-0 ">
            <div className="text-center mb-6">
              <h1 className="flex justify-center animate-pulse">
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 80 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="40" cy="40.5" r="40" fill="#2E71EB" />
                  <path
                    d="M50.6346 24.067L40.1931 20.5854C39.8512 20.4715 39.4816 20.4715 39.1398 20.5854L28.6982 24.067C27.0381 24.6185 25.594 25.6791 24.5711 27.0982C23.5481 28.5172 22.9984 30.2226 23 31.9719V40.5001C23 53.1049 38.3331 60.0665 38.9898 60.3565C39.2028 60.4511 39.4333 60.5 39.6664 60.5C39.8995 60.5 40.13 60.4511 40.3431 60.3565C40.9997 60.0665 56.3328 53.1049 56.3328 40.5001V31.9719C56.3344 30.2226 55.7847 28.5172 54.7618 27.0982C53.7388 25.6791 52.2947 24.6185 50.6346 24.067ZM47.5296 36.6952L40.4097 43.815C40.1184 44.1084 39.7717 44.3409 39.3897 44.4991C39.0078 44.6573 38.5982 44.7381 38.1848 44.7367H38.1298C37.7079 44.7302 37.2918 44.6383 36.9065 44.4664C36.5212 44.2945 36.1748 44.0463 35.8881 43.7367L32.0449 39.7368C31.8784 39.5823 31.7453 39.3955 31.6536 39.1878C31.562 38.9801 31.5137 38.7558 31.5118 38.5288C31.51 38.3017 31.5545 38.0767 31.6427 37.8675C31.7309 37.6583 31.8609 37.4693 32.0248 37.3121C32.1887 37.155 32.3829 37.033 32.5956 36.9536C32.8084 36.8742 33.0351 36.8391 33.2618 36.8504C33.4886 36.8618 33.7106 36.9194 33.9144 37.0196C34.1181 37.1199 34.2992 37.2607 34.4465 37.4335L38.1864 41.3334L45.1663 34.3335C45.4807 34.0299 45.9017 33.8619 46.3386 33.8657C46.7756 33.8695 47.1936 34.0448 47.5027 34.3538C47.8117 34.6628 47.9869 35.0808 47.9907 35.5178C47.9945 35.9548 47.8266 36.3758 47.523 36.6902L47.5296 36.6952Z"
                    fill="white"
                  />
                </svg>
              </h1>
              <h2 className="text-2xl font-bold mt-2">
                {getTranslation(
                  ` Verify your account`,
                  ` Vérifier votre compte`
                )}
              </h2>
              <p className="text-gray-600">
                {getTranslation(
                  ` Enter the passcode you just received on your email address :`,
                  ` Veuillez entrer le code que vous venez de recevoir à votre adresse e-mail :`
                )}
              </p>
              <p className="text-black-600 font-bold text-break">{email}</p>
            </div>
            <div className="flex justify-center mb-4 space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`w-12 h-12 text-center text-lg border-2 rounded-md ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-center mb-4">
                {getTranslation(
                  ` Verification code invalid! Please verify the passcode.`,
                  `  Code de vérification invalide ! Veuillez vérifier le code.`
                )}
              </p>
            )}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
            >
              {getTranslation(` Verify`, `Vérifier`)}
            </button>
            <div className="text-center mt-4 flex space-x-3 items-center justify-center ">
              <span className="text-gray-600">
                {getTranslation(
                  `Didn't receive the code?`,
                  `Je n'ai pas reçu le code? `
                )}
              </span>
              <button
                onClick={handleResend}
                className="text-blue-500 hover:underline border border-blue-500 rounded-full px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
              >
                {getTranslation(` Resend`, `Renvoyer`)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerificationCode;
