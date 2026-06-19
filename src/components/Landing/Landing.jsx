import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { FiFlag, FiMapPin, FiUsers } from "react-icons/fi";
import { MdRecordVoiceOver } from "react-icons/md";

import background from "@assets/images/background.jpg";
import logoWhite from "@assets/images/logo-white.svg";

import ToastBox from "@components/ToastBox/ToastBox";
import ReportFacilityModal from "@components/Facility/ReportFacilityModal";

import { useFetchNearestFacilities } from "@hooks/useFetchNearestFacility.hook";
import useGetLocation from "@hooks/useGetLocation.hook";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Statistics", href: "/statistics" },
];

const features = [
  {
    title: "Anonymous Report",
    description: "Help flag unsafe facilities anonymously",
    icon: <FiFlag className="text-lg" />,
  },
  {
    title: "Report Gender Based Violence",
    description: "Get help or report incidents in a safe and confidential way",
    icon: <MdRecordVoiceOver className="text-lg" />,
  },
  {
    title: "Community Powered",
    description: "Real people helping improve healthcare systems",
    icon: <FiUsers className="text-lg" />,
  },
];

const Landing = () => {
  const router = useRouter();
  const [showDialogue, setShowDialogue] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { data, isLoading } = useFetchNearestFacilities();
  const location = useGetLocation();

  const fetchFacility = () => {
    if (data !== undefined) {
      router.push("/search-results");
    } else {
      setShowDialogue(true);
    }
  };

  const ShowMyLocation = (e) => {
    e.preventDefault();
    if (location.loaded && !location.error) {
      fetchFacility();
    } else {
      setShowDialogue(true);
    }
  };

  return (
    <section className="relative min-h-screen w-screen overflow-hidden font-jarkata">
      {/* background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={background}
          alt="health worker attending to a patient"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-[#0B1C36]/75" />
      </div>

      {/* modals / toasts */}
      <ReportFacilityModal
        visible={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
      <ToastBox
        show={showDialogue}
        confirmCancel={() => setShowDialogue(false)}
        title="Network error"
        message="There has been an error, please refresh page and try again"
      />

      {/* content */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 lg:px-10">
        {/* nav */}
        <nav className="flex items-center justify-between py-6">
          <Link href="/">
            <a className="relative block h-10 w-[150px]">
              <Image
                src={logoWhite}
                alt="Reporta Health"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
              />
            </a>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-sm text-white transition-opacity hover:opacity-100 ${
                      isActive
                        ? "border-b-2 border-white pb-1 font-semibold opacity-100"
                        : "opacity-80"
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm text-white shadow-sm transition duration-300 hover:bg-primary/90"
          >
            <FiFlag className="text-base" />
            Report A Facility
          </button>
        </nav>

        {/* hero */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
            Find healthcare <br /> facilities close to you.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white md:text-lg">
            Locate trusted healthcare in seconds. With Reporta Health, you can
            find verified clinics and report fake facilities to protect your
            community
          </p>

          <button
            type="button"
            onClick={ShowMyLocation}
            disabled={isLoading}
            className="mt-10 flex items-center gap-2 rounded-md border border-white/20 bg-primary px-6 py-3.5 text-sm text-white shadow-md transition duration-300 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiMapPin className="text-base" />
            Find Healthcare Facilities Near You
          </button>
        </div>

        {/* feature card */}
        <div className="mx-auto mb-10 mt-8 w-full max-w-4xl rounded-xl border border-white/15 bg-white/5 px-6 py-6 backdrop-blur-sm md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C6DFFF] text-primary">
                  {feature.icon}
                </span>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs leading-snug text-white/60">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <footer className="pb-4">
          <p className="text-xs text-white/70">
            Copyright &copy; {new Date().getFullYear()}. Viable Knowledge Masters
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Landing;
