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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    toast.success("Bye Bye Buddy!!");
    router.push("/");
    window.location.reload();
  };

  const navLinks = (
    <>
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="transition-all hover:text-green-500"
      >
        Home
      </Link>
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="transition-all hover:text-green-500"
      >
        Services
      </Link>
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="transition-all hover:text-green-500"
      >
        Testimonials
      </Link>
      <Link
        href="/"
        onClick={() => setMenuOpen(false)}
        className="transition-all hover:text-green-500"
      >
        About
      </Link>
      {role === "ADMIN" && (
        <Link
          href="/admin"
          onClick={() => setMenuOpen(false)}
          className="transition-all hover:text-green-500"
        >
          Admin
        </Link>
      )}
      {!isLoggedIn && (
        <Link
          href="/register"
          onClick={() => setMenuOpen(false)}
          className="transition-all hover:text-green-500"
        >
          Register
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky bg-dark-300 top-0 z-50 px-6 md:px-8">
      {/* Main bar */}
      <div className="flex justify-between items-center h-20 text-base font-medium">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            className="logo h-10 w-fit"
            alt="logo"
          />
        </Link>

        {/* Desktop nav links */}
        <section className="hidden md:flex items-center gap-2 lg:gap-0">
          <div className="flex items-center">
            {React.Children.map(navLinks.props.children, (child, i) =>
              child ? (
                <span key={i} className="mx-4 lg:mx-6">
                  {child}
                </span>
              ) : null
            )}
          </div>
        </section>

        {/* Desktop CTA */}
        <section className="hidden md:flex items-center">
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

        {/* Mobile: avatar + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {isLoggedIn && <AvatarDropdown onLogout={handleLogout} />}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? (
              // X icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200/20 py-4 flex flex-col gap-4 text-base font-medium animate-in slide-in-from-top-2 duration-200">
          {navLinks}
          {!isLoggedIn && (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button
                variant="link"
                className="w-full rounded-[15px] px-5 shad-primary-btn hover:no-underline justify-start pl-0"
              >
                Login -&gt;
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
