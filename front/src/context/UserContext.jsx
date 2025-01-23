import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("data", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      //alert("Autenticación exitosa :D!");
      return true;
    } else {
      alert(data?.error || "Logeo fallido :(!");
      return false;
    }
  };

  const getUser = async () => {
    if (token) {
      const response = await fetch("http://localhost:5001/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("getUser", data);
      setUser(data);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    alert("Adios vuelve pronto 👋🏻!");
  };

  const register = async (email, password, confirmPassword) => {
    setIsLoggedIn(false);
    const response = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);

      return true;
    } else {
      alert(data?.error || "Registo fallido!");
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        register,
        logOut,
        login,
        user,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
