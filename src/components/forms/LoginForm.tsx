"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { loginFormValidation, userFormValidation } from "@/lib/validation";
import z from "zod";
import { FormFieldTypes } from "@/lib/enum";
import { Form } from "../ui/form";
import { userSchema } from "@/models/user.model";
import { login } from "@/services/user.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormValidation>>({
    resolver: zodResolver(loginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({email, password}: z.infer<typeof loginFormValidation>) {
    setIsLoading(true);
    try {
        const userData: userSchema = { email, password };
        const data = await login(userData);
  
        if (data) {
          console.log(data.token);
          toast.success("Welcome Back Buddy!!");
          localStorage.setItem("token", data.token);
          router.push(`/`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // ← use finally so it always resets
      }
  }

  return (
    <section>
      <Form {...form}>
        <form
          id="patientForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Welcome Back!</h1>
            <p className="text-dark-700">Check your appointment history, book new appointment</p>
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
              Login
            </SubmitButton>
          </div>
        </form>
      </Form>  {/* ← close Form */}
    </section>
  );
}