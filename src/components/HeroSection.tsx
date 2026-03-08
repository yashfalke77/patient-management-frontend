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
    <section className="p-5">
      <div className={styles.heroImage}>
        <div className="w-1/2 ml-14">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
            Compassionate Care,
          </h1>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
            Right at Your Fingertips
          </h1>

          <p className="mb-6 text-lg font-normal text-body lg:text-xl">
            From booking appointments to tracking your health records, CarePlus
            makes managing your care simple, seamless, and effortless.
          </p>

          <Button
            variant="link"
            className="rounded-[20px] text-xl shad-primary-btn px-7 py-6 hover:no-underline"
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
