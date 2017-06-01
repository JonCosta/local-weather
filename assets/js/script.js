$(function() {
    
    var TEMP = 0;

    $(".jumbo__button").click(function(event) {
        // event.preventDefault();
        getLocation();
        $("body").css("background-image", 'url("https://s6.postimg.org/xupiuz03j/bg_rainy.jpg")');
    });

    $(".weather__button").click(function() {
        TEMP = (TEMP*9/5) + 32;
        $(".weather__temperature").html(TEMP + "F");
    });
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $(".txtTemp").html("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                APPID: "6bcdb2f0785621d3a6c531e0caf57c5a"
            },
            success: function(data) {
                console.log(data);
                $(".weather__main").html(data.weather[0].main);
                $(".weather__local").html(data.name+ " - "+ data.sys.country);
                TEMP = Math.round(data.main.temp - 273.15);
                $(".weather__temperature").html(TEMP +"° C");
                $(".weather__wind").html(data.wind.speed);
                $(".weather__humidity").html(data.main.humidity);
                $(".weather").show();
            },
            error: function() {
                console.log("Couldn't find the data.");
            }
        })
        $(".txtTemp").html("Latitude: "+ position.coords.latitude +"<br>Longitude: "+ position.coords.longitude);
    }

});

