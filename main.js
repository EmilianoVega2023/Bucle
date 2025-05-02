import { Loader } from "@googlemaps/js-api-loader"

// Google Maps initialization
// Nota: Reemplazar las coordenadas con la ubicación real del restaurante
// -31.63815651695578, -60.706691820121726

const loader = new Loader({
    apiKey: "AIzaSyBtq50qdZ1OrvEAGbqDjFv9VjSxJrMdxPk",
    version: "weekly",
    libraries: ["maps", "places"],
  });
  
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const mapElement = document.getElementById("map");

  if (mapElement) {
    const map = new Map(mapElement, {
      center: restaurantLocation,
      zoom: 45, // Ajusta el zoom como necesites
      mapId: "center: { lat: -31.637911932373047, lng: -60.661544799805 }" // Puedes crear un Map ID en Google Cloud Console para personalizar estilos
      // Si no usas Map ID, puedes definir estilos directamente aquí:
      //styles: [ { elementType: "geometry", stylers: [{"color": "#242f3e"}] }, ... ] 
    });

    // Crea el marcador avanzado
    new AdvancedMarkerElement({
      map: map,
      position: location-reservation.map ,
      title: 'Bucle Urban Food' // Título que aparece al pasar el mouse
    });

  } else {
    console.error("Elemento #map no encontrado en el DOM.");
  }
  
    map = new Map(document.getElementById("map"), {
      center: { lat: -31.637911932373047, lng: -60.661544799805 },
      zoom: 45,
    });
  });
  loader
  .importLibrary('maps')
  .then(({Map}) => {
    new Map(document.getElementById("map"), mapOptions);
  })
  .catch((e) => {
    console.error("Error al cargar Google Maps API:", e);
});
// Smooth scroll function
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Navigation functions
function scrollToMenu() {
    smoothScroll('#menu');
}

function scrollToReserve() {
    smoothScroll('#location-reservation');
}

// Reservation form handling with validation
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        pedido: document.getElementById('pedido').value
    };
    
    // Validate the data
    if (!validateReservation(formData)) {
        return; // Stop if validation fails
    }
    
    // Store the data in localStorage for demonstration purposes
    saveReservationLocal(formData);
    
    // In a real application, you would send this data to your server
    // sendReservationToServer(formData);
    
    console.log('Reservation data:', formData);
    alert('¡Gracias por tu reserva! Te contactaremos pronto.');
    this.reset();
});

// Validation function
function validateReservation(data) {
    // Validate name (between 1 and 20 characters)
    if (!data.name || data.name.trim().length < 1 || data.name.trim().length > 50) {
        alert('Por favor ingresa un nombre válido (entre 1 y 50 caracteres)');
        return false;
    }
    
    // Validate email (basic format validation)
    if (!data.email || !isValidEmail(data.email)) {
        alert('Por favor ingresa un email válido');
        return false;
    }
    
    // Validate date (must not be empty)
    if (!data.date) {
        alert('Por favor selecciona una fecha');
        return false;
    }
    
    // Validate time (must not be empty)
    if (!data.time) {
        alert('Por favor selecciona una hora');
        return false;
    }
    
    // Validate people count (must be a number between 1 and 20)
    const peopleCount = parseInt(data.people);
    if (isNaN(peopleCount) || peopleCount < 1 || peopleCount > 20) {
        alert('Por favor selecciona un número válido de personas (entre 1 y 20)');
        return false;
    }
    
    return true;
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to save reservation data in localStorage
function saveReservationLocal(data) {
    try {
        // Get existing reservations or create empty array
        const existingReservations = JSON.parse(localStorage.getItem('restaurantReservations')) || [];
        
        // Add timestamp and reservation ID
        const reservation = {
            ...data,
            id: Date.now().toString(),
            timestamp: new Date().toISOString()
        };
        
        // Add to existing reservations
        existingReservations.push(reservation);
        
        // Save back to localStorage
        localStorage.setItem('restaurantReservations', JSON.stringify(existingReservations));
        
        console.log('Reservation saved locally');
    } catch (error) {
        console.error('Error saving reservation locally:', error);
    }
}
// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px 100px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        imageObserver.observe(img);
    });
});