/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";

import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "@radix-ui/react-label";

import { PatientFormValidation } from "@/lib/validation";
import { FormFieldTypes } from "@/lib/enum";
import { PatientSchema } from "@/models/patient.model";
import { updatePatientById } from "@/services/patient.service";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";

export default function RegisterPatientForm({
  patient,
}: {
  patient: PatientSchema;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    // Always read localStorage inside useEffect (client-side only)
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation) as any,
    defaultValues: {
      ...PatientFormDefaultValues,
      email: patient.email as string,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
        console.log(token);


    // If no token, redirect to login/register
    if (!token) {
      router.push("/login"); // or "/login" wherever your register page is
      return;
    }

    try {
      const patientData = {
        ...values,
        userId,
        registeredDate: new Date(),
      };
      console.log(patientData);
      const updatedPatient = await updatePatientById(
        patient.Id as string,
        patientData,
        token,
      );

      if (updatedPatient) {
        console.log(updatedPatient);
        router.push(`/`);
      }

      
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Form {...form}>
        <form
          id="patientForm"
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("❌ Validation errors:", errors); // add this
          })}
          className="space-y-12 flex-1"
        >
          {/* Header */}
          <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
          </section>

          {/* Personal Info */}
          <section className="space-y-4">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Personal Information</h2>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="firstName"
                label="First Name"
                placeHolder="Yash"
                iconSrc="/icons/user.svg"
                iconAlt="user"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="lastName"
                label="Last Name"
                placeHolder="OP"
                iconSrc="/icons/user.svg"
                iconAlt="user"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="email"
                label="Email"
                placeHolder="yashOp@gg.com"
                iconSrc="/icons/email.svg"
                iconAlt="email"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.PHONE_INPUT}
                name="phoneNumber"
                label="Phone Number"
                placeHolder="(+91) 123-4567"
              />
            </div>

            {/* Birth Date + Gender */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.DATE_PICKER}
                name="dateOfBirth"
                label="Date of Birth"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.SKELETON}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div
                        key={option}
                        className="radio-group flex items-center gap-2"
                      >
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="address"
                label="Address"
                placeHolder="14 Street Ghatkopar"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="occupation"
                label="Occupation"
                placeHolder="Software Engineer"
              />
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.INPUT}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeHolder="Guardians Name"
              />

              <CustomFormField
                control={form.control}
                fieldType={FormFieldTypes.PHONE_INPUT}
                name="emergencyContactNumber"
                label="Emergency Contact Number"
                placeHolder="(+91) 123-4567"
              />
            </div>
          </section>

          <section className="space-y-4">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Medical Information</h2>
            </div>

            {/* PRIMARY CARE PHYSICIAN */}
            <CustomFormField
              fieldType={FormFieldTypes.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Primary Doctor"
              placeHolder="Select a physician"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
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

            {/* INSURANCE & POLICY NUMBER */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Insurance provider"
                placeHolder="BlueCross BlueShield"
              />

              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Insurance policy number"
                placeHolder="ABC123456789"
              />
            </div>

            {/* ALLERGY & CURRENT MEDICATIONS */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="allergies"
                label="Allergies (if any)"
                placeHolder="Peanuts, Penicillin, Pollen"
              />

              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label="Current medications"
                placeHolder="Ibuprofen 200mg, Levothyroxine 50mcg"
              />
            </div>

            {/* FAMILY MEDICATION & PAST MEDICATIONS */}
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label=" Family medical history (if relevant)"
                placeHolder="Mother had brain cancer, Father has hypertension"
              />

              <CustomFormField
                fieldType={FormFieldTypes.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Past medical history"
                placeHolder="Appendectomy in 2015, Asthma diagnosis in childhood"
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Identification and Verfication</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldTypes.SELECT}
              control={form.control}
              name="identificationType"
              label="Identification Type"
              placeHolder="Select identification type"
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="identificationNumber"
                label="Identification Number"
                placeHolder="123456789"
              />

              <CustomFormField
                fieldType={FormFieldTypes.INPUT}
                control={form.control}
                name="identificationDocumentUrl"
                label="Identification Document Url"
                placeHolder="https://drive.google.com/file/d/0B1HXn"
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Consent and Privacy</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldTypes.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="I consent to receive treatment for my health condition."
            />

            <CustomFormField
              fieldType={FormFieldTypes.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I consent to the use and disclosure of my health
            information for treatment purposes."
            />

            <CustomFormField
              fieldType={FormFieldTypes.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I acknowledge that I have reviewed and agree to the
            privacy policy"
            />
          </section>

          {/* Submit */}
          <div className="mt-14">
            <SubmitButton isLoading={isLoading} id="patientForm">
              Get Started
            </SubmitButton>
          </div>
        </form>
      </Form>
    </section>
  );
}
