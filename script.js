const apiKey = '6c81306bf421a330fe22495bf41b22f3';
const button = document.getElementById('get-weather');
const cityInput = document.getElementById('city');

button.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Por favor ingresa una ciudad');
  }
});

function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert('Ciudad no encontrada');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error al obtener los datos del clima');
    });
}

function displayWeather(data) {
  document.getElementById('weather').style.display = 'block';

  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp}°C`;
  document.getElementById('humidity').textContent = `Humedad: ${data.main.humidity}%`;
  document.getElementById('wind-speed').textContent = `Viento: ${data.wind.speed} m/s`;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('weather-icon').src = iconUrl;
}
