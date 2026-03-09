import AppointmentForm from "@/components/forms/AppointmentForm";
import { Doctor } from "@/models/doctor.model";
import { PatientSchema } from "@/models/patient.model";
import { getAllActiveDoctors } from "@/services/doctor.service";
import { getPatientByUserId } from "@/services/patient.service";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const patient: PatientSchema = await getPatientByUserId(userId);

  return (
    <div className="remove-scrollbar flex h-screen max-h-screen;">
      <main className="container my-auto;">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Link href="/">
            <Image
              src="/icons/logo-full.svg"
              height={1000}
              width={1000}
              className="logo h-10 mb-12 w-fit"
              alt="logo"
            />
          </Link>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.Id as string}
          />

          <span className="text-[#636369] leading-8 text-sm">
            © CarePlus by{" "}
            <a
              href="https://yashfalke77.netlify.app/"
              className="text-sm font-semibold text-green-500 transition-all duration-75 ease-in-out hover:text-primary-200 hover:underline"
            >
              Yash Falke
            </a>
          </span>
        </div>
      </main>
      <Image
        src="/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default page;
