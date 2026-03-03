"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AvatarDropdown } from "./ui/AvatarDropdown";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
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