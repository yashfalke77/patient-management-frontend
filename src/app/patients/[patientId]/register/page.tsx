import RegisterPatientForm from "@/components/forms/RegisterPatientForm";
import Image from "next/image";
import React from "react";
import { getPatientById } from "@/services/patient.service";
import { PatientSchema } from "@/models/patient.model";
import Link from "next/link";
import { SearchParamProps } from "@/types";

const page = async ({ params }: SearchParamProps) => {
  const { patientId } = await params;
  const patient: PatientSchema = await getPatientById(patientId);

  console.log(patient);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link href="/">
            <Image
              src="/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="careplus"
              className="mb-12 h-10 w-fit"
            />
          </Link>

          <RegisterPatientForm patient={patient} />

          <div className="flex justify-between mt-4">
            <span className="text-[#636369] leading-8 text-sm py-12">
              © CarePlus by{" "}
              <a
                href="https://yashfalke77.netlify.app/"
                className="text-sm font-semibold text-green-500 transition-all duration-75 ease-in-out hover:text-primary-200 hover:underline"
              >
                Yash Falke
              </a>
            </span>
          </div>
        </div>
      </section>
      <Image
        src="/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default page;
