/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { getAppointmentById } from "@/services/appointment.service";
import { getDoctorById } from "@/services/doctor.service";
import { SearchParamProps } from "@/types";

const RequestSuccess = async ({
  searchParams,
  params,
}: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const { userId } = await params;
  const appointmentId = (resolvedSearchParams?.appointmentId as string) || "";
  const appointment = await getAppointmentById(appointmentId);
  const doctor = await getDoctorById(appointment.doctorId);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.imageUrl!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/appointment/new/${userId}`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;