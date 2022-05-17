const setWaeather = (location) =>{
    const queryParams = new URLSearchParams({
        appid: "4b5774e9f3d2a07b84f0f2f88e486224", 
        q: location,
        lang:"ja" 
    });
    const myRequest = new Request("https://api.openweathermap.org/data/2.5/weather?" + queryParams)
    fetch(myRequest)
    .then(response => response.json())
    .then(data => {
        const elementWeatherDescription = document.getElementById("weatherDescription")
        elementWeatherDescription.innerHTML = data.weather[0].description
        const elementWeatherTemp = document.getElementById("weatherTemp")
        const num = data.main.temp - 273.15
        elementWeatherTemp.innerHTML = num.toFixed()
        const elementWeatherHumidity = document.getElementById("weatherHumidity")
        elementWeatherHumidity.innerHTML = data.main.humidity
    })
}
setWaeather("London")
const selector = document.querySelector('#LocationSelect')
selector.addEventListener('change', (event) => {
    const box = document.querySelector('#location')
    const box2 = event.target.value
	setWaeather(box2)
})
