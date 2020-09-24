$(document).ready(function() {

    var apiKey = "c99bd174694c00b9d6ab9d9400f80517";
    var today = moment().format("M/D/YY");
    var city = $(".city-input").val;

    $("#search-button").on("click", function (event) {
        event.preventDefault()
    });

    
    // when search button clicked get weather function 
    getWeather(city);


    //getting weather from http://api.openweathermap.org
    function getWeather(city) {
        var queryUrl =
            "http://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&APPID=1ffddcadb7b130db5cc98df184fac87d";


        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {
            console.log(response);

            //assigning latitude information got it from open weather map
            var lat = response.city.coord.lat;

            //assigning longtitude information got it from open weather map
            var lon = response.city.coord.lon;
            console.log(response.city.coord.lon);

            updateWeather(response);
        });
    }

    function updateWeather(response) {
        $("#current-city").html(
            "<h2>" +
            response.city.name +
            "   (" +
            response.list[0].dt_txt +
            ")" +
            "</h2>"
        );
        $("#current-weather").html(response.list[0].weather[0].main + "    ");

        var icon = $(".wIcon");
        var weatherIcon = response.list[0].weather[0].main;

        console.log(response.list[0].weather[0].main);

        if (weatherIcon === "Clear") {
            icon.addClass("fas fa-sun");
        } else if (weatherIcon === "Clouds") {
            icon.addClass("fas fa-cloud");
        } else if (weatherIcon === "Snow") {
            icon.addClass("fas fa-snow");
        } else if (weatherIcon === "Drizzle") {
            icon.addClass("fas fa-cloud-drizzle");
        } else if (weatherIcon === "Rain") {
            icon.addClass("fas fa-cloud-showers-heavy");
        }

        $("#current-weather").append(icon);

        $("#temperaature").html(response.list[0].main.temp + " °F");
        $("#humidity").html(response.list[0].main.humidity + " %");
        $("#windspeed").html(response.list[0].wind.speed + " MPH");


        //looping through 5 days data from open weather map & get dates from moment.js
        for (var i = 1; i < 6; i++) {
            var date = moment()
                .add(i + 1, "days")
                .format("M/D/YYYY");
            var dateBox = $(".fiveDate")
            dateBox.html(date);
            var tempBox = $(".fiveTemp")
            tempBox.html(response.list[i].main.temp + " °F")
            var humidBox = $(".fiveHumidity")
            humidBox.html(response.list[i].main.humidity + " %")



            var iconBox = $(".fiveImg")

            var weatherIcon = response.list[0].weather[0].main;

            if (weatherIcon === "Clear") {
                iconBox.addClass("fas fa-sun");
            } else if (weatherIcon === "Rain") {
                iconBox.addClass("fas fa-cloud-showers-heavy");
            } else if (weatherIcon === "Snow") {
                iconBox.addClass("fas fa-snowflake");
            } else if (weatherIcon === "Drizzle") {
                iconBox.addClass("fas fa-cloud-drizzle");
            } else if (weatherIcon === "Clouds") {
                iconBox.addClass("fas fa-cloud");
            }
        }
    }

})

