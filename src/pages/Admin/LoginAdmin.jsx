import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Config }from  "../../config"
import { Context } from "../../index";
function Login({ setAuthStatus }) {
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(false); // New state variable for login error
  const [invalidPassword, setInvalidPassword] = useState(false); // New state variable for invalid password
  const location = useLocation();

  // Use state to track whether to reload the component
  const [shouldReload, setShouldReload] = useState(false);

  // Check if the component needs to be reloaded when the route changes
  useEffect(() => {
    // Set the reload state to true when the route changes
    setShouldReload(true);

    // You can perform any additional logic or data fetching needed on reload

    // Example: Force a re-fetch of user data or perform other actions
    // fetchData();
  }, [location.pathname]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${Config.LOCAL_URL}/api/auth/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier, // Use the value from the identifier field
          password: data.password,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("admin", JSON.stringify(result));
        localStorage.setItem("accessToken", result.accessToken);

        // Call the setAuthStatus function with the token
        navigate("/admin");
      } else {
        if (response.status === 401) {
          setInvalidPassword(true); // Set invalidPassword to true if the password is invalid
        } else {
          setErrMsg({ status: "failed", message: result.message });
          setLoginError(true); // Set loginError to true for other login errors
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrMsg({
        status: "failed",
        message: "An error occurred during login.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationClose = () => {
    setShowVerificationPopup(false);
  };

  return (
    <>
      <div className="flex flex-col justify-center bg-gray-200">
        <div className="justify-center w-full rounded-2xl max-md:max-w-full">
          <div className="flex  max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full  md:flex">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="grow w-full aspect-[1.0] max-md:max-w-full"
              />
            </div>

            <div className="flex flex-col mb-10 ml-5 w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col  justify-between px-12  w-full bg-gray-200 max-md:px-5">
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
                <div className="tal1 text-5xl font-bold  text-center text-zinc-900 ">
                  {getTranslation(
                    `Welcome ! `, // -----> Englais
                    ` Bienvenue !`, //  -----> Francais
                    `Hoş geldin`, //  -----> Turkey
                    `` //  -----> Allemagne
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="tal1 self-center mt-4  text-lg text-zinc-900 ">
                    {getTranslation(
                      `Username / Email`, // -----> Englais
                      `Nom d'utilisateur / Email `, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  </div>
                  <input
                    type="text"
                    {...register("identifier")}
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 w-full text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full"
                    placeholder={getTranslation(
                      `Your Username or Email`, // -----> Englais
                      `Votre Nom Utilisateur ou Email `, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  />
                  <div className="tal1 self-center mt-2 text-lg text-zinc-900">
                    {getTranslation(
                      `Password`, // -----> Englais
                      `Mot de Passe `, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  </div>

                  <input
                    type="password"
                    {...register("password")}
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 w-full text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full"
                    placeholder={getTranslation(
                      `Your Password`, // -----> Englais
                      `Votre Mot de Passe `, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  />

                  <Link
                    to="/forgot"
                    className="tal2 flex flex-1 w-full justify-end text-right self-end md:text-base text-sm font-medium py-2 text-blue-600 underline whitespace-nowrap"
                  >
                    <p>
                      {getTranslation(
                        `Forgot Password?`, // -----> Englais
                        `Mot de passe oublié ?`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}{" "}
                    </p>
                  </Link>

                  {loginError && (
                    <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
                      {getTranslation(
                        `Account does not exist! Please check your credentials!`, // -----> Englais
                        `Compte inexistant! Vérifier vos coordonnées! `, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 justify-between mt-1 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex w-full gap-2 justify-between">
                      <div className="flex flex-col justify-center aspect-[2]"></div>
                      <div className="tal2 grow text-base whitespace-nowrap text-zinc-900">
                        <button
                          type="submit"
                          className="justify-center flex w-full  text-center items-center px-10 py-2  md:text-base  text-sm font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full hover:bg-blue-900
                          duration-150 border-5 border-blue-0 border-spacing-3 focus:border-blue-400 focus:outline-none-500 "
                        >
                          {getTranslation(
                            `Log In`, // -----> Englais
                            `Se connecter `, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  {!isEmailVerified && verificationMessage}
                  {invalidPassword && (
                    <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
                      {getTranslation(
                        `Invalid Password ! `, // -----> Englais
                        `Mot de passe invalide ! `, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </div>
                  )}
                </form>

                <div className="flex gap-2 justify-between px-2 py-2 mt-2 text-base max-md:flex-wrap max-md:px-5 max-md:max-w-full flex-col">
                  <div className="flex-auto text-zinc-900  text-sm md:text-base text-center">
                    Vous n'avez pas compte ?
                  </div>
                  <Link
                    to="/register"
                    className="flex-auto font-medium text-blue-600 underline text-sm md:text-base text-center"
                  >
                    {getTranslation(
                      ` creat account`, // -----> Englais
                      `Créer un Compte `, //  -----> Francais
                      ``, //  -----> Turkey
                      `` //  -----> Allemagne
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
