import React, { useEffect, useState } from "react";

export default function Front() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  // // call serch function on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    search(city);
  };

  // call search function on mount
  useEffect(() => {
    const city = JSON.parse(localStorage.getItem("city"));
    if (city) {
      setCity(city);
      search(city);
    }
  }, []);

  // fetch api using city name
  const search = async (city) => {
    const allIcons = ["01d", "02d", "03d", "04d", "09d", "010d", "013d"];
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || "01d";
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      setData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: imageUrl,
      });
      localStorage.setItem("city", JSON.stringify(city));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      {city && (
        <div className="container">
          <h1 className="temprature">{data.temperature}&deg;C</h1>
          <div className="imageandcity">
            <img src={data.icon} alt="weather" className="image" />
            <h2 className="city">{data.location}</h2>
          </div>

          <div className="cardsContainer">
            <div className="cards">
              <span>Humidity</span>
              <p>{data.humidity}%</p>
            </div>
            <div className="cards">
              <span>Wind Speed</span>
              <p>{data.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
