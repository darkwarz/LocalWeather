/*global $ navigator position APIKEY*/


$(document).ready(function() {
    //get lat and lon - location using js
    var lat;
    var long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
    
            $.ajax({
                method: "GET",
                url: "https://api.openweathermap.org/data/2.5/weather",
                data: { lat: lat, lon: long, units: "imperial", appid: APIKEY },
                success: function weatherData(data) {
                    
                    $("#city").text(data.name);
                    $("#current").text(data.weather[0].main);
                    
                    document.getElementById("temp").innerHTML = (data.main.temp) + " degrees F";
                    document.getElementById("wind").innerHTML = (data.wind.speed) + " MPH";
                    document.getElementById("icon").src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

                    $("#c").click(function() { // jQuery used to convert temp to C
                        
                        var f = data.main.temp;
                        var c = (f - 32) * 0.5556;
                        var celsiusRounded = Number((c).toFixed(2)); // makes it so decimal X.xx
                       
                        document.getElementById("temp").innerHTML = celsiusRounded + " degrees C"; //sends result to div
                      
                        $("#f").click(function() { //onClick function uses jQuery to change temp back to Fahrenheit
                            var f = data.main.temp;
                            document.getElementById("temp").innerHTML = f + " degrees F";
                        });
                    });
                }

            });
        });
    }
});
