const getWeather = async (lat, lon) => {
  let weather;

  try {
    weather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=wind_speed_10m&hourly=precipitation`
    );
  } catch (error) {
    console.log(error);
  } 

  const weatherData = await weather.json();

  document.querySelector(".info_section").innerHTML = `
          <div class="info">
            <h3>wind</h3>
            <p>${weatherData.hourly.wind_speed_10m[0]} km/h</p>
          </div>
          <div class="info">
            <h3>Temperature</h3>
            <p>${weatherData.current_weather.temperature}°C</p>
          </div>
          <div class="info"> 
            <h3>Precipitation</h3>
            <p>
              ${weatherData.hourly.precipitation[0]}mm
            </p>
          </div>`;
};

function initAutocomplete() {
  let searchInput = document.querySelector("#autocomplete");

  document.addEventListener("DOMContentLoaded", function () {

    // Autocomplete agreaga un campo de texto a la pagina web y monitorea la entrada de caracteres, el servicio de autocompletado con el typo geocode sugiere ubicaciones geograficamente localizables
    let autocomplete = new google.maps.places.Autocomplete(searchInput, {
      types: ["geocode"],
    });

    autocomplete.addListener("place_changed", function () {
      // Pedir la ubicación 
      let place = autocomplete.getPlace();

      // Obtneer las coordenadas de places
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      // Centrar el mapa en la ubicación coordenada
      let coord = { lat: lat, lng: lng };
      let map = new google.maps.Map(document.querySelector("#map"), {
        zoom: 15,
        center: coord,
      });
      getWeather(lat, lng);
    });
  });
}

const initMap = () => {
  let coord = { lat: 4.8087, lng: -75.6906 };
  let map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 15,
    center: coord,
  });
};

initAutocomplete();
initMap();
