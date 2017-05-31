$(function() {
    
    $(".btnGetWeather").click(function(event) {
        // event.preventDefault();
        getLocation();
        $("body").css("background-image", 'url("./assets/img/bg-sunny.jpg")');
    });
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $(".txtTemp").html("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        $(".txtTemp").html("Latitude: "+ position.coords.latitude +"<br>Longitude: "+ position.coords.longitude);
    }

});

