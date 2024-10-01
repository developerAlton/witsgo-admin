// databasePage.js
const databases = {
    "Map": ["Amenity", "Building", "PointOfInterest", "Room", "Route"],
    "UserRoutes": ["NavigationHistory", "Preferences", "Routes", "User"],
    "Accessibility":["AccessibleRoute","Location"]
};


const collectionSchemas = {
    
    "Map": {
      "Amenity": {
        "amenity_type": { "type": "string", "required": true },
        "building_id": { "type": "string", "required": true },
        "latitude": { "type": "number", "required": true },
        "longitude": { "type": "number", "required": true },
      },
      "Building": {
        "building_name": { "type": "string", "required": true },
        "latitude": { "type": "number", "required": true },
        "code": {"type":"string","required":false,"default":null},
        "longitude": { "type": "number", "required": true },
        "campus":{"type": "string","required": true},
        "type":{"type":"string","required":true,default:"building"},
      },
      "Room": {
        "room_name": { "type": "string", "required": true },
        "code":{"type":"string","required": true},
        "type":{"type":"string","required":true},
        "building_id": { "type": "string", "required": true },
      },
    },
    "Transportation": {
      "Route": {
        "route_name": { "type": "string", "required": true },
        "stops": { "type": "array", "required": true }
      },
      "Schedule": {
        "route_id": { "type": "string", "required": true },
        "stop_id": { "type": "string", "required": true },
        "arrival_time": { "type": "date", "required": true },
        "departure_time": { "type": "date", "required": true }
      },
      "Stop": {
        "stop_name": { "type": "string", "required": true },
        "location": { "type": "string", "required": true }
      },
      "Tracking": {
        "vehicle_id": { "type": "string", "required": true },
        "route_id": { "type": "string", "required": true },
        "current_stop_id": { "type": "string", "required": true },
        "timestamp": { "type": "date", "required": true },
        "latitude": { "type": "number", "required": true },
        "longitude": { "type": "number", "required": true }
      },
      "Vehicle": {
        "vehicle_number": { "type": "string", "required": true },
        "vehicle_type": { "type": "string", "required": true }
      }
    },
    "UserRoutes": {
      "NavigationHistory": {
        "history_id": { "type": "string", "required": true },
        "route_id": { "type": "string", "required": true },
        "start_time": { "type": "date", "required": true },
        "end_time": { "type": "date", "required": true },
      },
      "Preferences": {
        "preference_id": { "type": "string", "required": true },
        "user_id": { "type": "string", "required": true },
        "preferences_type": { "type": "string", "enum": ["wheelchair", "tolls_free", "none"], "required": true },
        "preferences_value": { "type": "boolean", "required": true },
      },
      "Routes": {
        "route_id": { "type": "string", "required": true },
        "user_id": { "type": "string", "required": true },
        "start_location": { "type": "object", "required": true },
        "end_location": { "type": "object", "required": true },
        "duration": { "type": "number", "required": true },
        "route_data": { "type": "string", "required": true },
      }
    },
    "Accessibility": {
      "Location": {
        "name": { "type": "string", "required": true },
        "latitude": { "type": "number", "required": true },
        "longitude": { "type": "number", "required": true },
        "wheelchair_friendly": { "type": "boolean", "default": false },
        "ramp_available": { "type": "boolean", "default": false },
        "elevator_nearby": { "type": "boolean", "default": false },
      }
    },
    "RentalService": {
      "Rental": {
        "student_id": { "type": "ObjectId", "ref": "Student", "required": true },
        "vehicle_id": { "type": "ObjectId", "ref": "Vehicle", "required": true },
        "rental_start_time": { "type": "date", "required": true },
        "rental_end_time": { "type": "date", "required": true },
        "is_active": { "type": "boolean", "required": true },
      },
      "Vehicle": {
        "vehicle_id": { "type": "string", "unique": true, "required": true },
        "type": { "type": "string", "required": true },
        "status": { "type": "string", "required": true},
        "current_station_id": { "type": "ObjectId", "ref": "Station", "required": true },
      },
      "Station": {
        "location": { "type": "string", "required": true },
      },
      "Student": {
        "student_number": { "type": "string", "unique": true, "required": true },
        "name": { "type": "string", "required": true },
        "email": { "type": "string", "unique": true, "required": true },
        "rented_vehicle_id": { "type": "ObjectId", "ref": "Vehicle", "required": true },
      }
    }
  };

const baseURL = "https://witsgobackend.azurewebsites.net/";
// const baseURL = "http://localhost:3000/";

// State to track current action and collection
let currentAction = "";
let currentCollection = "";

// Event listener for DOMContentLoaded to initialize the page
document.addEventListener('DOMContentLoaded', function () {
    const databaseDropdown = document.getElementById('database');
    const defaultOption = document.createElement('option');
    defaultOption.text = '-- Select Database --';
    databaseDropdown.appendChild(defaultOption);

    for (const db in databases) {
        const option = document.createElement("option");
        option.value = db;
        option.text = db;
        databaseDropdown.appendChild(option);
    }

    // Set the collection options when the database is selected
    databaseDropdown.addEventListener('change', updateCollections);
});

// Update collection dropdown based on selected database
function updateCollections() {
    clearRadioButtons(); // Clear radio buttons when the database is changed
    const collectionsDropdown = document.getElementById('collections');
    collectionsDropdown.innerHTML = "";
    const defaultOption = document.createElement('option');
    defaultOption.text = '-- Select Collection --';
    collectionsDropdown.appendChild(defaultOption);
    const actionSelection = document.getElementById("actionSelection");
    actionSelection.style.visibility = "hidden";

    const selectedDatabase = document.getElementById('database').value;

    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.style.visibility = "hidden";
    
    const selectCollection = document.getElementById("selectCollection");

    if(selectedDatabase && selectedDatabase == '-- Select Database --'){ 
        selectCollection.style.visibility = "hidden";
    } else if(selectCollection){
        selectCollection.style.visibility = "visible";
    }

    // Clear the form section when the database is changed
    const formSection = document.getElementById("actionForm");
    formSection.innerHTML = ""; // Clear the form section

    

    if (collectionSchemas[selectedDatabase]) { // Check if the selected database has collections
        for (const collection in collectionSchemas[selectedDatabase]) {
            const option = document.createElement("option");
            option.value = collection;
            option.text = collection;
            collectionsDropdown.appendChild(option);
        }
    }

    // Reset the current collection and action
    currentCollection = "";
    currentAction = "";
}

// Set current action based on radio button selection
function setAction(action) {
    currentAction = action;
    generateForm();
}

document.getElementById("collections").addEventListener("change", function() {
    const selectedCollection = document.getElementById("collections").value;
    const actionSelection = document.getElementById("actionSelection");

    // Make the table card visible if a collection is selected
    if (selectedCollection && selectedCollection != '-- Select Collection --') {
        actionSelection.style.visibility = "visible";
    } else {
        actionSelection.style.visibility = "hidden";
    }
});

function generateForm() {
    //clearRadioButtons(); // Clear radio buttons when the action is changed
    const formSection = document.getElementById("actionForm");
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.style.visibility = "hidden";
    formSection.innerHTML = "";
    currentCollection = document.getElementById("collections").value;

    if (!currentAction || !currentCollection) {
        return;
    }

    let button = document.createElement('button');
    button.type = 'submit';

    switch (currentAction) {
        case "get":
            generateInsertFormFields(formSection);
            button.textContent = 'Get';
            formSection.appendChild(button);
            break;
        case "insert":
            generateInsertFormFields(formSection);
            button.textContent = 'Insert';
            formSection.appendChild(button);
            break;
        case "update":
            generateInsertFormFields(formSection);
            button.textContent = 'Update';
            formSection.appendChild(button);
            break;
        case "delete":
            generateInsertFormFields(formSection);
            button.textContent = 'Delete';
            formSection.appendChild(button);
            break;
    }
    formSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
}


async function populateUpdate(event) {
    let toSendData = {
        "database": document.getElementById('database').value,
        "collection": document.getElementById('collections').value,
        "data": { "_id": document.getElementById("_id").value }
    }

    const res = await axios.post(baseURL + "v1/admin/get_data", toSendData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const array = res.data.data[0];

    Object.keys(array).forEach((key) => {
        let element = document.getElementById(key);
        if (element != null) {
            element.value = array[key];
        }
    })
}

// Generate form fields for inserting/updating data
function generateInsertFormFields(formSection) {
    const dbSelect = document.getElementById("database").value;
    const collectionSelect = document.getElementById("collections").value;
    const schema = collectionSchemas[dbSelect] ? collectionSchemas[dbSelect][collectionSelect] : null;

    formSection.innerHTML = ""; // Clear previous form fields

    if (currentAction == "update" || currentAction == "delete") {
        const label = document.createElement("label");
        label.textContent = "_id:";

        let input = document.createElement("input");
        input.classList.add("input-field");
        input.id = "_id";
        input.type = "text";
        input.name = "_id";
        input.required = true;
        input.addEventListener("blur", populateUpdate);

        formSection.appendChild(label);
        formSection.appendChild(input);
        formSection.appendChild(document.createElement("br"));
    }

    if (schema) {
        for (const field in schema) {
            const fieldInfo = schema[field];
            const label = document.createElement("label");
            label.textContent = `${field}: `;

            let input;

            switch (fieldInfo.type) {
                case "string":
                    input = document.createElement("input");
                    input.classList.add("input-field");
                    input.type = "text";
                    input.name = field;
                    input.id = field;
                    break;
                case "number":
                    input = document.createElement("input");
                    input.classList.add("input-field");
                    input.type = "number";
                    input.step = "any";
                    input.name = field;
                    input.id = field;
                    break;
                case "date":
                    input = document.createElement("input");
                    input.classList.add("input-field");
                    input.type = "date";
                    input.name = field;
                    input.id = field;
                    break;
                case "array":
                    input = document.createElement("textarea");
                    input.classList.add("input-field");
                    input.placeholder = "Enter JSON array here";
                    input.name = field;
                    input.id = field;
                    break;
                case "object":
                    input = document.createElement("textarea");
                    input.classList.add("input-field");
                    input.placeholder = "Enter JSON object here";
                    input.name = field;
                    input.id = field;
                    break;
                default:
                    input = document.createElement("input");
                    input.classList.add("input-field");
                    input.type = "text";
                    input.name = field;
                    break;
            }

            if (fieldInfo.required && currentAction == "insert") {
                input.required = true;
            }

            if (fieldInfo.default != undefined && currentAction != "get") {
                input.value = fieldInfo.default;
            }

            formSection.appendChild(label);
            formSection.appendChild(input);
            formSection.appendChild(document.createElement("br"));
        }
    } else {
        formSection.innerHTML = "No schema available for selected collection.";
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const cardsContainer = document.getElementById('cardsContainer');

    let outputData = {};

    Object.keys(data).forEach((element) => {
        if (data[element].length != 0) {
            outputData[element] = data[element];
        }
    });

    let toSendData = {
        "database": document.getElementById('database').value,
        "collection": document.getElementById('collections').value,
        "data": outputData
    };

    console.log(toSendData);

    let endpoint = "v1/admin/" + currentAction + "_data";
    let url = baseURL + endpoint;

    try {
        const res = await axios.post(url, toSendData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Clear previous cards
        cardsContainer.innerHTML = "";
        cardsContainer.style.visibility = "visible";

        res.data.data.forEach(item => {
            let card = createCard(item);
            cardsContainer.appendChild(card);
        });

        // Scroll to the newly added content
        cardsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.log(error);
    }
}

// Function to dynamically create a card for any object
function createCard(dataObj) {
    let card = document.createElement("section");
    card.className = "data-card-display";

    let cardContent = document.createElement("section");
    cardContent.className = "card-content";

    let cardTitle = document.createElement("h2");
    cardTitle.className = "card-title";
    cardTitle.textContent = "Data";

    let tableSection = document.createElement("section");
    tableSection.id = "table";

    let article = document.createElement("article");
    article.id = "output";

    // Iterate through the object and display each key-value pair
    for (let [key, value] of Object.entries(dataObj)) {
        let p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        article.appendChild(p);
    }

    tableSection.appendChild(article);
    //cardContent.appendChild(cardTitle);
    cardContent.appendChild(tableSection);
    card.appendChild(cardContent);

    return card;
}




document.getElementById('actionForm').addEventListener('submit', handleSubmit);

function clearRadioButtons() {
    const radios = document.querySelectorAll('#actionSelection input[name="action"]');
    radios.forEach(radio => {
        radio.checked = false; // Uncheck each radio button
    });
}
