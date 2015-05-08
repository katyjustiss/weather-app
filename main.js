var URL_API = 'http://api.wunderground.com/api/71c3721d8ea32bc3/geolookup/conditions/forecast10day/q/';
var button1 = document.querySelector('.zip');
var button2 = document.querySelector('.location');
var cells = document.querySelectorAll('td');
cells =[].slice.call(cells);

//added functionality to the buttons
button1.addEventListener('click', function (event) {
  var zipcode = document.querySelector("input").value;
  var URL = URL_API + zipcode + '.json';

getJSON(URL, currentInfo);

  /*var span = document.querySelector('.temp');
  span.innerHTML = "The temperature is: " + data.current_observation.temp_f + "ºF";
	});*/
});

button2.addEventListener('click', function (event) {
 navigator.geolocation.getCurrentPosition(function(location) {
   var lat = location.coords.latitude;
   var long = location.coords.longitude;
   var URL = URL_API + lat + "," + long + '.json';

 getJSON(URL, currentInfo);
 /*{
   var span = document.querySelector('.temp');
  span.innerHTML = "The temperature is: " + data.current_observation.temp_f + "ºF";
   });*/
  });
 });

//currentInfo function. Call at the end of the button events.
function currentInfo(data) {
  var currentCity = data.current_observation.display_location.city;
  var showCurrentCity = document.querySelector('h4');
  showCurrentCity.innerHTML = currentCity;

  var currentTemp = data.current_observation.temp_f;
  var showCurrentTemp = document.querySelector('h3');
  showCurrentTemp.innerHTML = currentTemp + 'ºF';

  var currentIcon = data.current_observation.icon_url;
  var showCurrentIcon = document.querySelector('.current-icon');
  showCurrentIcon.innerHTML = '<img src="' + currentIcon + '">';

//Five day forcast. Thought if I looped through the tds, I could populate the info.

for (var i = 0; i < cells.length; i++) {
  var html = '';
  var weekDay = data.forecast.simpleforecast.forecastday[i].date.weekday;
  html += '<p>' + weekDay + '</p>';
  var highTemp = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
  html += '<h2>' + highTemp + 'ºF</h2>';
  var image = data.forecast.simpleforecast.forecastday[i].icon_url;
  html += '<img src="' + image + '">';
  var lowTemp = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
  html += '<h2>' + lowTemp + 'ºF</h2>';
  cells[i].innerHTML = html;
  }
};

//Page load AutoIP Address Location
window.onload = function() {
  var URL = URL_API + 'autoip.json';
  getJSON(URL, currentInfo)
}

//Need to add an if else clause if they enter something that isn't a zipcode.
/* if (data.current_observation is falsy)
  else
  continue on.
  */

//AJAX function
function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  xhr.send();
}
