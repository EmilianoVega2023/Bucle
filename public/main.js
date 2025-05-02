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

fetch('http://localhost:5173/api/reservations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    console.log('Reserva enviada al servidor:', data);
    alert('¡Gracias por tu reserva! Te contactaremos pronto.');
    document.getElementById('reservationForm').reset();
})
.catch(error => {
    console.error('Error al enviar la reserva:', error);
    alert('Hubo un error al enviar la reserva.');
});
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