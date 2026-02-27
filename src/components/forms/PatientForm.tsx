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

export default function PatientForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof userFormValidation>) {
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // })
  }

  return (
    <section>
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
          iconAlt="user"
        />

        <div className="mt-14">
          <SubmitButton isLoading={isLoading} id="patientForm">
            Get Started
          </SubmitButton>
        </div>
      </form>
    </section>
  );
}
