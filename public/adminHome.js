// Sample rental data
const sampleRentalData = [
    { _id: '1', vehicle: 'Bike1', userId: '2325733', rentalTime: '2024-09-10T10:30:00Z' },
    { _id: '2', vehicle: 'Scooter1', userId: '2345678', rentalTime: '2024-09-11T14:45:00Z' },
    { _id: '3', vehicle: 'Skateboard1', userId: '2341178', rentalTime: '2024-09-12T09:15:00Z' },
    { _id: '4', vehicle: 'Bike2', userId: '2684562', rentalTime: '2024-09-13T12:00:00Z' },
    { _id: '5', vehicle: 'Scooter2', userId: '2222452', rentalTime: '2024-09-13T13:30:00Z' },// make 10 entries
    { _id: '6', vehicle: 'Skateboard2', userId: '2345678', rentalTime: '2024-09-14T14:45:00Z' },
    { _id: '7', vehicle: 'Bike3', userId: '2341178', rentalTime: '2024-09-15T09:15:00Z' },
    { _id: '8', vehicle: 'Scooter3', userId: '2684562', rentalTime: '2024-09-16T12:00:00Z' },
    { _id: '9', vehicle: 'Skateboard3', userId: '2222452', rentalTime: '2024-09-17T13:30:00Z' },
    { _id: '10', vehicle: 'Bike4', userId: '2325733', rentalTime: '2024-09-18T10:30:00Z' }, //another 10
    { _id: '11', vehicle: 'Scooter4', userId: '2345678', rentalTime: '2024-09-19T14:45:00Z' },
    { _id: '12', vehicle: 'Skateboard4', userId: '2341178', rentalTime: '2024-09-20T09:15:00Z' },
    { _id: '13', vehicle: 'Bike5', userId: '2684562', rentalTime: '2024-09-21T12:00:00Z' },
    { _id: '14', vehicle: 'Scooter5', userId: '2222452', rentalTime: '2024-09-22T13:30:00Z' },
    { _id: '15', vehicle: 'Skateboard5', userId: '2345678', rentalTime: '2024-09-23T14:45:00Z' },
    { _id: '16', vehicle: 'Bike6', userId: '2341178', rentalTime: '2024-09-24T09:15:00Z' },
    { _id: '17', vehicle: 'Scooter6', userId: '2684562', rentalTime: '2024-09-25T12:00:00Z' },
    { _id: '18', vehicle: 'Skateboard6', userId: '2222452', rentalTime: '2024-09-26T13:30:00Z' },
    { _id: '19', vehicle: 'Bike7', userId: '2325733', rentalTime: '2024-09-27T10:30:00Z' },
    { _id: '20', vehicle: 'Scooter7', userId: '2345678', rentalTime: '2024-09-28T14:45:00Z' }
];

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