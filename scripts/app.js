//DOM Manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = data => {

     console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    //**destructure properties from objects 
    //**(replaces above) and stores in constant of same name
    const { cityDets, weather } = data;

    

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update teh night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // const result = condition ? 'value 1' : 'value 2';
    // console.log(result);
    //let timeSrc line Same as below using above condition;^
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // if(weather.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);

    //remove the d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};




// const updateCity = async (city) => {
//     //call to get city and pass city value
//     //call city weather
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);

//     return {
//         cityDets, //cityDets: cityDets same thing
//         weather //weather: weather same thing
//     };
// };



cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

//last city searched stays on reload
if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}