import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasFetchedCurrentUser, setHasFetchedCurrentUser] = useState(false);

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const handleRegister = async (username, email, password) => {
    try {
      setError(null);
      const { data } = await apiClient.post("/auth/register", {
        username,
        email,
        password,
      });
      if (data === "user has been created") {
        setCurrentUser({ username, email });
        return true;
      } else {
        setError("An error occurred. Please try again.");
        return false;
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      return false;
    }
  };

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }

    try {
      setError(null);
      await apiClient.post("/auth/login", { email, password });

      const userData = await apiClient.get("/auth/me", {
        withCredentials: true,
      });
      if (userData.data) {
        setCurrentUser(userData.data);
        setIsAuthenticated(true);
        if (userData.data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    try {
      setError(null);
      await apiClient.post("/auth/logout");
      setCurrentUser(null);
      setIsAdmin(false);
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchCurrentUser = async () => {
      if (!fetched) {
        try {
          const { data } = await apiClient.get("/auth/me", {
            signal,
            withCredentials: true,
          });
          setCurrentUser(data);
          if (data) {
            setIsAuthenticated(true); // Imposta isAuthenticated a true se il recupero dei dati dell'utente ha successo
            if (data.role === "admin") {
              setIsAdmin(true);
            }
          }
          setFetched(true);
          setHasFetchedCurrentUser(true);
        } catch (error) {
          setError(
            error.response?.data?.message ||
              "An error occurred. Please try again."
          );
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();

    return () => {
      abortController.abort();
    };
  }, [hasFetchedCurrentUser, isAuthenticated]);

  const handleUpdateRole = async (userId, newRoleId) => {
    try {
      setError(null);
      const { data } = await apiClient.put("/user/update-role", {
        userId,
        newRoleId,
      });

      // Update the access_token with the new role
      const updatedAccessToken = data.access_token;
      setCurrentUser({ ...currentUser, token: updatedAccessToken });

      if (currentUser.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Include handleUpdateRole in the value object
  const value = {
    currentUser,
    loading,
    error,
    isAdmin,
    register: handleRegister,
    login: handleLogin,
    logout: handleLogout,
    updateRole: handleUpdateRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
