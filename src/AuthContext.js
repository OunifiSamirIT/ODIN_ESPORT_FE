// import React, { useState, useEffect, useContext, createContext } from "react";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import CryptoJS from "crypto-js";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children, navigate }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [csrfToken, setCsrfToken] = useState(null);
//   const [refreshToken, setRefreshToken] = useState(null);

//   useEffect(() => {
//     const user = Cookies.get("user");
//     const refreshToken = Cookies.get("refreshToken");

//     console.log("user from Cookies:", user);
//     console.log("RefreshToken from Cookies:", refreshToken);

//     if (user) {
//       try {
//         const decoded = jwtDecode(user);
//         setUserInfo(decoded);
//         console.log("Decoded access token:", decoded);
//       } catch (error) {
//         console.error("Failed to decode access token:", error);
//       }
//     }

//     if (refreshToken) {
//       setRefreshToken(refreshToken);
//       console.log("Refresh token:", refreshToken);
//     }
//   }, []);

//   useEffect(() => {
//     const csrfToken = generateCsrfToken();
//     setCsrfToken(csrfToken);
//   }, []);

//   const handleLogin = (userData) => {
//     if (!userData || !userData.id || !userData.email) {
//       throw new Error("Invalid user data");
//     }

//     Cookies.set("user", userData.user, { secure: true });
//     Cookies.set("refreshToken", userData.refreshToken, { secure: true });

//     setUserInfo(userData);
//     navigate("/home");
//   };

//   const handleLogout = () => {
//     Cookies.remove("user");
//     Cookies.remove("refreshToken");
//     setUserInfo(null);
//     setRefreshToken(null);
//     navigate("/login");
//   };

//   const verifyCsrfToken = (token) => csrfToken === token;

//   return (
//     <AuthContext.Provider
//       value={{
//         userInfo,
//         refreshToken,
//         handleLogin,
//         handleLogout,
//         verifyCsrfToken,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// function generateCsrfToken() {
//   const randomBytes = CryptoJS.lib.WordArray.random(16);
//   return randomBytes.toString(CryptoJS.enc.Hex);
// }
