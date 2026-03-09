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
import HeroSection from "@/components/HeroSection";

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

      <HeroSection />

      {/* About / Smile section */}
      <section className="flex flex-col md:flex-row justify-center items-center w-full px-5 sm:px-10 lg:px-[8rem] my-12 md:my-24 gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/smile1.png"
            width={1000}
            height={1000}
            alt="smile"
            className="w-full h-[50vh] md:h-[75vh] rounded-[40px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-dark-400 min-h-[50vh] md:h-[75vh] rounded-[40px] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heading text-center mb-4">
            Where Smile Blossoms Into Stories
          </h2>
          <p className="text-sm sm:text-base font-normal text-body text-center mb-8">
            Every patient holds a unique journey. We&apos;re here to manage,
            support, and simplify the care that matters most to their health and
            well-being.
          </p>
          <Button
            variant="link"
            className="rounded-[20px] text-lg sm:text-xl shad-primary-btn px-7 py-6 hover:no-underline"
          >
            Learn More
          </Button>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 sm:mt-12 w-full">
            <div className="bg-dark-300 p-5 sm:p-6 rounded-[20px] flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-heading mb-3">
                Confidentiality
              </h3>
              <p className="text-xs sm:text-sm font-normal text-body">
                Your Privacy is our Confidentiality. Discreet and Secure Space
                for your wellness journey
              </p>
            </div>
            <div className="bg-dark-300 p-5 sm:p-6 rounded-[20px] flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-heading mb-3">
                Accessibility
              </h3>
              <p className="text-xs sm:text-sm font-normal text-body">
                Designed for everyone with features that make self care, easy
                and inclusive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="mx-3 sm:mx-5 bg-dark-400 p-6 sm:p-10 md:p-20 my-4 rounded-[40px]">
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-heading text-center">
          Happy Clients
        </h1>
        <div className="px-4 sm:px-10 md:px-20 py-6 sm:py-10">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <div className="bg-dark-300 border-none rounded-[40px] h-auto sm:h-[22rem]">
                      <div className="p-4">
                        <Image
                          src="/images/quotation.png"
                          width={70}
                          height={70}
                          alt="quotation icon"
                          className="mb-4 w-12 sm:w-[70px]"
                        />
                        <div className="min-h-[8rem] sm:h-[12rem] text-sm sm:text-base font-normal text-body">
                          <p>&quot;{review.description}&quot;</p>
                        </div>
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight mb-4">
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
            className="rounded-[20px] text-lg sm:text-xl shad-primary-btn px-7 py-6 hover:no-underline"
          >
            View All Reviews
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 sm:p-10 md:p-20">
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-heading text-center">
          Book An Appointment Today
        </h1>
        <div className="w-full sm:w-3/4 md:w-1/2 flex justify-center items-center mx-auto">
          <p className="mb-6 text-base sm:text-lg lg:text-xl font-normal text-body text-center">
            Book an appointment with our handpicked doctors and experts whenever
            or wherever you want!
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="link"
            className="rounded-[20px] text-lg sm:text-xl shad-primary-btn px-7 py-6 hover:no-underline"
          >
            Book a Schedule -&gt;
          </Button>
        </div>

        <main className="px-4 sm:px-8 md:px-16 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-2 sm:p-4">
              <ul>
                <li className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
                  Contact
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    (+91) 1234567890
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Mumbai, Maharashtra India
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    yashfalke77@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-2 sm:p-4">
              <ul>
                <li className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
                  Navigate
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Services
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Success Stories
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Care
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-2 sm:p-4">
              <ul>
                <li className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
                  Solution
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Get in Touch
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Technology
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Who&apos;re We?
                  </Link>
                </li>
              </ul>
            </div>
            <div className="p-2 sm:p-4">
              <ul>
                <li className="text-xl sm:text-2xl font-semibold tracking-tight mb-4">
                  Follow Us
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    Instagram
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    GitHub
                  </Link>
                </li>
                <li className="py-2">
                  <Link
                    href="/"
                    className="text-dark-700 text-sm sm:text-base font-normal transition-all duration-75 ease-in-out hover:text-green-500"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-8">
            <span className="text-[#636369] leading-8 text-xs sm:text-sm">
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