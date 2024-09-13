// databasePage.js

// Sample Data
const sampleData = {
    transportation: {
        buildings: [
            { id: 1, building_name: "Main Building", latitude: -26.1928, longitude: 28.0325 },
            { id: 2, building_name: "Library", latitude: -26.1930, longitude: 28.0340 }
        ],
        rooms: [
            { id: 1, room_name: "Room A", building_id: 1 },
            { id: 2, room_name: "Room B", building_id: 2 }
        ],
        amenities: [
            { id: 1, amenity_type: "Cafeteria", building_id: 1, latitude: -26.1928, longitude: 28.0325 },
            { id: 2, amenity_type: "Parking", building_id: 2, latitude: -26.1930, longitude: 28.0340 }
        ],
        routes: [
            { id: 1, route_name: "Route 1", distance: 1.5, estimated_time: 10 },
            { id: 2, route_name: "Route 2", distance: 2.0, estimated_time: 15 }
        ],
        pointsOfInterest: [
            { id: 1, poi_name: "Library Entrance", latitude: -26.1931, longitude: 28.0341 },
            { id: 2, poi_name: "Main Gate", latitude: -26.1927, longitude: 28.0326 }
        ]
    }
};

// State to track current action and collection
let currentAction = "";
let currentCollection = "";

// Event listener for DOMContentLoaded to initialize the page
document.addEventListener('DOMContentLoaded', function () {
    const databaseDropdown = document.getElementById('database');
    const defaultOption = document.createElement('option');
    defaultOption.text = '-- Select Database --';
    databaseDropdown.appendChild(defaultOption);

    // Load databases into dropdown (currently only 'transportation')
    const option = document.createElement('option');
    option.value = 'transportation';
    option.textContent = 'Transportation';
    databaseDropdown.appendChild(option);

    // Set the collection options when the database is selected
    databaseDropdown.addEventListener('change', updateCollections);
});

// Update collection dropdown based on selected database
function updateCollections() {
    const collectionsDropdown = document.getElementById('collections');
    collectionsDropdown.innerHTML = "";

    const selectedDatabase = document.getElementById('database').value;

    if (selectedDatabase === 'transportation') {
        collectionsDropdown.style.display = 'block';
        const collections = ["buildings", "rooms", "amenities", "routes", "pointsOfInterest"];
        collections.forEach(collection => {
            const option = document.createElement("option");
            option.value = collection;
            option.textContent = collection.charAt(0).toUpperCase() + collection.slice(1);
            collectionsDropdown.appendChild(option);
        });
    }
}

// Set current action based on radio button selection
function setAction(action) {
    currentAction = action;
    generateForm();
}

// Generate form inputs dynamically based on selected action and collection
function generateForm() {
    const formSection = document.getElementById("actionForm");
    formSection.innerHTML = "";
    currentCollection = document.getElementById("collections").value;

    if (!currentAction || !currentCollection) {
        return;
    }

    // Generate form fields based on current action
    switch (currentAction) {
        case "get":
            formSection.innerHTML = `<label for="id">Enter ID: </label><input type="text" id="id" name="id">`;
            formSection.innerHTML += `<button type="button" onclick="getDoc()">Get</button>`;
            break;
        case "insert":
            generateInsertFormFields(formSection);
            formSection.innerHTML += `<button type="button" onclick="insertRecord()">Insert</button>`;
            break;
        case "update":
            generateInsertFormFields(formSection);
            formSection.innerHTML += `<button type="button" onclick="edits()">Update</button>`;
            break;
        case "delete":
            formSection.innerHTML = `<label for="id">Enter ID: </label><input type="text" id="id" name="id">`;
            formSection.innerHTML += `<button type="button" onclick="deleteRecord()">Delete</button>`;
            break;
    }
}

// Generate form fields for inserting/updating data
function generateInsertFormFields(formSection) {
    if (currentCollection === "buildings") {
        formSection.innerHTML += `
            <label for="building_name">Building Name: </label><input type="text" id="building_name">
            <label for="latitude">Latitude: </label><input type="text" id="latitude">
            <label for="longitude">Longitude: </label><input type="text" id="longitude">
        `;
    } else if (currentCollection === "rooms") {
        formSection.innerHTML += `
            <label for="room_name">Room Name: </label><input type="text" id="room_name">
            <label for="building_id">Building ID: </label><input type="text" id="building_id">
        `;
    } else if (currentCollection === "amenities") {
        formSection.innerHTML += `
            <label for="amenity_type">Amenity Type: </label><input type="text" id="amenity_type">
            <label for="building_id">Building ID: </label><input type="text" id="building_id">
            <label for="latitude">Latitude: </label><input type="text" id="latitude">
            <label for="longitude">Longitude: </label><input type="text" id="longitude">
        `;
    } else if (currentCollection === "routes") {
        formSection.innerHTML += `
            <label for="route_name">Route Name: </label><input type="text" id="route_name">
            <label for="distance">Distance: </label><input type="text" id="distance">
            <label for="estimated_time">Estimated Time: </label><input type="text" id="estimated_time">
        `;
    } else if (currentCollection === "pointsOfInterest") {
        formSection.innerHTML += `
            <label for="poi_name">Point of Interest Name: </label><input type="text" id="poi_name">
            <label for="latitude">Latitude: </label><input type="text" id="latitude">
            <label for="longitude">Longitude: </label><input type="text" id="longitude">
        `;
    }
}

