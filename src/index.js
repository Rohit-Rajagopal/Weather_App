import "./styles.css";

const API_KEY = "HTZN5ZWHJT8CWMK344CGFVETR";
const result = document.querySelector(".result");
const weatherForm = document.querySelector(".weather-form");
const img = document.querySelector(".image");

async function getWeather(location) {
  const params = new URLSearchParams();
  params.append("key", API_KEY);
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${params}`,
  );
  const data = await response.json();
  result.textContent = data.days[0].conditions;
  import(`./images/${data.days[0].icon}.png`).then((png) => {
    img.src = png.default;
  });
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(weatherForm);
  result.textContent = "Loading...";
  getWeather(formData.get("city"));
});
