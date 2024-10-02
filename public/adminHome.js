const baseURL = "https://witsgobackend.azurewebsites.net/";
// const baseURL = "http://localhost:3000/";

async function getRentalData() {
    let endpoint = "v1/rental/rentals";
    let url = baseURL + endpoint;

    try {
        const response = await axios.get(url);
        console.log(response.data);
        // Call displayRentalData with the rental_logs
        displayRentalData(response.data.rental_logs);
    } catch (error) {
        console.error(error);
    }

}

function displayRentalData(rentalData) {
    // Select the element with id 'logs'
    const overviewSection = document.querySelector('#logs');
    
    // Clear existing content
    overviewSection.innerHTML = '';

    // Create a table to display the data
    const table = document.createElement('table');
    table.classList.add('rental-table');

    // Create table headers
    const headers = ['Email', 'First Name', 'Last Name', 'Vehicle Type', 'Station Name', 'Rented At', 'Returned At'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate table rows with rental data
    rentalData.forEach(rental => {
        const row = document.createElement('tr');

        const emailCell = document.createElement('td');
        emailCell.textContent = rental.email;
        row.appendChild(emailCell);

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = rental.first_name;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = rental.last_name;
        row.appendChild(lastNameCell);

        const vehicleTypeCell = document.createElement('td');
        vehicleTypeCell.textContent = rental.vehicle_type;
        row.appendChild(vehicleTypeCell);

        const stationNameCell = document.createElement('td');
        stationNameCell.textContent = rental.station_name;
        row.appendChild(stationNameCell);

        const rentedAtCell = document.createElement('td');
        rentedAtCell.textContent = new Date(rental.rentedAt).toLocaleString();
        row.appendChild(rentedAtCell);

        const returnedAtCell = document.createElement('td');
        returnedAtCell.textContent = rental.returnedAt ? new Date(rental.returnedAt).toLocaleString() : 'Not Returned';
        row.appendChild(returnedAtCell);

        table.appendChild(row);
    });

    // Append the table to the overview section
    overviewSection.appendChild(table);
}

//logout button
const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Call getRentalData function
getRentalData();