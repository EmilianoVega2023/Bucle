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
