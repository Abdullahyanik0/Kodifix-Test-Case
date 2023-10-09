/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import React, { useState } from "react";
import { formatDate } from "utils/helper";

const WeatherList = ({ singleCityData, multipleCityData }) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const toggleUnit = () => {
    setIsFahrenheit((prev) => !prev);
  };

  const convertTemperature = (temp) => {
    if (isFahrenheit) {
      return Math.floor((temp * 9) / 5 + 32);
    } else {
      return Math.floor(temp);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full lg:px-20 gap-10 px-2">
      {singleCityData && (
        <div className="flex flex-col lg:flex-row gap-4 items-center text-xl lg:text-2xl">
          <img className="w-60" src={`/images/${singleCityData?.weather?.[0]?.icon}.svg`} alt="weather icon" />
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-medium">{singleCityData?.name}</h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p>Temperature:</p>
                <p className="font-medium">
                  {" "}
                  {convertTemperature(singleCityData?.main?.temp)} {isFahrenheit ? "℉" : "℃"}
                </p>
              </div>
              <h4>{singleCityData?.weather?.[0]?.description} </h4>
              <p>{formatDate(singleCityData?.dt)}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 max-w-xs w-full px-2">
        {multipleCityData?.daily?.map((item, i) => (
          <div
            key={i}
            className="backdrop-blur-md border border-slate-100/50 rounded-md px-2 py-1 lg:py-2 lg:px-4 flex justify-between items-center gap-2"
          >
            <p className="flex items-center gap-2">{dayjs.unix(item?.dt).format("DD MMMM")}</p>
            <div className="flex items-center gap-2">
              <img className="w-10" src={`/images/${item?.weather?.[0]?.icon}.svg`} alt="weather icon" />
              <p className="font-medium w-12">
                {convertTemperature(item?.temp?.day)} {isFahrenheit ? "℉" : "℃"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="absolute top-20 sm:top-4 right-4" onClick={toggleUnit}>
        {isFahrenheit ? "Switch to Celsius" : "Switch to Fahrenheit"}
      </button>
    </div>
  );
};

export default WeatherList;
