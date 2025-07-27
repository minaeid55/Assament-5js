var input = document.querySelector('.location');
var links = document.querySelectorAll('.collapse ul li a');
var result;
var arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
// input='cairo';
change('cairo');

input.addEventListener('keyup', function () {
  if (input.value !== '') {
    change(input.value);
  }
});
async function change(inp) {
  var req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2e6780305c7f45b6a57141514252607&q=${inp}&days=3`);
  result = await req.json();
  console.log(result);
  document.querySelector('.results .row').innerHTML =
    `
            <div class="col-lg-4  col p-0">
            <div class="title px-2 ">
              <p class=" float-start my-2 day">${dayName(result.forecast.forecastday[0].date)}</p>
              <p class=" float-end my-2 date">${getday(result.forecast.forecastday[0].date)} <span>${getMonth(result.forecast.forecastday[0].date)}</span></p>
              <p class="clearfix"></p>
            </div>
            <div class="inner p-4 pt-3">
              <h2 class="fs-4 mb-3">${result.location.name}</h2>
              <span class="display-1 fw-bolder text-white">${result.current.temp_c}<sup>o</sup>C</span>
              <img src="${result.current.condition.icon}" class="w-25 mb-4" alt="sunny">
              <p class="text-info mb-3">${result.current.condition.text}</p>
              <ul class="details d-flex gap-4 p-0 mt-2">
                <li><img src="./images/icon-umberella.png" alt="icon-umberella"> ${result.current.humidity}%</li>
                <li><img src="./images/icon-wind.png" alt="icon-wind"> ${result.current.wind_kph}km/h</li>
                <li><img src="./images/icon-compass.png" alt="icon-compass"> ${result.current.wind_dir}</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4  col2 p-0">
            <p class=" title text-center py-2 day">${dayName(result.forecast.forecastday[1].date)}</p>
            <div class="inner p-3 pt-3 text-center ">
              <img src="${result.forecast.forecastday[1].day.condition.icon}" class="mb-4 mt-4" alt="sunny">
              <h4 class="text-white">${result.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h3>
                <p>${result.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                <p class="text-info mb-3">${result.forecast.forecastday[1].day.condition.text}</p>
            </div>
          </div>
          <div class="col-lg-4  col p-0">
            <p class=" title text-center py-2 day">${dayName(result.forecast.forecastday[2].date)}</p>
            <div class="inner p-3 pt-0 text-center ">
              <img src="${result.forecast.forecastday[2].day.condition.icon}" class="mb-4 mt-4" alt="sunny">
              <h4 class="text-white">${result.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h3>
                <p>${result.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                <p class="text-info mb-3">${result.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>
`
};

//to get name of day
function dayName(time) {

  var date = new Date(time);
  return arr[date.getDay()];
}


//to get number of date
function getday(time) {
  var date = new Date(time);
  return date.getDate();
}


//to get name of month
function getMonth(time) {
  var date = new Date(time);
  return months[date.getMonth()];
}



//to press the link to create datted border
document.addEventListener('click', function (e) {
  if (e.target.tagName == 'A') {
    for (var i = 0; i < links.length; i++) {
      if (links[i] == e.target) {
        e.target.classList.add('click');
      }
      else {
        links[i].classList.remove('click');
      }
    }
  }
  else {
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('click');
    }
  }
});
