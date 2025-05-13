const apiKey = '7efc27d1bd0935a4ade583d7178826b6'; // Replace with your OpenWeather API key
const button = document.getElementById('get-weather');
const cityInput = document.getElementById('city-input');
const weatherDataContainer = document.getElementById('weather-data');

button.addEventListener('click', fetchWeather);

function fetchWeather() { 
  const city = cityInput.value.trim();

  if (!city) {
    weatherDataContainer.innerHTML = '<p class="error">Please enter a city name.</p>';
    return;
  }


  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherDataContainer.innerHTML = `<p class="error">City not found. Please try again.</p>`;
      } else {
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherDataContainer.innerHTML = `
          <h2 class="city">${cityName}</h2>
          <div class="weather-info">
            <p>Temperature: <span>${temperature}°C</span></p>
            <p>Description: <span>${weatherDescription}</span></p>
            <p>Humidity: <span>${humidity}%</span></p>
            <p>Wind Speed: <span>${windSpeed} m/s</span></p>
          </div>
        `;

        const facts = generateWeatherFacts(temperature, humidity, windSpeed, weatherDescription);
        let factsHtml = `<section class="weather-facts">
<h2>🌟 Weather Tips for ${cityName}</h2>
<ul>` +
          facts.map(f => `<li>${f}</li>`).join('') +
          `</ul>
</section>`;

        weatherDataContainer.innerHTML += factsHtml;
      }
    })
    .catch(error => {
      weatherDataContainer.innerHTML = `<p class="error">Error fetching data. Please try again later.</p>`;
    });

  function generateWeatherFacts(temp, humidity, windSpeed, description) {
    let facts = [];

    // Based on temperature
    if (temp <= 0) {
      facts.push("🥶 It's freezing! Dress in layers and avoid staying outdoors too long.");
    } else if (temp > 0 && temp <= 15) {
      facts.push("🧥 It's chilly. A warm jacket is recommended.");
    } else if (temp > 15 && temp <= 30) {
      facts.push("🌤️ Comfortable weather. Great time for outdoor activities!");
    } else {
      facts.push("🔥 It's hot outside! Stay hydrated and avoid the midday sun.");
    }

    // Based on humidity
    if (humidity > 80) {
      facts.push("💧 High humidity may make it feel warmer than it is.");
    } else if (humidity < 30) {
      facts.push("🫧 Low humidity can dry your skin and throat. Stay moisturized.");
    }

    // Based on wind
    if (windSpeed > 10) {
      facts.push("💨 Windy conditions. Be cautious of debris and wear secure clothing.");
    }

    // Based on weather description
    if (description.includes("rain")) {
      facts.push("☔ Rainy day! Don't forget your umbrella.");
    } else if (description.includes("clear")) {
      facts.push("🌞 Clear skies ahead! Great day to be outside.");
    } else if (description.includes("snow")) {
      facts.push("❄️ Snowy weather. Be careful of icy roads.");
    }

    return facts;
  }
}


// Back to Top Button functionality
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
