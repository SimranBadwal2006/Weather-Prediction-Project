const apiKey = "f64cd5509dbf4c3690d62404251510";

function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("result");
  const errorP = document.getElementById("error");

  if (!location) {
    errorP.textContent = "Please enter a location.";
    errorP.classList.remove("hidden");
    resultDiv.classList.add("hidden");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found.");
      }
      return response.json();
    })
    .then(data => {
      const cityName = data.location.name;
      const temperature = data.current.temp_c;
      const condition = data.current.condition.text;

      document.getElementById("locationName").textContent = cityName;
      document.getElementById("temperature").textContent = temperature;
      document.getElementById("condition").textContent = condition;

      resultDiv.classList.remove("hidden");
      errorP.classList.add("hidden");
    })
    .catch(err => {
      errorP.textContent = err.message;
      errorP.classList.remove("hidden");
      resultDiv.classList.add("hidden");
    });
}
