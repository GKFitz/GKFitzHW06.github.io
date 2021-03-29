// 
// api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=5a5fc8508fe3901a1ad7e6702d8452ee

console.log("connected")
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=5a5fc8508fe3901a1ad7e6702d8452ee&units=imperial";

// var queryURL2= "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=5a5fc8508fe3901a1ad7e6702d8452ee"

$.ajax({
    url:queryURL,
    method: "GET",
})

.then(function(data){
    var queryURL2= `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=5a5fc8508fe3901a1ad7e6702d8452ee&units=imperial`
    var city = data.name;
    
    $.ajax({
        url:queryURL2,
        method: "GET",
    })
    .then(function(data2){
        var html = "";
        for(var i= 1; i< 6; i++){
            var day = data2.daily[i];
            var forecastedDays = new Date(day.dt * 1000);
            console.log(day)
            var date = forecastedDays.toLocaleDateString();
            //console.log(Date.datestring(forecastedDays.dt))
        }
        //inject HTML into the object. converts the js string into actual HTML elements
        $(".bottom").html(html);
    })

    console.log(data)
    
})








