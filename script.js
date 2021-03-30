// 
// api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=5a5fc8508fe3901a1ad7e6702d8452ee
var searchBox= document.getElementById("searchBox");
var searchBtn= document.getElementById("searchBtn");

var savedCities= JSON.parse(localStorage.getItem("savedCities")) || [];

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var citySearch= searchBox.value;
    savedCities.push(citySearch);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
    console.log(citySearch);
    searchCity(citySearch);
    // searchList(citySearch);
})
function searchList() {
    for(var i= 0; i < savedCities.length; i++){
        var htmlList = `<a class="list-group-item list-group-item-action" href="#list-item-1"> ${savedCities[i]}</a>`;
        $("#search-history").html(htmlList);
    }

}

function searchCity(citySearch) {



var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=5a5fc8508fe3901a1ad7e6702d8452ee&units=imperial";

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
        var today = data2.daily[0];
        console.log(today)
        var currentDate = (new Date(today.dt * 1000)).toLocaleDateString();
        var currentHumidity = today.humidity;
        var currentTemp= today.temp.day;
        var currentIcon= today.weather[0].icon;
        var uvi = today.uvi;
        var windSpeed = today.wind_speed;
        //use the class uvi created in the html to target the uvi with a backgroud color system in the css. the color coding is based on the EPA UV color scale
        var uviClass;
        if (uvi < 3) {
            uviClass= "low";
        }else if(uvi < 6) {
           uviClass= "moderate"; 
        }else if(uvi < 8) {
            uviClass= "high"; 
        }else if(uvi < 11) {
            uviClass= "veryHigh";
        } else {
            uviClass= "extreme";
        }
        console.log("uvi");
        var todayHTML = `
            <h2>${city}, ${currentDate} <img src="https://openweathermap.org/img/wn/${currentIcon}@2x.png"></h2>
            <p>Temp: ${currentTemp}&deg;F</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p>Wind Speed: ${windSpeed} MPH</p>
            <p>UV Index:<span class= "${uviClass} uvi" >${uvi}</span></p>
        `;
        $(".top").html(todayHTML);
        
        
        var html = "";
        for(var i= 1; i< 6; i++){
            var day = data2.daily[i];
            var forecastedDays = new Date(day.dt * 1000);
            console.log(day)
            var date = forecastedDays.toLocaleDateString();
            var humidity = day.humidity;
            var temp= day.temp.day;
            var icon= day.weather[0].icon;
            html +=`
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
        //inject HTML into the object. converts the js string into actual HTML elements targets the bottom container in the index.html
        $(".bottom").html(html);
    })

    console.log(data)
    
})
}
$( document ).ready(function() {
    searchList();
});










