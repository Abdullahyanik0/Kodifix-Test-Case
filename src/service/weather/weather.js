import axiosInstance from "service/axiosInstance";

const commonParams = {
  lang: "en",
  appid: "20d40447ba6499aff4e8629009d059c1",
  units: "metric",
};

const makeRequest = async (url, params) => {
  return axiosInstance.get(url, { params });
};

export const getWeatherService = async (latitude, longitude) => {
  const params = new URLSearchParams({ ...commonParams, lat: latitude, lon: longitude });

  return makeRequest("/weather", params);
};

export const getWeatherDailyService = async (latitude, longitude) => {
  const params = new URLSearchParams({ ...commonParams, lat: latitude, lon: longitude });

  return makeRequest("/onecall", params);
};

export const getWeatherSearchService = async (city) => {
  const params = new URLSearchParams({ ...commonParams, q: city });

  return makeRequest("/find", params);
};
