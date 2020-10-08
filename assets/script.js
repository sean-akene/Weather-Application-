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

    // URL to get weather
    function getWeather(city) {
        var queryUrl =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&APPID=1ffddcadb7b130db5cc98df184fac87d";

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {

            // Latttitude and Longitude Variable
            var lat = response.city.coord.lat;
            var lon = response.city.coord.lon;

            searchUV(lat, lon);
            updateWeather(response);

        });

    }
    
    // URL to set up UV index
    function searchUV(lat, lon) {
        var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        $.ajax({
            url: uvqURL,
            method: "GET"
        }).then(function (response) {
            $(indexBox).html(response.value);
            console.log(response);
            
            var uvIndex = $("<p>").html("color", "white", "background-color", styleUV(parseFloat(response.current.uvi))
                .indexBox.append(uvIndex))
        });


    }


    // Function to get weather for main card

    function updateWeather(response) {

        $("#time").html(
            "<h3>" +response.city.name + "   (" + response.list[0].dt_txt + ")" +"</h3>"
        );
        $("#temperature").html(response.list[0].weather[0].main + "    ");

        var pictureI = $(".wIcon");
        var iconForecast = response.list[0].weather[0].main;

        if (iconForecast === "Clear") {
            pictureI.addClass("fas fa-sun");
        } else if (iconForecast === "Clouds") {
            pictureI.addClass("fas fa-cloud");
        } else if (iconForecast === "Snow") {
            pictureI.addClass("fas fa-snow");
        } else if (iconForecast === "Drizzle") {
            pictureI.addClass("fas fa-cloud-drizzle");
        } else if (iconForecast === "Rain") {
            pictureI.addClass("fas fa-cloud-showers-heavy");
        }

        $(".wIcon").append(pictureI);
        $("#temperature").html(response.list[0].main.temp + " °K");
        $("#humidity").html(response.list[0].main.humidity + " %");
        $("#windspeed").html(response.list[0].wind.speed + " MPH");

        $(".forecastbox").empty();

        // loop over all forecasts in the array by 3 hour increments
        for (var i = 0; i < response.list.length; i++) {
            // only look at forecasts around 3:00pm
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                // Creating the html  for each 5day cards  then pushing the cards to the div
                var bluebox = $("<div class= 'col-xl-2 col-md-2 col-sm-2 ml-2 conditions'>")
                var dateBox = $("<h6>");
                dateBox.html(response.list[i].dt_txt);

                console.log(`---Response Array Index ${i} Date`,response.list[i].dt_txt)

                var tempBox = $("<br><span>");
                tempBox.html("Temp: " + response.list[i].main.temp + "°K");
                var humidBox = $("<span>");
                humidBox.html( "<br>" + "Humidity: " + response.list[i].main.humidity + "%" + "<br>")
                var iconBox = $("<i><br>");
                var iconForecast = response.list[0].weather[0].main;

                bluebox.append(dateBox, tempBox, humidBox, iconBox);
                $(".forecastbox").append(bluebox);



                // if function for weather icon
                if (iconForecast === "Clear") {
                    iconBox.addClass("fas fa-sun");
                } else if (iconForecast === "Snow") {
                    iconBox.addClass("fas fa-snowflake");
                } else if (iconForecast === "Rain") {
                    iconBox.addClass("fas fa-cloud-showers-heavy");
                } else if (iconForecast === "Clouds") {
                    iconBox.addClass("fas fa-cloud");
                } else if (iconForecast === "Drizzle") {
                    iconBox.addClass("fas fa-cloud-drizzle");
                }
            }
        }
    }

    // Attempting to dynamically style the UV index display
    function styleUV(uvIndex) {
        if (indexBox.val < 4) {
            $("#uv-index").addClass("bg-primary")
        } else
            if (indexBox.val < 7) {
                $("#uv-index").addClass("bg-warnig")
            } else {
                $("#uv-index").addClass("bg-danger")
            }
    }

     // Saving search history to local storage
    function keepCity(city) {
        if (localStorage.getItem("searchHistory")) {
            var history = JSON.parse(localStorage.getItem("searchHistory"));
            if (history.indexOf(city) === -1) {
                history.push(city);
                localStorage.setItem("searchHistory", JSON.stringify(history));
            }
        } else {
            localStorage.setItem("searchHistory", JSON.stringify([city]));
        }
        searchCityList();
    }

    // Listing the previous searches for reference
    function searchCityList() {
        if (localStorage.getItem("searchHistory")) {
            var cityList = JSON.parse(localStorage.getItem("searchHistory"));
            $(".search-list").empty();
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
