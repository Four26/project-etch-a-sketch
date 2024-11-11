const gridContainer = document.getElementById("grid-container");
const gridBtn = document.getElementById("grid-btn");
const resetBtn = document.getElementById("reset-btn");
const randomBtn = document.getElementById("random-color");
const blackBtn = document.getElementById("black-btn");

let useRandomColors = false;
let useBlack = false;

// Function to create the grid items
const createGrid = (size) => {
    // Clear existing grid
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    // Calculate item size
    const itemSize = Math.floor(gridContainer.clientWidth / size);

    for (let i = 0; i < size * size; i++) {
        const flexItem = document.createElement("div");
        flexItem.className = "flex-item";
        flexItem.style.width = `calc(100% / ${size})`;
        flexItem.style.height = `calc(100% / ${size})`;
        flexItem.addEventListener("mouseover", () => {
            if (useRandomColors) {
                flexItem.style.background = getRandomColor();
            } else if (useBlack) {
                flexItem.style.background = "black";
            } else {
                flexItem.style.background = "yellowgreen";
            }
        });
        gridContainer.appendChild(flexItem);
    }
}

// Function to get a random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial grid setup
createGrid(16);

// Function to show the popup
const popUp = () => {
    const popUpOverlay = document.createElement("div");
    popUpOverlay.className = "popup-overlay";
    popUpOverlay.innerHTML = `
        <div class="popup">
            <input type="text" class="input-field" placeholder="Enter grid size from 1-100"/>
            <button onclick="closePopup()" class="close">Close</button>
            <button onclick="updateGrid()" class="update">Update</button>
        </div>
    `;
    document.body.appendChild(popUpOverlay);
    popUpOverlay.style.display = "flex";
}

// Function to close the popup
function closePopup() {
    document.querySelector('.popup-overlay').remove();
}

// Function to update the grid based on input
function updateGrid() {
    const inputField = document.querySelector('.input-field');
    const size = parseInt(inputField.value);
    if (size >= 1 && size <= 100) {
        createGrid(size);
        closePopup();
    } else {
        alert("Please enter a number between 1 and 100.");
    }
}

// Function to reset the grid items' background color
const reset = () => {
    const flexItems = document.querySelectorAll(".flex-item");
    flexItems.forEach((item) => {
        item.style.background = "#f0f0f0";
    });
}

// Add event listeners
gridBtn.addEventListener("click", popUp);
resetBtn.addEventListener("click", reset);
randomBtn.addEventListener("click", () => {
    useRandomColors = !useRandomColors;
    useBlack = false; // Disable black color mode when random is enabled
    randomBtn.value = useRandomColors ? "Disable Random Colors" : "Random Colors";
    blackBtn.value = "Black"; // Reset black button text
});
blackBtn.addEventListener("click", () => {
    useBlack = !useBlack;
    useRandomColors = false; // Disable random color mode when black is enabled
    blackBtn.value = useBlack ? "Disable Black" : "Black";
    randomBtn.value = "Random Colors"; // Reset random button text
});
