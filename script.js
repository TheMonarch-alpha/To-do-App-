const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add an event listener for the "keydown" event
inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // Check if the "Enter" key was pressed
        event.preventDefault(); // Prevent the default action (if any)
        addTask(); // Call the addTask function
    }
});

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        let span = document.createElement("span");
        span.textContent = "×"; // Change to cross symbol
        span.className = "delete-button"; // Add a class for styling
        span.addEventListener("click", function () {
            li.remove();
            saveData();
        });

        li.appendChild(span);
        listContainer.appendChild(li);
        saveData();
    }
    inputBox.value = ""; // Clear the input field
}


listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    try {
        localStorage.setItem("data", listContainer.innerHTML);
    } catch (e) {
        console.error("Could not save data to localStorage", e);
    }
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        listContainer.innerHTML = ""; // Clear all tasks
        saveData(); // Save the cleared state to localStorage
    }
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

showTask();

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

setInterval(updateTime, 1000);

updateTime();

// Function to update the date
function updateDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();

    document.getElementById('current-date').textContent = `${day}/${month}/${year}`;
}

// Function to fetch and update the weather
async function updateWeather() {
    try {
        const apiKey = '877dee00214a7629297f932b3a31fede';
        const city = 'Vellore'; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = await response.json();
        const temperature = weatherData.main.temp;

        document.getElementById('current-weather').textContent = `${temperature}°C`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('current-weather').textContent = 'Unable to fetch the weather';
    }
}

updateDate();
updateWeather();

setInterval(updateWeather, 600000);

// Function to save a note
function saveNote() {
    const noteInput = document.getElementById('notepad-input');
    const notesList = document.getElementById('notes-list');

    if (noteInput.value.trim() === '') {
        alert('Please write something before saving!');
        return;
    }

    // Create a new note item
    const li = document.createElement('li');
    li.textContent = noteInput.value.trim();

    // Add delete button for each note
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.style.background = '#e14a37';
    deleteBtn.style.color = '#fff';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '5px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.onclick = function () {
        li.remove();
        saveNotesToLocalStorage();
    };

    li.appendChild(deleteBtn);
    notesList.appendChild(li);

    // Save notes to localStorage
    saveNotesToLocalStorage();

    // Clear the input
    noteInput.value = '';
}

// Function to save notes to localStorage
function saveNotesToLocalStorage() {
    const notesList = document.getElementById('notes-list');
    const notes = Array.from(notesList.children).map(note => note.textContent.replace('Delete', '').trim());
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotesFromLocalStorage() {
    const notesList = document.getElementById('notes-list');
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(noteText => {
        const li = document.createElement('li');
        li.textContent = noteText;

        // Add delete button for each note
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.background = '#e14a37';
        deleteBtn.style.color = '#fff';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '5px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = function () {
            li.remove();
            saveNotesToLocalStorage();
        };

        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

// Load notes on page load
loadNotesFromLocalStorage();

// Function to update the Spotify embed URL dynamically
function updateSpotifyPlaylist(playlistId) {
    const spotifyPlayer = document.getElementById('spotify-player');
    spotifyPlayer.src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
}

// Example usage
const examplePlaylistId = '3zq5iMaCyPyqyMQAGOieIt'; // Replace with a valid playlist ID
updateSpotifyPlaylist(examplePlaylistId);
