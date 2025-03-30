const liikeInput = document.getElementById("Liike");
const sarjatInput = document.getElementById("Sarjat");
const toistotInput = document.getElementById("Toistot");

const save = document.getElementById("Save");
save.addEventListener("click",saveExercise)

const history = [];
const historyContainer = document.getElementById("historyContainer");
historyContainer.innerHTML = "<h3>Treeni historia: </h3>"
const historyButton = document.getElementById("History");
historyButton.addEventListener("click", historyClick);
historyContainer.style.display = "block";


function saveExercise(e) {
    const liike = liikeInput.value.trim();
    const toistot = parseInt(toistotInput.value);
    const sarjat = parseInt(sarjatInput.value);

    if (liike === ""||isNaN(sarjat)||isNaN(toistot)) {
        alert ("Syötä jotain");
        return;
    }
    history.push({liike, sarjat, toistot});
    showHistory();

    liikeInput.value = "";
    sarjatInput.value = "";
    toistotInput.value = "";
    
}

function showHistory() {

    history.forEach((entry, index) => {
        const item = document.createElement("div");
        item.id = "historyText";
        item.textContent = `${index + 1}. Liike: ${entry.liike}  ${entry.sarjat} * ${entry.toistot}`;
        historyContainer.appendChild(item);
        
    });
}
    
function historyClick(e) {
    historyContainer.style.display = (historyContainer.style.display === "none") ? "block" : "none"; 
}    