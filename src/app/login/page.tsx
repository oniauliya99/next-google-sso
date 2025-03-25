"use client";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {user ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-full w-20 h-20 mt-4"
          />
          <p className="mt-2">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Login with Google
        </button>
      )}
    </div>
  );
}
