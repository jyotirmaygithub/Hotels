import React from "react";
import HotelLayout from "./hotelLayout";
import { HotelContext } from "../../context/HotelsContext";

export default function Hotels() {
  const { hotelData } = HotelContext();
  return (
    <div>
      {hotelData
        ? hotelData.map((data) => {
            return <HotelLayout HotelData={data} />;
          })
        : ""}
    </div>
  );
}
