
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
    fetch('http://localhost:3000/api/reservations', {
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
    
});

