import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/pages/_auth.scss";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";

const Auth = () => {
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [redirectToUser, setRedirectToUser] = useState(false);
  const { currentUser, register, login, error } = useAuth();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    setIsSignInActive(false);
  };

  const handleSignInClick = () => {
    setIsSignInActive(true);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const isRegistered = await register(username, email, password);
    if (isRegistered) {
      setJustRegistered(true);
      setRegistrationSuccess(true);
      setIsSignInActive(true);
    }
  };

  useEffect(() => {
    if (currentUser && !justRegistered) {
      if (currentUser.role === "admin") {
        setRedirectToAdmin(true);
      } else {
        setRedirectToUser(true);
      }
    }
  }, [currentUser, justRegistered]);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setJustRegistered(false);
  };

  if (redirectToAdmin) {
    return <Navigate to="/admin" />;
  }

  if (redirectToUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth">
      {registrationSuccess && (
        <Alert
          message="Registration successful! Please sign in with your new account."
          type="success"
        />
      )}

      {error && <Alert message={error} type="error" />}

      <div
        className={`container ${isSignInActive ? "" : "right-panel-active"}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h2>Sign in</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Bienvenue !</h2>
              <p>
                Pour rester connecté avec nous, veuillez vous connecter avec vos
                informations personnelles
              </p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>
                Entrez vos informations personnelles et commencez votre aventure
                avec nous
              </p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
