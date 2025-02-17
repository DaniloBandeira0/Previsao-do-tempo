function getWeather() {
    let city = document.getElementById("city").value;
    let url = `https://goweather.herokuapp.com/weather/${city}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.temperature) { 
            let temp = data.temperature;
            let wind = data.wind;
            let description = translateWeatherDescription(data.description);
            let weatherIcon = getWeatherIcon(description);

            document.getElementById("weatherResult").innerHTML = `
                <h3>${city.toUpperCase()}</h3>
                <h4>${weatherIcon} ${temp}</h4>
                <p class="weather-info">${description}</p>

                <div class="details">
                    <div>
                        <p>💨 Vento</p>
                        <p>${wind}</p>
                    </div>
                </div>

                <h5 class="forecast-title">📅 Previsão para os próximos dias:</h5>
                <div class="forecast-container">
                    ${data.forecast.map(day => {
                        let translatedDay = translateDay(day.day);
                        let dayDescription = predictWeatherCondition(day.temperature, day.wind);
                        let dayIcon = getWeatherIcon(dayDescription);

                        return `
                            <div class="forecast-card">
                                <p class="forecast-day">${translatedDay}</p>
                                <p class="forecast-icon">${dayIcon}</p>
                                <p class="weather-info">${dayDescription}</p>
                                <p class="forecast-temp">🌡️ ${day.temperature}</p>
                                <p class="forecast-wind">💨 ${day.wind}</p>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            document.getElementById("weatherResult").classList.add("fade-in");

            // Atualiza o fundo de acordo com o clima
            updateBackground(description);
        } else {
            document.getElementById("weatherResult").innerHTML = `<p class="text-danger">Cidade não encontrada!</p>`;
        }
    })
    .catch(error => console.log(error));
}

// 🔄 Função para traduzir a descrição do clima
function translateWeatherDescription(description) {
    if (!description) return "Desconhecido";

    description = description.toLowerCase();
    
    const translations = {
        "clear": "Céu limpo ☀️",
        "sunny": "Ensolarado ☀️",
        "cloudy": "Nublado ☁️",
        "partly cloudy": "Parcialmente nublado ⛅",
        "rain": "Chuva 🌧️",
        "light rain": "Chuva leve 🌦️",
        "heavy rain": "Chuva forte ⛈️",
        "storm": "Tempestade ⛈️",
        "thunderstorm": "Trovoadas ⛈️",
        "snow": "Neve ❄️",
        "fog": "Nevoeiro 🌫️",
        "mist": "Neblina 🌫️",
        "windy": "Ventania 💨"
    };

    return translations[description] || "Condição desconhecida 🌍";
}

// 🔄 Função para traduzir os dias da semana
function translateDay(day) {
    const days = {
        "Monday": "Segunda-feira",
        "Tuesday": "Terça-feira",
        "Wednesday": "Quarta-feira",
        "Thursday": "Quinta-feira",
        "Friday": "Sexta-feira",
        "Saturday": "Sábado",
        "Sunday": "Domingo"
    };

    return days[day] || day;
}

// 🔄 Função para prever o tempo baseado na temperatura e vento
function predictWeatherCondition(temperature, wind) {
    let tempNumber = parseInt(temperature.replace("°C", "").trim());
    let windNumber = parseInt(wind.replace("km/h", "").trim());

    if (tempNumber > 30 && windNumber < 10) return "Ensolarado ☀️";
    if (tempNumber >= 20 && tempNumber <= 30 && windNumber >= 10) return "Parcialmente nublado ⛅";
    if (tempNumber < 20 && windNumber >= 15) return "Nublado ☁️";
    if (tempNumber < 25 && windNumber > 20) return "Chuva leve 🌦️";
    if (tempNumber < 20 && windNumber > 25) return "Tempestade ⛈️";
    return "Desconhecido 🌍";
}

// 🔄 Função para exibir ícones do clima corretamente
function getWeatherIcon(description) {
    if (!description) return "🌍";

    description = description.toLowerCase();

    if (description.includes("sol") || description.includes("limpo")) return "☀️";
    if (description.includes("nublado")) return "☁️";
    if (description.includes("chuva")) return "🌧️";
    if (description.includes("tempestade") || description.includes("trovoadas")) return "⛈️";
    if (description.includes("neve")) return "❄️";
    if (description.includes("neblina") || description.includes("nevoeiro")) return "🌫️";
    return "🌍";
}
