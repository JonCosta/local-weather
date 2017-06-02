$(function() {
    
    // Tempreature Object that will hold the value and its metric
    var TEMP = {
        mode: "C",
        val: 0
    };

    // Initiates the main function
    $(".jumbo__button").click(function() {
        var $this = $(this);
        $this.button('loading');
        getLocation();
        $("body").css("background-image", 'url("https://s6.postimg.org/xupiuz03j/bg_rainy.jpg")');
    });

    // Toggles the temperature unit between Celius and Fahrenheit
    $(".weather__button").click(function() {
        if (TEMP.mode == 'C') {
            TEMP.mode = 'F';
            TEMP.val = (TEMP.val * 9/5) + 32;
            $(".temperature__val").html(TEMP.val +"F");
        } else {
            TEMP.mode = 'C';
            TEMP.val = (TEMP.val - 32) * 5/9;
            $(".temperature__val").html(TEMP.val +"°C");            
        }
    });
    
    // Obtains the user's location through the browser
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather);
        } else {
            $(".txtTemp").html("Geolocation is not supported by this browser.");
        }
    }

    // Uses the user's coordinates to send a request to the weather API
    function getWeather(position) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                APPID: "6bcdb2f0785621d3a6c531e0caf57c5a"
            },
            success: function(data) {
                // console.log(data);
                $(".weather__main").html(data.weather[0].main);
                $(".weather__local").html(data.name+ " - "+ data.sys.country);
                // The temperature comes in Kelvin, so we convert to Celsius before showing
                TEMP.val = Math.round(data.main.temp - 273.15);
                $(".temperature__val").html(TEMP.val +"° C");
                $(".weather__wind").html(data.wind.speed);
                $(".weather__humidity").html(data.main.humidity);
                $(".weather").show();
                $(".jumbo__button").button('reset');
            },
            error: function() {
                console.log("Couldn't find the data.");
            }
        })
        $(".txtTemp").html("Latitude: "+ position.coords.latitude +"<br>Longitude: "+ position.coords.longitude);
    }

});

