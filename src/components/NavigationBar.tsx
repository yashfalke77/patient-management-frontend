/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AvatarDropdown } from "./ui/AvatarDropdown";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "@/types";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (!token || token.split(".").length !== 3) return;
    
        try {
          const decoded = jwtDecode<TokenPayload>(token);
          setRole(decoded?.role || "");
        } catch {
          setRole("");
        }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Bye Bye Buddy!!");
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center h-24 z-50 sticky px-8 text-base font-medium">
      <section className="flex items-center">
        <Image
          src="/icons/logo-full.svg"
          height={1000}
          width={1000}
          className="logo h-10 w-fit"
          alt="logo"
        />
      </section>

      <section className="">
        <Link href="/" className="mx-6 transition-all hover:text-green-500">Home</Link>
        <Link href="/" className="mx-6 transition-all hover:text-green-500">Services</Link>
        <Link href="/" className="mx-6 transition-all hover:text-green-500">Testimonals</Link>
        <Link href="/" className="mx-6 transition-all hover:text-green-500">About</Link>
        {(role=="ADMIN") && (<Link href="/admin" className="mx-6 transition-all hover:text-green-500">Admin</Link>)}
        {!isLoggedIn && (<Link href="/register" className="mx-6 transition-all hover:text-green-500">Register</Link>)}
      </section>

      <section>
        {isLoggedIn ? (
          <AvatarDropdown onLogout={handleLogout} />
        ) : (
          <Link href="/login">
            <Button
              variant="link"
              className="rounded-[15px] px-5 shad-primary-btn hover:no-underline"
            >
              Login -&gt;
            </Button>
          </Link>
        )}
      </section>
    </nav>
  );
};

export default NavigationBar;