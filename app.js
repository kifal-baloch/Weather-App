var weather = document.getElementById("weather");
var city = document.getElementById("city");

function getWeather() {
    // Get the city name from input field
    var cityName = city.value;

    // If city is empty, don't proceed
    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    // Fetch weather data using OpenWeatherMap API
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=392fc470c1ac8b42b2f40951a9a96cc4&units=metric`
    )
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        console.log(data);

        // If city is not found, show an error message
        if (data.cod !== 200) {
            weather.innerHTML = "<p>City not found. Please try again.</p>";
            return;
        }

        // Extract weather data
        var tempValue = Math.round(data.main.temp);
        var cityValue = data.name;
        var weatherConditionValue = data.weather[0].main;
        var windSpeedValue = data.wind.speed;
        var humidityValue = data.main.humidity;

        // Update the weather information dynamically
        weather.innerHTML = `
            <h1 class="temp">${tempValue}°C</h1>
            <p class="city">${cityValue}</p>

            <div class="info-card">
                <p><span class="label">Weather:</span> ${weatherConditionValue}</p>
            </div>

            <div class="info-card">
                <p><span class="label">Wind Speed:</span> ${windSpeedValue} km/h</p>
            </div>

            <div class="info-card">
                <p><span class="label">Humidity:</span> ${humidityValue}%</p>
            </div>
        `;

        // Clear the input field so the user can search for another city
        city.value = '';
    })
    .catch(function (err) {
        console.log(err);
        weather.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    });
}