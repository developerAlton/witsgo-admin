// export const serverUrl = 'http://localhost:3000';
// export const clientUrl = 'http://localhost:5001';

// // Production
export const serverUrl = 'https://witsgobackend.azurewebsites.net';
export const clientUrl = 'https://witsgoadmin.azurewebsites.net';

const form = document.querySelector(".form");

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.addEventListener('submit', async (event) => {

    console.log("SUMBIT")
    event.preventDefault(); // Prevent form submission

    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;

    try {
        const response = await axios.post(`${serverUrl}/admin/login`, {
            email: enteredEmail,
            password: enteredPassword
        });

        if (response.status === 200) {
            const token = response.data.accessToken;
            console.log("token", token);
            localStorage.setItem('token', token);
            window.location.href = `${clientUrl}/adminHome.html`;
        }


    } catch (error) {


        if (error.response.status === 401) {
            alert('Invalid email or password');
        } else if (error.response.status === 404) {
            alert('You are not an admin');
        }

        console.log(error.message);

    }
});
