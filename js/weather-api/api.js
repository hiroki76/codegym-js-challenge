const setWaeather = (location) => {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather?')
    const queryParams = new URLSearchParams({
        appid: "4b5774e9f3d2a07b84f0f2f88e486224", 
        q: location,
        lang:"ja" 
    })
    const request = new Request(url + queryParams)
    fetch(request)
    .then((response) => {
        if (!response.ok) {
            console.error('サーバーエラー')
        }
        return response.json()
    })
    .catch(error => {
        console.error('通信に失敗しました', error)
    })
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
    const location = event.target.value
    setWaeather(location)
})
