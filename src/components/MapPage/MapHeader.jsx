import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useUserCredentialsStore } from "@store/authStore.store";
import { useLogoutUser } from "@hooks/useLogoutUser.hook";
import { AiOutlineDown } from "react-icons/ai";
import healthWorker from "@assets/images/health-worker.svg";

// import RegisterFacilityModal from "@components/Facility/RegisterFacilityModal";
import ReportFacilityModal from "@components/Facility/ReportFacilityModal";

import Image from "next/image";
import logo from "@assets/images/logo.svg";
import DialogueBox from "@components/DialogueBox/DialogueBox";
import ProfileDropdown from "@components/Dropdown/ProfileDropdown";

const MapHeader = (props) => {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setUserData(useUserCredentialsStore.getState().userDetails);
    setIsAuthenticated(useUserCredentialsStore.getState().isAuthenticated);
  }, []);

  let userName = userData?.user?.username;

  const router = useRouter();

  const { logoutHandler } = useLogoutUser();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const closeProfile = () => {
    setShowProfile(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [showReportModal, setShowReportModal] = useState(false);

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  // dialogue box function to log out users
  const [showDialogue, setShowDialogue] = useState(false);
  const confirmLogout = () => {
    logoutHandler();
  };
  const confirmCancel = () => {
    setShowDialogue(false);
  };

  return (
    <header className="fixed top-0 w-full z-[999] backdrop-blur-sm bg-black/10">
      <nav className=" mx-auto grid grid-cols-2 lg:grid-cols-5 items-center justify-between px-6 py-2 ">
        {/* logo */}
        <Link href="/">
          <a className="w-[5rem] h-[2rem]">
            <Image src={logo} alt="reporta-health-logo" />
          </a>
        </Link>

        {/* nav links */}
        <div className="hidden lg:col-span-3 lg:flex flex-row items-center justify-center mr-16 text-seconary text-sm">
          <Link href="/">
            <a
              className={
                router.pathname === "/"
                  ? "text-accent mx-4 font-extrabold"
                  : "tracking-wide mx-4 font-extrabold hover:text-primary leading-loose lg:transition ease-in-out delay-150 lg:hover:-translate-y-1 lg:hover:scale-130 duration-300"
              }
            >
              Home
            </a>
          </Link>
          <Link href="/about">
            <a
              className={
                router.pathname === "/about"
                  ? "text-accent mx-4 font-extrabold"
                  : "tracking-wide mx-4 font-extrabold hover:text-primary leading-loose lg:transition ease-in-out delay-150 lg:hover:-translate-y-1 lg:hover:scale-130 duration-300"
              }
            >
              About
            </a>
          </Link>

          <Link href="/statistics">
            <a
              className={
                router.pathname === "/statistics"
                  ? "text-accent mx-4 font-extrabold"
                  : "tracking-wide mx-4 font-extrabold hover:text-primary leading-loose lg:transition ease-in-out delay-150 lg:hover:-translate-y-1 lg:hover:scale-130 duration-300"
              }
            >
              Statistics
            </a>
          </Link>
        </div>

        <div className="relative">
          {isAuthenticated ? (
            <div className="hidden lg:flex text-xs items-center justify-end">
              {/* user icon */}
              <div className="w-8 h-8 flex items-center justify-center rounded-full mx-2 shadow-sm">
                <svg
                  width="236px"
                  height="236px"
                  viewBox="0 0 24.00 24.00"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                  transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                  strokeWidth="0.00024000000000000003"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      opacity="0.4"
                      d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z"
                      fill="#242F9B"
                    ></path>{" "}
                    <path
                      d="M15.4991 10.1301C16.5374 10.1301 17.3791 9.28841 17.3791 8.25012C17.3791 7.21182 16.5374 6.37012 15.4991 6.37012C14.4608 6.37012 13.6191 7.21182 13.6191 8.25012C13.6191 9.28841 14.4608 10.1301 15.4991 10.1301Z"
                      fill="#242F9B"
                    ></path>{" "}
                    <path
                      d="M8.49914 10.1301C9.53744 10.1301 10.3791 9.28841 10.3791 8.25012C10.3791 7.21182 9.53744 6.37012 8.49914 6.37012C7.46085 6.37012 6.61914 7.21182 6.61914 8.25012C6.61914 9.28841 7.46085 10.1301 8.49914 10.1301Z"
                      fill="#242F9B"
                    ></path>{" "}
                    <path
                      d="M15.6009 12.9199H8.40086C7.70086 12.9199 7.13086 13.4899 7.13086 14.1999C7.13086 16.8899 9.32086 19.0799 12.0109 19.0799C14.7009 19.0799 16.8909 16.8899 16.8909 14.1999C16.8809 13.4999 16.3009 12.9199 15.6009 12.9199Z"
                      fill="#242F9B"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
                className="flex items-center  lg:font-semibold mx-2 lg:bg-gray px-2 py-2 rounded-md border border-gray"
              >
                Hello,{" "}
                <span className="mx-2 mr-6 lg:text-primary">{userName}</span>
                {showProfile ? (
                  <span className="rotate-180 transition-all ease-in duration-150">
                    <AiOutlineDown />
                  </span>
                ) : (
                  <span className="transition-all ease-in duration-150">
                    <AiOutlineDown />
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Link href="login">
                <button className="hidden text-primary tracking-wide leading-loose rounded-xl lg:flex items-center text-sm font-normal px-6 py-1 border border-primary lg:transition ease-in-out lg:hover:scale-95 duration-300">
                  Login
                </button>
              </Link>
            </div>
          )}

          {/* hamburger button*/}
          <div className="mobile absolute right-5 lg:hidden">
            {showSidebar ? (
              <a
                onClick={() => setShowSidebar(!showSidebar)}
                className="fixed hamburger active z-50"
              >
                <span></span>
              </a>
            ) : (
              <a
                onClick={() => setShowSidebar(!showSidebar)}
                className=" hamburger z-50"
              >
                <span></span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* sidebar menu content */}

      <div
        className={`w-screen h-screen fixed inset-0 z-40 ease-in-out duration-300 ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="w-screen h-screen fixed inset-0 z-40 ease-in-out duration-300 bg-black bg-opacity-0"
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
        <div
          className={`inset-y-0 right-0 md:w-3/6 w-5/6 bg-white text-lg text-black text-opacity-60 drop-shadow-2xl flex flex-col justify-between px-6 fixed h-full z-40 ease-in-out duration-300`}
        >
          {/* menu link */}
          <div className="mt-[4rem]  flex flex-col justify-between capitalize items-start text-left">
            <Link href="/">
              <a
                className={
                  router.pathname === "/"
                    ? "flex items-center justify-start my-2  text-black text-opacity-1 font-extrabold"
                    : "tracking-wide leading-loose my-2 flex items-center justify-start "
                }
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.02 1.83992L2.63 6.03992C1.73 6.73992 1 8.22992 1 9.35992V16.7699C1 19.0899 2.89 20.9899 5.21 20.9899H16.79C19.11 20.9899 21 19.0899 21 16.7799V9.49992C21 8.28992 20.19 6.73992 19.2 6.04992L13.02 1.71992C11.62 0.739918 9.37 0.789918 8.02 1.83992Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                &nbsp; &nbsp; Home
              </a>
            </Link>
            <Link href="/about">
              <a
                className={
                  router.pathname === "/about"
                    ? "flex items-center justify-start my-2  text-black text-opacity-1 font-extrabold"
                    : "tracking-wide leading-loose my-2 flex items-center justify-start "
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9946 16H12.0036"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                &nbsp; &nbsp; About
              </a>
            </Link>
            <Link href="/statistics">
              <a
                className={
                  router.pathname === "/statistics"
                    ? "flex items-center justify-start my-2  text-black text-opacity-1 font-extrabold"
                    : "tracking-wide leading-loose my-2 flex items-center justify-start "
                }
              >
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <g>
                    <g>
                      <path
                        d="M503.467,290.133H486.4c-18.475,0-34.56-32.435-50.116-63.804c-20.873-42.086-44.544-89.796-86.417-89.796
			c-42.283,0-62.225,47.983-79.829,90.308c-12.937,31.121-26.317,63.292-44.382,63.292c-18.569,0-24.346-14.029-32.23-36.915
			c-7.424-21.564-16.674-48.418-48.358-48.418c-29.073,0-40.286,22.758-50.185,42.837c-11.238,22.801-20.941,42.496-52.215,42.496
			h-8.533v-230.4c0-14.114,11.486-25.6,25.6-25.6h392.533c14.114,0,25.6,11.486,25.6,25.6v204.8c0,4.71,3.823,8.533,8.533,8.533
			s8.533-3.823,8.533-8.533v-204.8c0-23.526-19.14-42.667-42.667-42.667H59.733c-23.526,0-42.667,19.14-42.667,42.667v230.4H8.533
			c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h34.133c41.89,0,56.107-28.843,67.524-52.019
			c10.487-21.274,17.28-33.314,34.876-33.314c18.569,0,24.346,14.029,32.23,36.915c6.904,20.062,15.394,44.689,42.035,48.034
			c0.794,0.247,1.647,0.384,2.534,0.384h3.789c29.457,0,44.365-35.849,60.143-73.796c16.307-39.236,33.178-79.804,64.068-79.804
			c31.292,0,51.541,40.832,71.125,80.316c16.785,33.835,32.759,65.903,56.875,72.115v146.236c0,14.114-11.486,25.6-25.6,25.6h-25.6
			V307.2c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v170.667h-51.2V187.733c0-4.71-3.823-8.533-8.533-8.533
			s-8.533,3.823-8.533,8.533v290.133h-51.2v-153.6c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v153.6h-51.2V332.8
			c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v145.067h-51.2V256c0-4.71-3.823-8.533-8.533-8.533
			c-4.71,0-8.533,3.823-8.533,8.533v221.867h-51.2V332.8c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v145.067h-8.533
			c-14.114,0-25.6-11.486-25.6-25.6V332.8c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v119.467
			c0,23.526,19.14,42.667,42.667,42.667h392.533c23.526,0,42.667-19.14,42.667-42.667V307.2h8.533c4.71,0,8.533-3.823,8.533-8.533
			S508.177,290.133,503.467,290.133z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
                &nbsp; &nbsp; Statistics
              </a>
            </Link>
            {isAuthenticated && (
            <Link href="/profile">
              <a
                className={
                  router.pathname === "/profile"
                    ? "flex items-center justify-start my-2  text-black text-opacity-1 font-extrabold"
                    : "tracking-wide leading-loose my-2 flex items-center justify-start "
                }
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M252.245,0c-73.103,0-132.575,59.472-132.575,132.575s59.472,132.575,132.575,132.575S384.82,205.678,384.82,132.575
			S325.348,0,252.245,0z M252.246,246.21c-58.086,0-106.103-43.815-112.806-100.132c26.198,7.495,83.708,16.958,128.961-25.322
			c12.956,24.025,38.909,52.712,76.954,52.712c4.292,0,8.758-0.418,13.357-1.197C342.576,215.411,300.945,246.21,252.246,246.21z
			 M363.278,151.875c-56.966,16.285-82.189-48.291-83.234-51.047c-1.184-3.126-3.93-5.41-7.227-5.983
			c-3.288-0.546-6.649,0.629-8.822,3.163c-43.896,51.193-105.946,34.903-125.193,28.157C142.14,66.475,191.74,18.939,252.246,18.939
			c62.658,0,113.635,50.973,113.635,113.635c0,6.524-0.583,12.91-1.644,19.136C363.917,151.764,363.598,151.787,363.278,151.875z"
                      />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path
                        d="M375.341,303.668H138.619c-57.442,0-105.155,46.088-105.155,103.526v94.696c0,5.234,5.22,10.11,10.45,10.11h426.133
			c5.229,0,8.489-4.876,8.489-10.11v-94.696C478.536,349.756,432.783,303.668,375.341,303.668z M459.597,493.061H52.403v-85.867
			c0-46.997,39.215-84.586,86.216-84.586h236.722c47.001,0,84.255,37.589,84.255,84.586V493.061z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
                &nbsp; &nbsp; Profile
              </a>
            </Link>
            )}
          </div>

          <div className="w-full mb-[4rem]">
            {isAuthenticated ? (
              <div className="flex flex-col items-start justify-center">
                <p className="lg:hidden flex">Hello, {userName}</p>

                <a
                  onClick={() => {
                    setShowSidebar(!showSidebar);
                    setShowDialogue(true);
                  }}
                  className="flex items-center justify-start my-2  text-black text-opacity-1 font-extrabold"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.0001 12H3.62012"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  &nbsp; &nbsp; Logout
                </a>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <a className="flex items-center justify-start my-2  text-black text-opacity-1 font-extrabold">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.8999 7.55999C9.2099 3.95999 11.0599 2.48999 15.1099 2.48999H15.2399C19.7099 2.48999 21.4999 4.27999 21.4999 8.74999V15.27C21.4999 19.74 19.7099 21.53 15.2399 21.53H15.1099C11.0899 21.53 9.2399 20.08 8.9099 16.54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.0001 12H3.62012"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    &nbsp; &nbsp; Login
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <RegisterFacilityModal onClose={closeModal} visible={showModal} /> */}
      <ProfileDropdown
        onClose={closeProfile}
        show={showProfile}
        onLogout={setShowDialogue}
        close={closeProfile}
      />
      <ReportFacilityModal
        onClose={closeReportModal}
        visible={showReportModal}
      />
      <DialogueBox
        show={showDialogue}
        confirmLogout={confirmLogout}
        confirmCancel={confirmCancel}
        title="Log out"
        message={`Hey ${userName}, are you sure you want to log out?`}
      />
    </header>
  );
};

export default memo(MapHeader);
