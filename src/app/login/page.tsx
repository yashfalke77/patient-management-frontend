import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className='remove-scrollbar flex h-screen max-h-screen;'>
      <main className='container my-auto;'>
        <div className='sub-container max-w-[496px]'>
          <Image
            src="/icons/logo-full.svg"
          height={1000}
          width={1000}
          className='logo h-10 mb-12 w-fit'
          alt="logo"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">c 2024 careplus</p>
            <Link href="/admin" className="text-green-500">admin</Link>
          </div>

        </div>
      </main>
      <Image 
      src="/images/onboarding-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]"/>

    </div>
  );
}
