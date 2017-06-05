$(function() {
    
    // Tempreature Object that will hold the value and its metric
    var TEMP = {
        mode: "F",
        val: 0
    };

    // Initiates the main function
    $(".jumbo__button").click(function() {
        var $this = $(this);
        $this.button('loading');
        getLocation();
    });

    // Toggles the temperature unit between Celius and Fahrenheit
    $(".weather__span").click(function() {
        if (TEMP.mode == 'C') {
            TEMP.mode = 'F';
            TEMP.val = Math.round((TEMP.val * 9/5) + 32);
            $(".temperature__val").html(TEMP.val +"F");
            $(this).html("°C");
        } else {
            TEMP.mode = 'C';
            TEMP.val = Math.round((TEMP.val - 32) * 5/9);
            $(".temperature__val").html(TEMP.val +"°C");
            $(this).html("F");
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
        
        var key = "e9f9dec3547457cf5b5704dc6cb080be";

        $.ajax({
            url: "https://api.darksky.net/forecast/"+key+"/"+position.coords.latitude+","+position.coords.longitude,
            dataType: "jsonp",
            success: function(data) {
                // console.log(data);
                // The temperature comes in Fahrenheit, so we convert to Celsius before showing
                TEMP.val = Math.round(data.currently.temperature);
                $(".temperature__val").html(TEMP.val +"F");
                // Set the other weather values
                $(".weather__rain").html(data.currently.precipProbability * 100 +"%");
                $(".weather__wind").html(data.currently.windSpeed +" mi/h");
                $(".weather__humidity").html(data.currently.humidity * 100 +"%");
                // Change the background to match the weather
                changeWeatherBackground(data.currently.icon);
                // Initiate the Skycons lib to generate the weather icon
                var skycons = new Skycons({"color": "white"});
                skycons.add("temperature__icon", data.currently.icon);
                skycons.play();
                // Remove the height:100% attribute so the background can match
                $("html, body").removeClass("total-height");
                $(".weather").show();
                $(".jumbo__button").button('reset');        
            },
            error: function() {
                console.log("Couldn't find the data.");
                $(".jumbo__button").button('reset');        
            }
        });
    }

    // 
    function changeWeatherBackground(weather) {
        
        switch(weather) {
            case "clear-day":
                var bgUrl = "url(https://s6.postimg.org/fcl6aqibl/bg_clear.jpg)";
                break;
            case "clear-night":
                var bgUrl = "url(https://s6.postimg.org/w2oabbzup/bg-clear-night.jpg)";
                break;
            case "rain":
                var bgUrl = "url(https://s6.postimg.org/s6j842vr5/bg_rainy.jpg)";
                break;
            case "snow":
                var bgUrl = "url(https://s6.postimg.org/82zls13r5/bg_snowy.jpg)";
                break;
            case "wind":
                var bgUrl = "url(https://s6.postimg.org/dqxmu6r7l/bg-wind.jpg)";
                break;
            case "fog":
                var bgUrl = "url(https://s6.postimg.org/r6knjmzpd/bg-fog.jpg)";
                break;
            case "cloudy":
                var bgUrl = "url(https://s6.postimg.org/p0qcp4w8x/bg-cloud.jpg)";
                break;
            case "partly-cloudy-day":
            case "partly-cloudy-night":
                var bgUrl = "url(https://s6.postimg.org/xmtm9q88x/bg-partly-cloud.jpg)";
                break;
            default:
                var bgUrl = "url(https://s6.postimg.org/x3wsp6xq9/bg_default.jpg)";
        }
        $("body").css("background-image", bgUrl);
    }

});
