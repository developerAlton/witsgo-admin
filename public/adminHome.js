const statsOverview = document.getElementById('card-display');

//onclick go to adminStats.html
statsOverview.addEventListener('click', function() {
    window.location.href = "adminStats.html";
});

const sampleRentalData = [
    { _id: '1', vehicle: 'Bike1', userId: '2325733', rentalTime: '2024-09-10T10:30:00Z' },
    { _id: '2', vehicle: 'Scooter1', userId: '2345678', rentalTime: '2024-09-11T14:45:00Z' },
    { _id: '3', vehicle: 'Skateboard1', userId: '2341178', rentalTime: '2024-09-12T09:15:00Z' },
    { _id: '4', vehicle: 'Bike2', userId: '2684562', rentalTime: '2024-09-13T12:00:00Z' },
    { _id: '5', vehicle: 'Scooter2', userId: '2222452', rentalTime: '2024-09-13T13:30:00Z' },
];



document.addEventListener('DOMContentLoaded', function() {
    displayRentalData();
});

function displayRentalData() {
    const overviewSection = document.querySelector('#logs');
    
    // Clear existing content
    overviewSection.innerHTML = '';

    // Create a table to display the data
    const table = document.createElement('table');
    table.classList.add('rental-table');

    // Create table headers
    const headers = ['Rental', 'Student Number', 'Date'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate table rows with sample data
    sampleRentalData.forEach(rental => {
        const row = document.createElement('tr');
        
        const vehicleCell = document.createElement('td');
        vehicleCell.textContent = rental.vehicle;
        row.appendChild(vehicleCell);
        
        const userIdCell = document.createElement('td');
        userIdCell.textContent = rental.userId;
        row.appendChild(userIdCell);
        
        const rentalTimeCell = document.createElement('td');
        rentalTimeCell.textContent = new Date(rental.rentalTime).toLocaleString();
        row.appendChild(rentalTimeCell);
        
        table.appendChild(row);
    });

    // Append the table to the overview section
    overviewSection.appendChild(table);
}
