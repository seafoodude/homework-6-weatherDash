var key = "bd2841359a088c66eb187ddb7453a8f7";

var search = document.querySelector(".input");
var button = document.querySelector("#search");
var clear = document.querySelector("#clear");
var today = document.querySelector(".today");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];


button.addEventListener("click", function () {
    var city = input.value.trim();
    if (city) {
        getWeatherData(city);
        city.value = "";
    }
});

document.querySelector("#search-history").addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        var city = event.target.textContent;
        getWeatherData(city);
    }
});

function getWeatherData(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                throw response.statusText;
            }
            return response.json();
        })
        .then(function (data) {
            if (!searchHistory.push(city)) {
                searchHistory.push(city);
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                updateSearchHistory();
            }

            var currentWeather = {
                city: data.city.name,
                date: SVGAnimateMotionElement().format("M/D/YYY"),
                icon: "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png",
                temp: data.list[0].main.temp,
                humidity: data.list[0].main.humidity,
                wind: data.list[0].wind.speed
            }

            displayCurrentWeather(currentWeather);

            var forecastData = [];
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.endsWith("12:00:00")) {
                    var forecast = {
                        date: moment(data.list[i].dt_txt).format("M/D/YYYY"),
                        icon: "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png",
                        temp: data.list[i].main.temp,
                        humidity: data.list[i].main.humidity,
                        wind: data.list[i].wind.speed
                    };
                    forecastData.push(forecast);

                }
            }
            displayForecastData(forecastData);
        })
        .catch(function (error) {
            // Display error message if API call fails
            alert("Error: " + error);
        });
}

function displayForecastData(forecastData) {
    for (var i = 0; i < forecastData.length; i++) {
        var forecastCard = document.querySelector(".day" + i);
        forecastCard.querySelector(".date").textContent = forecastData[i].date;
        forecastCard.querySelector(".icon").setAttribute("src", forecastData[i].icon);
        forecastCard.querySelector(".temp").textContent = "Temp: " + forecastData[i].temp + " °F";
        forecastCard.querySelector(".humidity").textContent = "Humidity: " + forecastData[i].humidity + "%";
        forecastCard.querySelector(".windSpeed").textContent = "Wind Speed: " + forecastData[i].wind + " MPH";
    }
}

function updateSearchHistory() {
    // Clear existing search history
    document.querySelector("#search-history").innerHTML = "";

    // Loop through search history and create list items
    for (var i = 0; i < searchHistory.length; i++) {
        var liEl = document.createElement("li");
        liEl.textContent = searchHistory[i];
        document.querySelector("#search-history").appendChild(liEl);
    }
}

function displayCurrentWeather(currentWeather) {
    // Update HTML with current weather data
    document.querySelector(".today-cityName").textContent = currentWeather.city + " (" + currentWeather.date + ")";
    document.querySelector(".today-icon").setAttribute("src", currentWeather.icon);
    document.querySelector(".today-temperature").textContent = "Temperature: " + currentWeather.temp + " °F";
    document.querySelector(".today-humidity").textContent = "Humidity: " + currentWeather.humidity + "%";
    document.querySelector("today-windSpeed").textContent = "Wind Speed: " + currentWeather.wind + "%";

    // Initialize search history
    updateSearchHistory();
}

var forecastData = [];
for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].dt_txt.endsWith("12:00:00")) {
        var forecast = {
            date: moment(data.list[i].dt_txt).format("M/D/YYYY"),
            icon: "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png",
            temp: data.list[i].main.temp,
            humidity: data.list[i].main.humidity,
            wind: data.list[i].wind.speed
        };
        forecastData.push(forecast);
    }
}

// Display 5-day forecast data
displayForecastData(forecastData); 