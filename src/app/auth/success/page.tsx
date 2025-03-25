"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <p className="text-center text-xl mt-10">Logging in...</p>;
}
