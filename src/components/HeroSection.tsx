/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "@/styles/page.module.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { TokenPayload } from "@/types";

const HeroSection = () => {
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token.split(".").length !== 3) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setId(decoded?.sub || "");
    } catch {
      setId("");
    }
  }, []);

  const router = useRouter();

  const handleAppointment = () => {
    if (id) {
      router.push(`/appointment/new/${id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="p-4 sm:p-5">
      <div className={styles.heroImage}>
        <div className="w-full px-6 sm:px-10 sm:w-3/4 md:w-2/3 lg:w-1/2 lg:ml-14">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl lg:text-6xl">
            Compassionate Care,
          </h1>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl lg:text-6xl">
            Right at Your Fingertips
          </h1>

          <p className="mb-6 text-base font-normal text-body sm:text-lg lg:text-xl">
            From booking appointments to tracking your health records, CarePlus
            makes managing your care simple, seamless, and effortless.
          </p>

          <Button
            variant="link"
            className="rounded-[20px] text-lg sm:text-xl shad-primary-btn px-6 py-5 sm:px-7 sm:py-6 hover:no-underline"
            onClick={handleAppointment}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;