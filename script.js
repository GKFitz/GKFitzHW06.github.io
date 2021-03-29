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

    $.ajax({
        url:queryURL2,
        method: "GET",
    })
    .then(function(data2){
        for(var i= 1; i< 6; i++){
            var forecastedDays = data2.daily[i];
            console.log(Date.datestring(forecastedDays.dt))

        }
        
    })

    console.log(data)
    
})






