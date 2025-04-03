const liikeInput = document.getElementById("Liike");
const sarjatInput = document.getElementById("Sarjat");
const setsContainer = document.getElementById("setsContainer");

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
    const sarjat = parseInt(sarjatInput.value);

    if (liike === ""||isNaN(sarjat)) {
        alert ("Syötä jotain");
        return;
    }
    saveSarjat(liike);

    liikeInput.value = "";
    sarjatInput.value = "";
    
    
}

function showHistory() {
    // Ryhmitellään sarjat liikkeen mukaan
    const grouped = {};

    history.forEach(entry => {
        if (!grouped[entry.liike]) {
            grouped[entry.liike] = [];
        }
        grouped[entry.liike].push({ toisto: entry.toisto, paino: entry.paino });
    });

    // Tulostetaan liikkeet ja niiden sarjat
    let index = 1;
    for (const liike in grouped) {
        const liikeDiv = document.createElement("div");
        liikeDiv.innerHTML = `<strong>${index++}. Liike: ${liike}</strong>`;
        historyContainer.appendChild(liikeDiv);

        grouped[liike].forEach(sarja => {
            const sarjaDiv = document.createElement("div");
            sarjaDiv.style.marginLeft = "1em"; // vähän sisennystä
            sarjaDiv.textContent = `- ${sarja.toisto} x ${sarja.paino} kg`;
            historyContainer.appendChild(sarjaDiv);
        });
    }
}    
function historyClick(e) {
    historyContainer.style.display = (historyContainer.style.display === "none") ? "block" : "none";
    addSarja(); 
}   


sarjatInput.addEventListener("input", addSarja);

function addSarja(e) {
    const sarjat = parseInt(sarjatInput.value);
    setsContainer.innerHTML = "";

    
    if (isNaN(sarjat) || sarjat <= 0) {
        return;
    }
    
    for (let i = 1 ; i<= sarjat; ++i) {
        const setDiv = document.createElement("div");
        setDiv.innerHTML = `
        <h3> Sarja ${i} </h3>
        <label for = "toistot${i}">Toistot:</label>
        <input type = "number" id = "toistot${i}" placeholder = "" />
        <label for = "painot${i}">Painot:</label>
        <input type = "number" id = "painot${i}" placeholder = "" />
        `;
        setsContainer.appendChild(setDiv);

          
        
    }

}

function saveSarjat(exercise) {
    const sarjat = parseInt(sarjatInput.value);
    for (let i = 1 ; i <= sarjat; ++i ) {
        const toistoInput = document.getElementById(`toistot${i}`);
        const painoInput = document.getElementById(`painot${i}`);

        const liike = liikeInput.value.trim();
        const toisto = parseInt(toistoInput.value, 10);
        const paino = parseInt(painoInput.value, 10);
        if (toisto !== 0 && paino !== 0) {
            history.push({
                liike: liike,
                toisto: toisto, 
                paino: paino
            });
            showHistory();
        }

       

    }
}