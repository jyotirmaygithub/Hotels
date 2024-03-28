import React, { useContext, createContext, useState, useEffect } from "react";

const Hotels = createContext();

export function HotelContextFunc(props) {
    useEffect(()=>{
        handleHotelData()
    },[])
  // state to store array of the total number of hotels.
  const [hotelData ,setHotelData] = useState([])

  // Route 5 : To fetch existing user data.
  async function handleHotelData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/api/retriveData/hotels-data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const Hotels = await response.json();
      if(Hotels){
        setHotelData(Hotels.hotels)
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  }
  return (
    <Hotels.Provider value={{ hotelData }}>
      {props.children}
    </Hotels.Provider>
  );
}

export function HotelContext() {
  return useContext(Hotels);
}
