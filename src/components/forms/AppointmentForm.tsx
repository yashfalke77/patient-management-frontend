/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import z from "zod";
import { FormFieldTypes } from "@/lib/enum";
import { Form } from "../ui/form";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Appointment } from "@/models/appointment.model";
import { Doctor } from "@/models/doctor.model";
import { useRouter } from "next/navigation";
import {
  createNewAppointment,
  updateAppointment,
} from "@/services/appointment.service";
import { Status } from "@/types";
import { getAllActiveDoctors } from "@/services/doctor.service";

export default function AppointmentForm({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const router = useRouter();

  // Load token
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  // Fetch doctors
  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorArray: Doctor[] = await getAllActiveDoctors();
        setDoctors(doctorArray);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation) as any,
    defaultValues: {
      primaryPhysician: "",
      schedule: appointment
        ? new Date(appointment.schedule!)
        : new Date(),
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // Reset form when doctors + appointment load
  React.useEffect(() => {
    if (appointment && doctors.length > 0) {
      form.reset({
        primaryPhysician: appointment.doctorId,
        schedule: new Date(appointment.schedule!),
        reason: appointment.reason || "",
        note: appointment.note || "",
        cancellationReason: appointment.cancellationReason || "",
      });
    }
  }, [appointment, doctors, form]);

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointmentPayload: Appointment = {
          userId,
          patientId: patientId as string,
          doctorId: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note as string,
        };

        const newAppointment = await createNewAppointment(
          appointmentPayload,
          token,
        );

        if (newAppointment) {
          form.reset();
          router.push(
            `/appointment/new/${userId}/success?appointmentId=${newAppointment.id}`,
          );
        }
      } else {
        const appointmentToUpdate = {
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          status: status as Status,
          cancellationReason: values.cancellationReason,
        };

        const updatedAppointment = await updateAppointment(
          appointment?.id as string,
          appointmentToUpdate,
          token,
        );

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
          router.refresh();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <section>
      <Form {...form}>
        <form
          id="patientForm"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors);
          })}
          className="space-y-6 flex-1"
        >
          {type === "create" && (
            <section className="mb-12 space-y-4">
              <h1 className="header">New Appointment</h1>
              <p className="text-dark-700">
                Request a new appointment in 10 seconds.
              </p>
            </section>
          )}

          {type !== "cancel" && (
            <>
              <CustomFormField
                fieldType={FormFieldTypes.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Doctor"
                placeHolder="Select a doctor"
              >
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.imageUrl}
                        width={32}
                        height={32}
                        alt="doctor"
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>

              <CustomFormField
                fieldType={FormFieldTypes.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy  -  h:mm aa"
              />

              <div
                className={`flex flex-col gap-6 ${type === "create" && "xl:flex-row"}`}
              >
                <CustomFormField
                  fieldType={FormFieldTypes.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Appointment reason"
                  placeHolder="Annual monthly check-up"
                  disabled={type === "schedule"}
                />

                <CustomFormField
                  fieldType={FormFieldTypes.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Comments/notes"
                  placeHolder="Prefer afternoon appointments, if possible"
                  disabled={type === "schedule"}
                />
              </div>
            </>
          )}

          {type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldTypes.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for cancellation"
              placeHolder="Urgent meeting came up"
            />
          )}

          <SubmitButton
            isLoading={isLoading}
            className={`${
              type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
            } w-full`}
          >
            {buttonLabel}
          </SubmitButton>
        </form>
      </Form>
    </section>
  );
}