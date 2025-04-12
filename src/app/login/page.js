"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";

// Replace these with your own Supabase project URL and anon key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function LoginPage() {
  const router = useRouter();

  // Form state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Toggle between "login" and "signup" modes
  const [authMode, setAuthMode] = useState("login");

  const handleAuth = async (e) => {
    e.preventDefault();

    if (authMode === "signup" && password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (authMode === "login") {
      // Log in the user using email and password
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(`Wrong email or password`);
      } else {
        toast.success("Logged in successfully!");
        // Redirect the user to a protected or dashboard page after login
        router.push("/dashboard");
      }
    } else {
      // Sign up the user using email and password
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast.error(`Sign up error: ${error.message}`);
      } else {
        toast.success(
          "Sign up successful! Please check your email to confirm your account."
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginLogoWrapper}>
        <img className={styles.loginLogo} src="/logo.png" alt="UpTalk Studio" />
      </div>
      <h3 className={styles.loginHeading}>
        {authMode === "login" ? "Welcome Back" : "Sign Up"}
      </h3>
      <p className={styles.loginSubheading}>
        Enter your credentials to access your account
      </p>
      {(authMode === "login" && (
        <form className="loginForm" onSubmit={handleAuth}>
          <div className={styles.inputGroupWrapper}>
            <label>Email:</label>
            <input
              placeholder="example@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.loginInput}
            />
          </div>
          <div className={styles.inputGroupWrapper}>
            <label>Password:</label>
            <div className={styles.inputGroup}>
              <input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.loginInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.loginButton}>
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      )) || (
        <form className="loginForm" onSubmit={handleAuth}>
          <div className={styles.inputGroupWrapper}>
            <label>Email:</label>
            <input
              placeholder="example@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.loginInput}
            />
          </div>
          <div className={styles.inputGroupWrapper}>
            <label>Password:</label>
            <div className={styles.inputGroup}>
              <input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.loginInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className={styles.inputGroupWrapper}>
            <label>Repeat Password:</label>
            <div className={styles.inputGroup}>
              <input
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                className={styles.loginInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.loginButton}>
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      )}
      <p>
        {authMode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setAuthMode(authMode === "login" ? "signup" : "login");
          }}
          className={styles.toggleButton}
        >
          {authMode === "login" ? "Create an account" : "Login"}
        </button>
      </p>
      <ToastContainer />
    </div>
  );
}
