$(document).ready(function () {
    var apiKey = "c99bd174694c00b9d6ab9d9400f80517";
    var indexBox = $("#uv-index");

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        // when search button clicked get weather function
        var city = $(".city-input").val().trim();
        getWeather(city);
        keepCity(city);
      

    });

    //getting weather from API
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

            // Latttitude and Longitude Variable
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;
            console.log(response.city.coord.lon);
           

            updateWeather(response);
            searchUV(lat, lon);
        });

    }
    // API call to set up UV index.
    function searchUV(lat, lon) {
        var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvqURL,
            method: "GET"
        }).then(function (response) {
            $(currentUvindex).html(response.value);
        });
        var uvIndex = $("<p>").html(`: <span style="color:white; background-color:${uvIndexStyler(parseFloat(response.current.uvi))}">${response.current.uvi}</span>`)
        indexBox.append(uvIndex);
    }

    // Function to get weather for main card

    function updateWeather(response) {

        $("#time").html(
            "<h3>" +
            response.city.name +
            "   (" +
            response.list[0].dt_txt +
            ")" +
            "</h3>"
        );
        $("#temperature").html(response.list[0].weather[0].main + "    ");

        var pictureI = $(".wIcon");
        var weatherIcon = response.list[0].weather[0].main;

        console.log(response.list[0].weather[0].main);

        if (weatherIcon === "Clear") {
            pictureI.addClass("fas fa-sun");
        } else if (weatherIcon === "Clouds") {
            pictureI.addClass("fas fa-cloud");
        } else if (weatherIcon === "Snow") {
            pictureI.addClass("fas fa-snow");
        } else if (weatherIcon === "Drizzle") {
            pictureI.addClass("fas fa-cloud-drizzle");
        } else if (weatherIcon === "Rain") {
            pictureI.addClass("fas fa-cloud-showers-heavy");
        }

        $(".wIcon").append(pictureI);

        $("#temperature").html(response.list[0].main.temp + " °K");
        $("#humidity").html(response.list[0].main.humidity + " %");
        $("#windspeed").html(response.list[0].wind.speed + " MPH");

        //looping through 5 day forecast
        for (var i = 0; i < 5; i++) {
            var date = moment()
                .add([(i + 1) * 8 - 1], "days")
                .format("M/D/YYYY");
            var dateBox = $(".fiveDate");
            dateBox.html(date);
            var tempBox = $(".fiveTemp");
            tempBox.html(response.list[(i + 1) * 8 - 1].main.temp + "°K");
            var humidBox = $(".fiveHumidity");
            humidBox.html(response.list[(i + 1) * 8 - 1].main.humidity + "%");

            var iconBox = $(".fiveImg");

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

    function uvIndexStyler(uvIndex) {
        if (uvIndex < 4) {
            return "green";
        } else
            if (uvIndex < 7) {
                return "orange";
            } else {
                return "red";
            }
    }

    function keepCity(city) {
        if (localStorage.getItem("searchHistory")) {
            var history = JSON.parse(localStorage.getItem("searchHistory"));
            //stopping city presents more than once
            if (history.indexOf(city) === -1) {
                // push city to history
                history.push(city);
                //saving history to local storage
                localStorage.setItem("searchHistory", JSON.stringify(history));
            }
        } else {
            //or save [city] to localstorage
            localStorage.setItem("searchHistory", JSON.stringify([city]));
        }
        searchCityList();
    }

    // //list for last 8 searches
    function searchCityList() {
        if (localStorage.getItem("searchHistory")) {
            //retrieve search history and initialize in var city list
            var cityList = JSON.parse(localStorage.getItem("searchHistory"));
            //clearing div from appending all the time
            $(".search-list").empty();
            //creating list for searched cities
            for (var i = 0; i < cityList.length; i++) {
                var lists = $("<li>");
                lists.addClass("list-group-item");
                var listItem = $("<p>").text(cityList[i]);
                listItem.addClass("searchCity");
                lists.append(listItem);
                $(".search-list").append(lists);
            }
        }

    }
});
