import { Loader } from "@googlemaps/js-api-loader"

// Google Maps initialization
const loader = new Loader({
    apiKey: "YOUR_API_KEY", // Replace with your actual API key
    version: "weekly",
    libraries: ["maps", "places"],
});

loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const mapElement = document.getElementById("map");

    if (mapElement) {
        const map = new Map(mapElement, {
            center: { lat: -31.637911932373047, lng: -60.661544799805 }, // Replace with your restaurant's coordinates
            zoom: 15, // Adjust zoom level
            // mapId: "YOUR_MAP_ID" // Optional: Replace with your Map ID
        });

        new AdvancedMarkerElement({
            map: map,
            position: { lat: -31.637911932373047, lng: -60.661544799805 }, // Replace with your restaurant's coordinates
            title: 'Bucle Urban Food'
        });
    } else {
        console.error("Elemento #map no encontrado en el DOM.");
    }
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

// Reservation form handling with validation and fetch
document.addEventListener('DOMContentLoaded', function() { // Ensure DOM is loaded
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data
            const formData = {
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                people: document.getElementById('people').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value
            };

            // Validate the data (client-side - optional but good for UX)
            if (!validateReservation(formData)) {
                return; // Stop if client-side validation fails
            }

            // Send data to the server using fetch
            fetch('http://localhost:3000/api/reservations', { // CORRECTED URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => { // Parse JSON error response
                        throw new Error(errorData.message || 'Error al guardar la reserva.');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Reserva exitosa:', data);
                alert(data.message); // Show success message from server
                reservationForm.reset();
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert('Error al conectar con el servidor o al procesar la reserva: ' + error.message);
            });
        });
    }
});


// Validation function (client-side)
function validateReservation(data) {
    if (!data.name || data.name.trim().length < 1 || data.name.trim().length > 50) {
        alert('Por favor ingresa un nombre válido (entre 1 y 50 caracteres)');
        return false;
    }
    if (!data.email || !isValidEmail(data.email)) {
        alert('Por favor ingresa un email válido');
        return false;
    }
    if (!data.date) {
        alert('Por favor selecciona una fecha');
        return false;
    }
    if (!data.time) {
        alert('Por favor selecciona una hora');
        return false;
    }
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