
var searchBox= document.getElementById("searchBox");
var searchBtn= document.getElementById("searchBtn");
var citiesFromLS= localStorage.getItem("savedCities");
//ternary expression: if citiesFromLS exists, do a JSON.parse, if not return an the empty array
var savedCities= citiesFromLS ? JSON.parse(citiesFromLS):[];

//Put a script defer in the Html so I can use this.This conditional makes the last search item present, or in this case the first in the saved cities array, will produce its search result even when the user refreshes the app. the .focus() puts the cursor automatically in the search box for searching
searchBox.focus();
if(savedCities[0]) {
    searchCity(savedCities[0]);
}

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    var citySearch= searchBox.value;
    console.log(citySearch);
    searchCity(citySearch);

    searchBox.value= "";
    searchBox.focus();
    
})

$(".clearSearch").on("click", function(event){
    localStorage.clear();
    //this will renew the empty array
    savedCities = [];
    searchList();
    //this puts the cursor bakc into the 
    searchBox.focus();
})

function searchList() {
    var htmlList= "";
    for(var i= 0; i < savedCities.length; i++){
        htmlList += `<a class="list-group-item list-group-item-action" href="#list-item-1"> ${savedCities[i]}</a>`;
       
        
    }
    $(".searchHistory").html(htmlList);
    var buttons = $(".searchHistory a" );
    $.each(buttons, function(index, button){
        $(button).on("click", function(){
            searchCity($(this).text());
        })

    });
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
    //This conditional was put here to take advantage of the city variable, which pulls the city name straight from the API data, unshift() adds the most recent city search to the top of the list( rather than push which puts it at the bottom) and then it saves it to local storage.
    if(!savedCities.includes(city)){
        savedCities.unshift(city);
        localStorage.setItem("savedCities", JSON.stringify(savedCities));
        searchList();
    }
    
   
    
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
            <h3>${city}, ${currentDate} <img src="https://openweathermap.org/img/wn/${currentIcon}@2x.png"></h3>
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
            <div class="card text-white bg-primary mb-3 forecastCard" style="max-width: 18rem;">
            <div class="card-header">${date}</div>
            <div class="card-body">
              <h5 class="card-title"><img src="https://openweathermap.org/img/w/${icon}.png"><h5>
              <p class="card-text">Temp: ${temp}&deg;F</p>
              <p class="card-text">Humidity: ${humidity}%</p>
            </div>
            </div>`;
            
            
        }
        //inject HTML into the object. converts the js string into actual HTML elements targets the bottom container in the index.html
        $(".bottom").html(html);
    })

    
    
})
}
searchList();











