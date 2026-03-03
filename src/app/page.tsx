import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/page.module.css";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import NavigationBar from "@/components/NavigationBar";

function page() {
  const reviews = [
    {
      description:
        "CarePlus made managing my appointments so easy. I no longer have to worry about missing a check-up!",
      author: "Sarah M.",
    },
    {
      description:
        "The platform is incredibly intuitive. My entire health history is now organized in one place.",
      author: "James R.",
    },
    {
      description:
        "Booking appointments has never been this seamless. CarePlus truly simplifies healthcare.",
      author: "Priya K.",
    },
    {
      description:
        "I love how I can track my records anytime, anywhere. A must-have for every patient.",
      author: "David L.",
    },
    {
      description:
        "The care and attention to detail in this platform is outstanding. Highly recommend CarePlus!",
      author: "Emily T.",
    },
    {
      description:
        "CarePlus has transformed how I manage my family's healthcare. It's simple, fast, and reliable.",
      author: "Michael B.",
    },
  ];

  return (
    <main>
      <NavigationBar />
      <section className="p-5">
        <div className={styles.heroImage}>
          <div className="w-1/2 ml-14">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
              Compassionate Care,
            </h1>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">
              Right at Your Fingertips
            </h1>
            <p className="mb-6 text-lg font-normal text-body lg:text-xl">
              From booking appointments to tracking your health records,
              CarePlus makes managing your care simple, seamless, and
              effortless.
            </p>
            <Button
              variant="link"
              className="rounded-[20px] px-5 text-xl shad-primary-btn px-7 py-6 hover:no-underline"
            >
              Book Appointment
            </Button>
          </div>
          <div></div>
        </div>
      </section>

      <section className="flex justify-center items-center w-full px-[8rem] my-24 ">
        <div className="w-1/2">
          <Image
            src="/images/smile1.png"
            width={1000}
            height={1000}
            alt="smile"
            className="w-full h-[75vh] rounded-[40px]"
          />
        </div>
        <div className="flex flex-col justify-center items-center ml-10 w-1/2 bg-dark-400 h-[75vh] rounded-[40px] p-8">
          <h2 className="text-4xl font-bold tracking-tight text-heading md:text-5xl text-center mb-4">
            Where Smile Blossoms Into Stories
          </h2>
          <p className="text-base font-normal text-body lg:text-base text-center mb-10">
            Every patient holds a unique journey. We&apos;re here to manage,
            support, and simplify the care that matters most to their health and
            well-being.
          </p>
          <Button
            variant="link"
            className="rounded-[20px] text-xl shad-primary-btn px-7 py-6 hover:no-underline"
          >
            Learn More
          </Button>
          <div className="flex justify-between mt-12">
            <div className="bg-dark-300 mr-4 p-6 rounded-[20px]">
              <h3 className="text-2xl font-bold tracking-tight text-heading md:text-3xl mb-4">
                Confidentiality
              </h3>
              <p className="text-sm font-normal text-body lg:text-sm">
                Your Privacy is our Confidentiality. Discret and Secure Space
                for your wellness journey
              </p>
            </div>
            <div className="bg-dark-300 p-6 rounded-[20px]">
              <h3 className="text-2xl font-bold tracking-tight text-heading md:text-3xl mb-4">
                Accesibility
              </h3>
              <p className="text-sm font-normal text-body lg:text-sm">
                Designed for everyone with features that make self care, easy
                and inclusive
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-5 bg-dark-400 p-20 my-4 rounded-[40px]">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl text-center">
          Happy Clients
        </h1>
        <div className="px-20 py-10">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="bg-dark-300 border-none rounded-[40px] h-[22rem]">
                      <div className="p-4">
                        <Image
                          src="/images/quotation.png"
                          width={70}
                          height={70}
                          alt="quotation icon"
                          className="mb-4"
                        />
                        <div className="h-[12rem] text-base font-normal text-body lg:text-base">
                          <p>&quot;{review.description}&quot;</p>
                        </div>
                        <p className="text-xl font-semibold tracking-tight md:text-2xl mb-4">
                          - {review.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="link"
            className="rounded-[20px] text-xl shad-primary-btn px-7 py-6 hover:no-underline"
          >
            View All Reviews
          </Button>
        </div>
      </section>

      <footer className="p-20">
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-heading md:text-3xl lg:text-4xl text-center">
          Book An Appointment Today
        </h1>
        <div className="w-1/2 flex justify-center items-center mx-auto">
          <p className="mb-6 text-lg font-normal text-body lg:text-xl text-center">
            Book an appointment with our handpicked doctors and experts whenever
            or wherever you want!{" "}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="link"
            className="rounded-[20px] text-xl shad-primary-btn px-7 py-6 hover:no-underline"
          >
            Book a Schedule -&gt;
          </Button>
        </div>

        <main className="px-16 py-8">
          <div className="flex justify-between flex-wrap">
            <div className="p-4">
              <ul>
                <li className="text-2xl font-semibold tracking-tight mb-4">
                  Contact
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    (+91) 1234567890
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/palettes"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Mumbai, Maharashtra India
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    yashfalke77@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4">
              <ul>
                <li className="text-2xl font-semibold tracking-tight mb-4">
                  Navigate
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Services
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Success Stories
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Care
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4">
              <ul>
                <li className="text-2xl font-semibold tracking-tight mb-4">
                  Solution
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Get in Touch
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Technology
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Who&apos;re We?
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-4">
              <ul>
                <li className="text-2xl font-semibold tracking-tight mb-4">
                  Foolow Us
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Linkedin
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Instagram
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Guthib
                  </Link>
                </li>
                <li className="py-[0.5rem]">
                  <Link
                    href="/"
                    className="text-dark-700 text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="justify-between items-center py-8">
            <span className="text-[#636369] leading-8 text-sm">
              © CarePlus by{" "}
              <a
                href="https://yashfalke77.netlify.app/"
                className="text-sm font-semibold text-green-500 transition-all duration-75 ease-in-out hover:text-primary-200 hover:underline"
              >
                Yash Falke
              </a>
              . From a creative to all others
            </span>
          </div>
        </main>
      </footer>
    </main>
  );
}

export default page;
