import React, { useState, useEffect } from "react";

const Weather = () => {
  const [search, setSearch] = useState("Cairo");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a5e22f19bcb56308baca1f171aed5240`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    switch (data.weather[0].main) {
      case "Clouds":
        emoji = "fa-cloud";
        break;
      case "Thunderstorm":
        emoji = "fa-bolt";
        break;
      case "Drizzle":
        emoji = "fa-cloud-rain";
        break;
      case "Rain":
        emoji = "fa-cloud-showers-heavy";
        break;
      case "Snow":
        emoji = "fa-snowflake";
        break;
      default:
        emoji = "fa-smog";
    }
  } else {
    return <div>...loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div>
      <div className="container-lg mt-5 vh-100">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="card text-bg-dark text-center border-0 shadow">
              <img
                src={`https://source.unsplash.com/700x900/?${data.name}-${data.weather[0].main}`}
                className="card-img vh-75"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 col-sm py-3">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-3x`}></i>
                  <h1 className="fw-bolder mb-2">{temp}&deg;</h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg; | {temp_max}&deg; <br />
                    Humidity : {data.main.humidity}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
