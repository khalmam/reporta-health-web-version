import { MapContext } from "@context/mapContext";
import React, { useContext, useState } from "react";
import StarRatings from "./StarRatings";
import useGetLocation from "@hooks/useGetLocation.hook";
import useRequireAuth from "@hooks/useRequireAuth.hook";

export default function PopupInfo({
  facility,
  showReportModal,
  openReviewModal,
}) {
  const { setSelectedDirection } = useContext(MapContext);

  const location = useGetLocation();
  const requireAuth = useRequireAuth();

  const handleGetDirection = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&origin=" +
        location.coordinates.lat +
        "," +
        location.coordinates.lng +
        "&destination=" +
        facility.latitude +
        "," +
        facility.longitude +
        "&travelmode=driving"
    );
  };
  return (
    <section className="relative">
      <div className="w-[70vw] md:w-[35vw] lg:w-[25vw] aspect-square bg-white font-semibold px-2 font-sans">
        <div className="flex flex-col py-4">
          <div className="grid grid-cols-4 -space-y-2 items-center">
            <svg
              className="w-[60%] aspect-square"
              viewBox="0 0 81 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2.36108"
                y="2.26904"
                width="77"
                height="77"
                rx="38.5"
                fill="white"
              />
              <path
                d="M28.1461 57.769V25.9856H33.1803V39.9788H47.8988V25.9856H52.8903V57.769H47.8988V44.4584H33.1803V57.769H28.1461Z"
                fill="#242F9B"
              />
              <rect
                x="2.36108"
                y="2.26904"
                width="77"
                height="77"
                rx="38.5"
                stroke="#242F9B"
                strokeWidth="3"
              />
            </svg>
            <p className="col-span-3 text-primary font-extrabold text-[120%] w-fit">
              {facility?.reg_fac_name || "N/A"}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center justify-items-stretch -space-y-2">
            <div className=""></div>
            <div className="col-span-3 grid grid-cols-3 items-center justify-center space-x-2 text-primary">
              <span className="flex justify-center font-semibold">
                <StarRatings
                  className="w-[40%]"
                  rating={Math.round(facility?.average_rating)}
                />
              </span>
              <span className="col-span-2 flex   items-center">
                <div
                  type="button"
                  onClick={openReviewModal}
                  className=" text-black/80 font-extrabold px-3 border border-primary py-1 text-[90%] rounded-md lg:transition ease-in-out lg:hover:scale-95 duration-300 cursor-pointer"
                >
                  Reviews
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 py-2 border-t border-black/20">
          <div className="flex flex-col col-span-4">
            <span className="text-[70%] text-primary font-bold">Address</span>
            <span className="text-[100%] lowercase">
              {facility?.street_name ? facility?.street_name : "N/A"}
            </span>
          </div>
          <div className="w-full h-full border-r border-black/20"></div>
          <div className="flex flex-col col-span-2">
            <span className="text-[70%] text-primary font-bold">Ownership</span>
            <span className="text-[100%] lowercase">
              {facility?.ownership ? facility?.ownership : "N/A"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 py-2 border-t border-black/20">
          <div className="flex flex-col col-span-2">
            <span className="text-[70%] text-primary font-bold">
              Operation Hours
            </span>
            <span className="text-[100%] lowercase">
              {facility?.operational_hours
                ? facility?.operational_hours
                : "N/A"}
            </span>
          </div>
          <div className="w-full h-full border-r border-black/20"></div>
          <div className="flex flex-col col-span-4">
            <span className="text-[70%] text-primary font-bold">
              Phone Number
            </span>
            <span className="text-[100%] lowercase">
              {facility?.phone_number ? facility?.phone_number : "N/A"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 py-2 border-t border-b border-black/20">
          <span className="text-[70%] text-primary font-bold">Services</span>
          <span className="text-[100%] break-words overflow-hidden">
            {facility?.services ? facility?.services.join(", ") : "N/A"}
          </span>
        </div>
        <div className="w-full grid grid-cols-2 items-center justify-items-between py-6">
          <button
            onClick={() => requireAuth(() => showReportModal())}
            className="text-danger font-bold w-fit text-[90%] underline"
          >
            Report facility
          </button>
          <button
            // onClick={() => {
            //   setSelectedDirection(facility);
            // }}
            onClick={handleGetDirection}
            className="bg-primary w-fit text-[90%] font-light px-3 py-2 rounded-md flex items-end justify-self-end text-white lg:transition ease-in-out lg:hover:scale-95 duration-300 cursor-pointer"
          >
            Get Direction
          </button>
        </div>
      </div>
    </section>
  );
}
