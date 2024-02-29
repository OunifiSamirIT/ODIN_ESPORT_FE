import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login({ setAuthStatus }) {
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

      const response = await fetch("https://odine-sport.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("accessToken", result.accessToken);

        // Call the setAuthStatus function with the token
        setAuthStatus(true, result.accessToken);

        const verificationResponse = await fetch(
          `https://odine-sport.com/api/auth/check-verification/${result.id}`
        );
        const verificationResult = await verificationResponse.json();

        if (!verificationResult.isVerified) {
          setIsEmailVerified(false);
          setVerificationMessage(
            <div className="bg-blue-200 text-base p-2 justify-center mt-8 mb-1 animate-pulse rounded-md">
              Verifier Votre Compte pour seconnecter
            </div>
          );
        } else {
          setIsEmailVerified(true);
          navigate("/home");
        }
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
    <Fragment>
      {/* <div className="main-wrap">

        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url("assets/images/demo/banner-bg-1.jpg")`,
            }}
          ></div>
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="text-2xl font-semibold   mb-3">
                  Connecter a votre Compte
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-power-off text-grey-500 pe-0"></i>
                    <input
                      type="text"
                      {...register("login")}
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Votre Nom Utilisateur"
                    />
                  </div>

                  <div className="form-group icon-input mb-1">
                    <input
                      type="password"
                      {...register("password")}
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Mot de Passe"
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                  </div>
                  {loginError && (
            <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
              Compte n'est pas existe verifier vos infos
            </div>
          )}
                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck5"
                    />
                    <label className="form-check-label font-xsss text-grey-500">
                      Remember me
                    </label>
                    <Link
                      to="/forgot"
                      className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                    >
                      Mot de pass oublier ?
                    </Link>
                  </div>

                  {!isEmailVerified && verificationMessage}
                  {invalidPassword && (
            <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
              mot de passe invalide. 
            </div>
          )}
                  <div className="col-sm-12 p-0 text-left">
                    <div className="form-group mb-1">
                      <button
                        type="submit"
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                      >
                        Se connecter
                      </button>
                    </div>
                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                      vous n'ayez pas un compte.
                      <Link to="/register" className="fw-700 ms-1">
                      Creer Compte 
                      </Link>
                    </h6>
                  </div>

                  <div className="col-sm-12 p-0 text-center mt-2">
                    <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                      Ou, Register avec votre compte Google ou Facbook
                    </h6>
                    
                   <div className="col-sm-12 p-0 text-center mt-2">
 
  <div className="d-flex flex-column align-items-center">
    <button className="btn btn-primary mb-2" >
      <div className="d-flex align-items-center w-48">
        <img src="assets/images/icon-3.png" alt="Google Icon" className="social-icon w-10 h-10 mr-2" />
        Se connecter avec Facebook
      </div>
    </button>
    <button className="btn bg-black" >
      <div className="d-flex align-items-center">
        <img src="assets/images/icon-1.png" alt="Facebook Icon" className="social-icon w-10 h-10 mr-2" />
        <p className="text-white">Se connecter avec Google </p>
      </div>
    </button>
  </div>
</div>

                  </div>
                </form>
             
                </div>
              </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col justify-center bg-zinc-100">
        <div className="justify-center w-full rounded-2xl max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full hidden md:flex">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"          className="grow w-full aspect-[0.86] max-md:max-w-full"
        />
      </div>

            <div className="flex flex-col mb-40 ml-5 w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between px-12  w-full bg-zinc-100 max-md:px-5 max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1284a5dcef540714cf1bd78a1d61d4a149cfc66fd6e4422229107187f1c5f60?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="self-center mt-20 max-w-full aspect-[2.78] w-[132px] max-md:mt-10"
                />
                <div className="mt-10 text-5xl font-bold text-center text-zinc-900 max-md:max-w-full">
                  Bienvenue !
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="self-center mt-6 text-lg text-zinc-900 max-md:max-w-full">
                    Se connecter
                  </div>
                  <input
                    type="text"
                    {...register("login")}
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full"
                    placeholder="Votre Nom Utilisateur"
                  />
                  <div className="self-center mt-4 text-lg text-zinc-900 max-md:max-w-full">
                    Mot de Passe
                  </div>

                  <input
                    type="password"
                    {...register("password")}
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full"
                    placeholder="Mot de Passe"
                  />
                  {loginError && (
                    <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
                      Compte n'est pas existe verifier vos infos
                    </div>
                  )}

                  <div className="flex gap-4 justify-between mt-5 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex gap-2 justify-between">
                      <div className="flex flex-col justify-center aspect-[2]">
                        <div className="flex flex-col justify-center py-0.5 pr-6 pl-0.5 border-solid aspect-[2] bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[36.5px] max-md:pr-5">
                          <div className="shrink-0 h-4 bg-white rounded-xl shadow-sm" />
                        </div>
                      </div>
                      <div className="grow text-base whitespace-nowrap text-zinc-900">
                        Remember me
                      </div>
                    </div>
                    <Link
                      to="/forgot"
                      className="grow text-base font-medium text-blue-600 underline whitespace-nowrap"
                    >
                      Mot de pass oublier ?
                    </Link>
                  </div>
                  {!isEmailVerified && verificationMessage}
                  {invalidPassword && (
                    <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
                      mot de passe invalide.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="justify-center text-center items-center px-16 py-2 mt-8 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full"
                  >
                    Se connecter
                  </button>
                </form>

                <div className="flex gap-2 justify-between px-2 py-2 mt-2 text-base max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                  <div className="flex-auto text-zinc-900">
                    Vous n'avez pas compte ?
                  </div>
                  <Link
                    to="/register"
                    className="flex-auto font-medium text-blue-600 underline"
                  >
                    Creer Compte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
