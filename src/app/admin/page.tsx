import { columns } from "@/components/columns";
import { DataTable } from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { Appointment } from "@/models/appointment.model";
import { Doctor } from "@/models/doctor.model";
import { getRecentAppointments } from "@/services/appointment.service";
import { getDoctorById } from "@/services/doctor.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const recentAppointment = await getRecentAppointments();

  const doctorIds = [
    ...new Set(
      recentAppointment.documents.map(
        (a: Appointment) => a.doctorId as string
      )
    ),
  ];

  const doctors = await Promise.all(
    doctorIds.map((id) => getDoctorById(id as string))
  );

  const doctorMap: Record<string, Doctor> = Object.fromEntries(
    doctors.map((d: Doctor) => [d.id, d])
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={recentAppointment.scheduledCount}
            label="Scheduled appointments"
            icon={"/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={recentAppointment.pendingCount}
            label="Pending appointments"
            icon={"/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={recentAppointment.cancelledCount}
            label="Cancelled appointments"
            icon={"/icons/cancelled.svg"}
          />
        </section>

        <DataTable
          columns={columns}
          data={recentAppointment.documents}
          doctorMap={doctorMap}
        />
      </main>
    </div>
  );
};

export default page;