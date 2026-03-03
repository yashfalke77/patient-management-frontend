"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import z from "zod";
import { FormFieldTypes } from "@/lib/enum";
import { userSchema } from "@/models/user.model";
import { register } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form"; // ← add this

export default function RegisterUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof userFormValidation>) {
    setIsLoading(true);
    try {
      const userData: userSchema = { email, password };
      const user = await register(userData);

      if (user) {
        console.log(user);
        localStorage.setItem("token", user.token);
        router.push(`/patients/${user.patientId}/register?userId=${user.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // ← use finally so it always resets
    }
  }

  return (
    <section>
      <Form {...form}> {/* ← wrap with Form */}
        <form
          id="patientForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi There 👋</h1>
            <p className="text-dark-700">Schedule Your First Appointment</p>
          </section>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="email"
            label="Email"
            placeHolder="yashop@gg.com"
            iconSrc="/icons/user.svg"
            iconAlt="email"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.PASSWORD}
            name="password"
            label="Password"
            placeHolder="op...."
            iconSrc="/icons/email.svg"
            iconAlt="password"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.PASSWORD}
            name="confirmPassword"
            label="Confirm Password"
            placeHolder="confirm-op...."
            iconSrc="/icons/email.svg"
            iconAlt="password"
          />

          <div className="mt-14">
            <SubmitButton isLoading={isLoading} id="patientForm">
              Get Started
            </SubmitButton>
          </div>
        </form>
      </Form> {/* ← close Form */}
    </section>
  );
}