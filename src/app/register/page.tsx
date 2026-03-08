import RegisterUserForm from "@/components/forms/RegisterUserForm";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="remove-scrollbar flex h-screen max-h-screen;">
      <main className="container my-auto;">
        <div className="sub-container max-w-[496px]">
          <Link href="/">
            <Image
              src="/icons/logo-full.svg"
              height={1000}
              width={1000}
              className="logo h-10 mb-12 w-fit"
              alt="logo"
            />
          </Link>

          <RegisterUserForm />

          <div className="flex justify-between mt-4">
            <span className="text-[#636369] leading-8 text-sm">
              © CarePlus by{" "}
              <a
                href="https://yashfalke77.netlify.app/"
                className="text-sm font-semibold text-green-500 transition-all duration-75 ease-in-out hover:text-primary-200 hover:underline"
              >
                Yash Falke
              </a>
            </span>

            <span className="">
              <Link href="/login" className="text-[#636369] leading-8 text-sm">
                Login
              </Link>
            </span>
          </div>
        </div>
      </main>
      <Image
        src="/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
