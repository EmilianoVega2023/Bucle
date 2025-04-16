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

// Google Maps initialization
// Nota: Reemplazar las coordenadas con la ubicación real del restaurante
function initMap() {
    const restaurantLocation = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: restaurantLocation,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#242f3e"}]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#746855"}]
            }
        ]
    });

    new google.maps.Marker({
        position: restaurantLocation,
        map: map,
        title: 'Bucle Restaurant'
    });
}

// Reservation form handling
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    // Aquí puedes agregar la lógica para manejar la reserva
    // Por ejemplo, enviar a un servidor o almacenar localmente
    console.log('Reservation data:', formData);
    alert('¡Gracias por tu reserva! Te contactaremos pronto.');
    this.reset();
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