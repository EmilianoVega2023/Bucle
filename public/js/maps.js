import { Loader } from "@googlemaps/js-api-loader"

// Google Maps initialization
// Nota: Reemplazar las coordenadas con la ubicación real del restaurante
// -31.63815651695578, -60.706691820121726

const loader = new Loader({
    apiKey: "AIzaSyBtq50qdZ1OrvEAGbqDjFv9VjSxJrMdxPk",
    version: "weekly",
    libraries: ["maps", "places"],
  });

  loader.load().then(() => {
    const mapElement = document.getElementById("map");
    const center = { lat: -31.6379119, lng: -60.6615448 };
  
    const map = new google.maps.Map(mapElement, {
      center: center,
      zoom: 14,
    });
  
    new google.maps.Marker({
      map: map,
      position: center,
      title: "Bucle Urban Food",
    });
});