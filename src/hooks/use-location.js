import { useState, useEffect } from "react";

const useLocationAndLanguage = () => {
  const [location, setLocation] = useState({ latitude: "null", longitude: "null" });
  const [language, setLanguage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationAndLanguage = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      } catch (error) {
        setError("Could not get location. Please confirm location permission to see data from your own city.");
      }

      setLanguage(navigator.language || navigator.userLanguage);
    };

    getLocationAndLanguage();
  }, []);

  return { location, language, error };
};

export default useLocationAndLanguage;
