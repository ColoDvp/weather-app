// Define la clave de la API para acceder al servicio de OpenWeatherMap
const apikey = "c922cbcb81621e7e17d71b7f307b7ffe";

// Obtiene el elemento del DOM donde se mostrará la información del clima
const weatherDataEl = document.getElementById("weather-data");

// Obtiene el elemento del DOM donde el usuario ingresará el nombre de la ciudad
const cityInputEl = document.getElementById("city-input");

// Obtiene el formulario del DOM
const formEl = document.querySelector("form");

// Añade un evento al formulario que se ejecuta cuando se envía
formEl.addEventListener("submit", (event) => {
    // Previene el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();
    // Obtiene el valor ingresado en el campo de la ciudad
    const cityValue = cityInputEl.value;
    // Llama a la función para obtener los datos del clima de la ciudad ingresada
    getWeatherData(cityValue);
});

// Función asíncrona para obtener los datos del clima de una ciudad
async function getWeatherData(cityValue) {
    try {
        // Realiza una solicitud a la API de OpenWeatherMap con la ciudad ingresada
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&cnt=10&mode=json&units=metric&appid=${apikey}`);
        
        // Verifica si la respuesta de la API es correcta
        if (!response.ok) {
            // Si no es correcta, lanza un error
            throw new Error("Network response was not ok");
        }
        // Convierte la respuesta de la API a formato JSON
        const data = await response.json();

        // Redondea la temperatura obtenida de los datos
        const temperature = Math.round(data.main.temp);

        // Obtiene la descripción del clima
        const weatherDescription = data.weather[0].description;

        // Obtiene el ícono del clima
        const icon = data.weather[0].icon;

        // Crea un array con detalles adicionales del clima
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ];

        // Actualiza el ícono del clima en el DOM
        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;

        // Actualiza la temperatura en el DOM
        weatherDataEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}°C`;

        // Actualiza la descripción del clima en el DOM, capitalizando la primera letra
        weatherDataEl.querySelector(
            ".description"
        ).textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        // Actualiza los detalles adicionales del clima en el DOM
        weatherDataEl.querySelector(
            ".details"
        ).innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

    } catch (error) {
        // Muestra un mensaje de error en la consola si ocurre un error durante la solicitud
        console.error("Fetch error: ", error);
    }
}