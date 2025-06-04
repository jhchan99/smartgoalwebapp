import React, { useState } from "react";
import { auth, googleProvider } from "../../auth/firebase"; // adjust path as needed
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or show success
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    if (isSigningIn) return;
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect or show success
    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request") {
        setError(err.message);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSigningIn}
      >
        Sign in with Google
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
