import React, { createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const checkTokenExpiration = async () => {
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;
    if (tokenn) {
      try {
        const response = await fetch("http://localhost:5000/api/verify", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        });

        const data = await response.json();
        console.log(data, "alooo doneee veriffff");
        console.log(response.status, "aloo statuss");

        if (data.message === "Unauthorized!") {
          // Afficher une alerte avec SweetAlert pour token non autorisé
          Swal.fire({
            icon: "warning",
            title: "Session expirée",
            text: "Votre session a expiré. Veuillez vous reconnecter.",
            confirmButtonColor: "#2E71EB",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/Login";
              localStorage.removeItem("Secret");
              secureLocalStorage.removeItem("cryptedUser");
            }
            // Rediriger vers la page de connexion après avoir cliqué sur "OK"
          });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        // Supprimer les données du localStorage en cas d'erreur

        // Afficher une alerte en cas d'erreur et rediriger
      }
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, checkTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  );
};
