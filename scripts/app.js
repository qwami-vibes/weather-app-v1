const form = document.querySelector('.form');
const input = document.querySelector('.input');
const tempHolder = document.querySelector('.text-temp');
const cityHolder = document.querySelector('.text-city');
const condition = document.querySelector('.text-condition');
const content = document.querySelector('.second-con');
const time = document.querySelector('.img-holder img');
const icon = document.querySelector('.icon-holder img');
const Forecast = new forecast();

const updateUI = data => {
    console.log(data);
    const { cityDets , weather} = data;

    //Checking the time
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
        time.setAttribute('src', timeSrc)

    //checking for the weather icon
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`
        icon.setAttribute('src', iconSrc);
 
    //Updating the DOM UI 
    cityHolder.innerHTML = `${cityDets.EnglishName}`
    tempHolder.innerHTML = `${weather.Temperature.Metric.Value}`
    condition.innerHTML = `${weather.WeatherText}`

    //Remove the display none
    if(content.classList.contains('disappear')) {
        content.classList.remove('disappear');
    }    
};

form.addEventListener('submit', e => {
    e.preventDefault(); 
    const cityVal = form.cityname.value.trim();
    if(cityVal) {
        form.reset();
        Forecast.updateCity(cityVal)
            .then(data => updateUI(data))
            .catch(err => console.log(err));
    }
    localStorage.setItem('city', cityVal);    
});

if(localStorage.getItem('city')) {
    let stored = localStorage.getItem('city');
    Forecast.updateCity(stored)
        .then(data => updateUI(data))
        .catch(err => console.log(err));   
}