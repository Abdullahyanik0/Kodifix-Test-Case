/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";

//local imports
import { getWeatherDailyService, getWeatherSearchService, getWeatherService } from "service/weather/weather";
import { Button, TextInput } from "components/atoms";
import WeatherList from "components/molecules/WeatherList";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ cityData, singleCityData, multipleCityData, error }) {
  const router = useRouter();

  const [data, setData] = useState();
  const [searchTerm, setSearchTerm] = useState();

  const searchCity = (e) => setSearchTerm(e.target.value);

  const handleKeyPress = (e) => e.key === "Enter" && getCity();

  const getCity = async () => {
    const searchParam = searchTerm?.toLowerCase();
    !!searchParam && router.replace({ pathname: router.asPath.split("?")[0], query: { q: searchParam } });
  };

  const sendCity = async (city) => {
    setData();
    const searchParam = searchTerm?.toLowerCase();
    !!searchParam && router.replace({ pathname: router.asPath.split("?")[0], query: { lat: city?.lat, lon: city?.lon } });
  };

  const citySelectData = data?.list?.map((item) => ({ label: item?.name, lat: item?.coord?.lat, lon: item?.coord?.lon }));

  const showCityComponent = router?.query?.lat && router?.query?.lon;

  useEffect(() => {
    setData(cityData);
  }, [cityData]);

  return (
    <>
      <Head>
        <title>Kodifix Test Case</title>
      </Head>{" "}
      <main className={inter.className}>
        <div className="flex min-h-screen bg-custom-bg bg-cover bg-no-repeat flex-col items-center justify-center gap-10 p-4">
          <h1 className="text-4xl whitespace-nowrap ">Weather App</h1>
          <div className="border-2 min-h-[60vh] rounded-2xl p-4 lg:p-4 max-w-6xl w-full flex flex-col items-center gap-10 relative">
            <div className="flex items-center relative mt-2 mb-10">
              <TextInput className="w-52 sm:w-72" onKeyPress={handleKeyPress} onChange={searchCity} placeholder="Search city or district" />

              <Button onClick={getCity}>Search</Button>
              {citySelectData?.map((city, i) => (
                <div key={i} className="absolute top-12 px-2 py-1 left-0 w-full bg-white border rounded-lg">
                  <div onClick={() => sendCity(city)} className="hover:bg-blue-700 hover:text-white text-black cursor-pointer px-2 p-1 rounded-lg">
                    {city?.label}
                  </div>
                </div>
              ))}
              {router?.query?.q && citySelectData?.length === 0 && <p className="absolute -bottom-8 left-0">No results found </p>}
            </div>
            {showCityComponent ? (
              <WeatherList singleCityData={singleCityData} multipleCityData={multipleCityData} />
            ) : (
              <div>Discover current weather data and 8-day forecasts for more than 200,000 cities!</div>
            )}
            {error && "An error occurred"}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { q, lat, lon } = ctx.query;

  try {
    const data = q && (await getWeatherSearchService(q));
    const singleCityData = lat && lon && (await getWeatherService(lat, lon));
    const multipleCityData = lat && lon && (await getWeatherDailyService(lat, lon));

    return {
      props: {
        cityData: data?.data || null,
        singleCityData: singleCityData?.data || null,
        multipleCityData: multipleCityData?.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.toString(),
      },
    };
  }
}
