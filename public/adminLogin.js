document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Hard-coded credentials for now
    const correctEmail = 'admin@example.com';
    const correctPassword = 'password123';

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        const enteredEmail = emailInput.value;
        const enteredPassword = passwordInput.value;

        // Check if the entered credentials are correct
        if (enteredEmail === correctEmail && enteredPassword === correctPassword) {
            // Redirect to adminHome.html
            window.location.href = 'adminHome.html';
        } else {
            // Display an error message
            alert('Incorrect email or password. Please try again.');
        }
    });
});
