"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/signup");
    } else {
      setIsChecked(true);
    }
  }, []);
  if (!isChecked) return null;
  return <>{children}</>;
}

export default ProtectedRoute;
