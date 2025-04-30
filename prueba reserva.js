// Reservation form handling with validation
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