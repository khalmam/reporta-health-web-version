import React, { useEffect, useState } from "react";
import Layout from "@components/Layout/Layout";
import Image from "next/image";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import avatar from "@assets/images/health-worker.svg";
import Input from "@components/Input/Input";
import { useUserCredentialsStore } from "@store/authStore.store";

export default function Profile() {
  const router = useRouter();

  // the auth store is persisted and only settles on the client, so the check
  // runs in an effect — rendering nothing until then keeps the first client
  // render identical to the exported markup
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authed = useUserCredentialsStore.getState().isAuthenticated;

    setIsAuthenticated(authed);
    setAuthChecked(true);

    if (!authed) {
      router.replace("/login?redirect=/profile");
    }
  }, [router]);

  const firstName = useUserCredentialsStore()?.userDetails?.user?.firstName
  const lastName = useUserCredentialsStore()?.userDetails?.user?.LastName
  const email = useUserCredentialsStore()?.userDetails?.user?.username
  const phone = useUserCredentialsStore()?.userDetails?.user?.phone
  const address = useUserCredentialsStore()?.userDetails?.user?.address

  if (!authChecked || !isAuthenticated) return null;

  return (
    <div className="w-full relative overflow-hidden select-none  z-2">
      <Layout
        pageMeta={{
          title: "Reporta Health - Search and report a facility",
          description: "give any description here",
        }}
      >
        <section className="w-[95vw] mx-auto px-5 lg:px-10 pt-[8%] pb-[6rem]">
          <section className="lg:w-[80%] mx-auto">
            <h1 className="mt-[2rem] my-6 mb-12 lg:text-[3.5vw] md:text-[5vw] text-[8vw] font-bold capitalize">
              User Profile
            </h1>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-10 justify-items-stretch items-start">
              <label
                htmlFor="profile image"
                className="text-md lg:text-lg text-primary lg:text-right font-bold capitalize"
              >
                Profile Image
              </label>
              <div className="col-span-2 flex items-start">
                <div className=" flex lg:flex-col items-end lg:items-center justify-center">
                  <div className="rounded-full flex mr-6 items-center justify-center w-[4rem] h-[4rem] lg:w-[7rem] lg:h-[7rem] border-2 border-primary overflow-hidden">
                    <Image
                      src={avatar}
                      width="100"
                      height="100"
                      alt="Profile picture"
                    />
                  </div>
                  {/* <button disabled className="px-4 py-2 my-6 rounded-md text-white bg-primary text-xs lg:text-sm ">
                    upload image
                  </button> */}
                </div>
              </div>
            </div>

            <div className="border-b border-white/0 my-4"></div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-10 justify-items-stretch items-center">
              <label
                htmlFor="first name"
                className="text-md lg:text-lg text-primary lg:text-right font-bold capitalize"
              >
                First name
              </label>
              <div className="col-span-2 flex items-start">
                <Input
                  placeholder={firstName || "N/A"}
                  id="first name"
                  name="first name"
                  type="text"
                  className="px-2 py-2 border border-secondary focus:outline-none  w-full rounded-md"
                />
              </div>
            </div>
            <div className="border-b border-white/0 my-4"></div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-10 justify-items-stretch items-center">
              <label
                htmlFor="last name"
                className="text-md lg:text-lg text-primary lg:text-right font-bold capitalize"
              >
                Last name
              </label>
              <div className="col-span-2 flex items-start">
                <Input
                  placeholder={lastName || "N/A"}
                  id="last name"
                  name="last name"
                  type="text"
                  className="px-2 py-2 border border-secondary focus:outline-none  w-full rounded-md"
                />
              </div>
            </div>
            <div className="border-b border-white/0 my-4"></div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-10 justify-items-stretch items-center">
              <label
                htmlFor="email"
                className="text-md lg:text-lg text-primary lg:text-right font-bold capitalize"
              >
                email
              </label>
              <div className="col-span-2 flex items-start">
                <Input
                  placeholder={email || "N/A"}
                  id="email"
                  name="email"
                  type="text"
                  className="px-2 py-2 border border-secondary focus:outline-none  w-full rounded-md"
                />
              </div>
            </div>
            <div className="border-b border-white/0 my-4"></div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-10 justify-items-stretch items-center">
              <label
                htmlFor="Phone number"
                className="text-md lg:text-lg text-primary lg:text-right font-bold capitalize"
              >
                Phone number
              </label>
              <div className="col-span-2 flex items-start">
                <Input
                  placeholder={phone || "N/A"}
                  id="phone"
                  name="phone"
                  type="text"
                  className="px-2 py-2 border border-secondary focus:outline-none  w-full rounded-md"
                />
              </div>
            </div>
            <div className="border-b border-white/0 my-4"></div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-1 lg:gap-10 justify-items-stretch items-center">
              <label
                htmlFor="Address"
                className="text-md lg:text-lg text-primary lg:text-right font-bold capitalize"
              >
                address
              </label>
              <div className="col-span-2 flex items-start">
                <Input
                  placeholder={address || "N/A"}
                  id="address"
                  name="address"
                  type="text"
                  className="px-2 py-2 border border-secondary focus:outline-none  w-full rounded-md"
                />
              </div>
            </div>
            <div className="border-b border-white/0 my-4"></div>
          </section>
        </section>
      </Layout>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.elementType.isRequired,
  pageMeta: PropTypes.object,
};
