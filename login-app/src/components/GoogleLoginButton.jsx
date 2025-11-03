import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) return alert("No credential returned");

    try {
      console.log("Google token:", token);

      // Set authentication state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', token);

      alert("Login successful!");
      navigate("/home"); // Redirect to home page
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => alert("Google login failed")}
    />
  );
};

export default GoogleLoginButton;
