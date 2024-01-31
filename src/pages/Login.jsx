import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
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
        localStorage.setItem('accessToken', result.accessToken);

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
      <div className="main-wrap">
        {/* ... Header code ... */}

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

                  {/* Display verification message if email is not verified */}
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
                    {/* <div className="form-group mb-1">
                      <Link
                        to="/register"
                        className="form-control text-left m style2-input text-white fw-400 bg-facebook border-0 p-0 mb-2"
                      >
                        <img
                          src="assets/images/icon-1.png"
                          alt="icon"
                          className="ms-1 w-10 pt-2 mb-1 me-5"
                        />{" "}
                        Sign in with Google
                      </Link>
                    </div>
                    <div className="form-group mb-1">
                      <Link
                        to="/register"
                        className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                      >
                        <img
                          src="assets/images/icon-3.png"
                          alt="icon"
                          className="ms-2 w40 mb-1 me-5"
                        />{" "}
                        Sign in with Facebook
                      </Link>
                    </div> */}
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
      </div>
    </Fragment>
  );
}

export default Login;