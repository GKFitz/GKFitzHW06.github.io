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
            var humidity = day.humidity;
            var temp= day.temp.day;
            var icon= day.weather[0].icon;
            html =`
            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">${date}</div>
            <div class="card-body">
              <h5 class="card-title"><img src="https://openweathermap.org/img/w/${icon}.png"><h5>
              <p class="card-text">Temp: ${temp}&deg;F</p>
              <p class="card-text">Humidity: ${humidity}%</p>
            </div>
            </div>`;
            
            //console.log(Date.datestring(forecastedDays.dt))
        }
        //inject HTML into the object. converts the js string into actual HTML elements
        $(".bottom").html(html);
    })

    console.log(data)
    
})








