var apiKey = "1ffddcadb7b130db5cc98df184fac87d";
var today = moment().format("M/D/YY");
var location = [""];
var currentCity = {};

// Daily Forecast
function showWeather(city, day) {
    var date = moment().add(day, 'days').format("M/D/YY")
    var displayDate = $("#time").text(date)
    var temperature = $("#temperature").text(`:${kelvinToFahrenheit(city.daily[day].temp.day)} F`);
    var humidity = $("#humidity").text(`: ${city.daily[day].humidity}%`);
    var weatherIcon = $("<img class='conditions-icon'>").attr("src", `https://openweathermap.org/img/wn/${city.daily[day].weather[0].icon}@2x.png`);
    weatherIcon.attr("alt", city.current.weather[0].main);

    $(`*[data-day="${day}"]`).empty()
    $(`*[data-day="${day}"]`).append(displayDate, weatherIcon, temperature, humidity);
}

// Function to return Longitude and Lattitude
function getLatAndLong(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        url: queryURL,
        method: "Get"
    }).then(function (response) {
        citySearch(response.coord.lat, response.coord.long, cityName)
    });
}

// Search current weather 
function citySearch(){
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`;

    $.ajax({
        
    })

}