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
        
        var key = "e9f9dec3547457cf5b5704dc6cb080be";

        $.ajax({
            url: "https://api.darksky.net/forecast/"+key+"/"+position.coords.latitude+","+position.coords.longitude,
            dataType: "jsonp",
            success: function(data) {
                console.log(data);
                // The temperature comes in Fahrenheit, so we convert to Celsius before showing
                TEMP.val = Math.round(data.currently.temperature);
                $(".temperature__val").html(TEMP.val +"F");
                $(".weather__wind").html(data.currently.windSpeed +" Miles/Hour");
                $(".weather__humidity").html(data.currently.humidity);
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

