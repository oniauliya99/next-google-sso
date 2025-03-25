"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        setUser(result.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, []);
  console.log(user, "user");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {user ? (
        <div className="bg-black p-6 rounded-lg shadow-lg text-center">
          <img
            src={user.picture}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text- text-red-50 font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              router.push("/login");
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-lg font-semibold">Loading user data...</p>
      )}
    </div>
  );
}
