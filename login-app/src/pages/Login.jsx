import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import ThemeToggle from "../components/ThemeToggle";

const Login = () => {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <ThemeToggle />
      <h2 style={{ marginBottom: "20px" }}>Login with Google</h2>
      <GoogleLoginButton />
    </div>
  );
};

export default Login;
