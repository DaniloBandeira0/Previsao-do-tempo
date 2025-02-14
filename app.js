function getWeather() {
    let city = document.getElementById("city").value;
    let url = `https://goweather.herokuapp.com/weather/${city}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.temperature) { // Verifica se os dados foram retornados corretamente
            let temp = data.temperature;
            let wind = data.wind;
            let description = data.description;
            let forecast = data.forecast; // Previsão para os próximos dias

            // Atualiza a exibição do tempo
            document.getElementById("weatherResult").innerHTML = `
                <h3>${city.toUpperCase()}</h3>
                <h4>${temp}</h4>
                <p class="weather-info">${description}</p>

                <div class="details">
                    <div>
                        <p>💨 Vento</p>
                        <p>${wind}</p>
                    </div>
                </div>

                <h5 class="forecast-title">📅 Previsão para os próximos dias:</h5>
                <div class="forecast-container">
                    ${forecast.map(day => `
                        <div class="forecast-card">
                            <p class="forecast-day">${day.day}</p>
                            <p class="forecast-temp">🌡️ ${day.temperature}</p>
                            <p class="forecast-wind">💨 ${day.wind}</p>
                        </div>
                    `).join('')}
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
