const infoFieldset = document.getElementById("info");
const autoFieldset = document.getElementById("autonomous");
const teleopFieldset = document.getElementById("teleop");
const endgameFieldset = document.getElementById("endgame");

const stepInfo = document.getElementById("step_info");
const stepAuto = document.getElementById("step_auto");
const stepTeleop = document.getElementById("step_teleop");
const stepEndgame = document.getElementById("step_endgame");

const inputPage = document.getElementById("inputPage");
const overviewPage = document.getElementById("overviewPage");
const detailsPage = document.getElementById("detailsPage");

function switchToInfo() {
    infoFieldset.classList.remove("hidden");
    autoFieldset.classList.add("hidden");
    teleopFieldset.classList.add("hidden");
    endgameFieldset.classList.add("hidden");

    // Update steps
    stepInfo.className = "step step-primary"
    stepAuto.className = "step"
    stepTeleop.className = "step"
    stepEndgame.className = "step"
}

function switchToTeleop() {
    infoFieldset.classList.add("hidden");
    autoFieldset.classList.add("hidden");
    teleopFieldset.classList.remove("hidden");
    endgameFieldset.classList.add("hidden");

    // Update steps
    stepInfo.className = "step step-primary"
    stepAuto.className = "step step-primary"
    stepTeleop.className = "step step-primary"
    stepEndgame.className = "step"
}

function switchToAutonomous() {
    infoFieldset.classList.add("hidden");
    autoFieldset.classList.remove("hidden");
    teleopFieldset.classList.add("hidden");
    endgameFieldset.classList.add("hidden");

    // Update steps
    stepInfo.className = "step step-primary"
    stepAuto.className = "step step-primary"
    stepTeleop.className = "step"
    stepEndgame.className = "step"
}

function switchToEndgame() {
    infoFieldset.classList.add("hidden");
    autoFieldset.classList.add("hidden");
    teleopFieldset.classList.add("hidden");
    endgameFieldset.classList.remove("hidden");

    // Update steps
    stepInfo.className = "step step-primary"
    stepAuto.className = "step step-primary"
    stepTeleop.className = "step step-primary"
    stepEndgame.className = "step step-primary"
}

function createJson(
    scoutName,

    teamNumber,
    matchNumber,
    allianceColor,
    startSide,

    autoClassified,
    autoMissed,
    autoOverflow,
    autoBounceRamp,
    autoMotifs,
    whichMotif,
    autoLeave,
    autoNotes,
    autoGateNotes,

    teleopClassified,
    teleopMissed,
    teleopOverflow,
    teleopBounceRamp,
    teleopMotifs,
    teleopNotes,
    teleopGateNotes,

    endgameParkLocation,
    penaltyPoints,
    wasBroken,
    sorting,
    otherNotes
) {
    return {
        scoutName,

        teamNumber,
        matchNumber,
        allianceColor,
        startSide,

        autoClassified,
        autoMissed,
        autoOverflow,
        autoBounceRamp,
        autoMotifs,
        whichMotif,
        autoLeave,
        autoNotes,
        autoGateNotes,

        teleopClassified,
        teleopMissed,
        teleopOverflow,
        teleopBounceRamp,
        teleopMotifs,
        teleopNotes,
        teleopGateNotes,

        endgameParkLocation,
        penaltyPoints,
        wasBroken,
        sorting,
        otherNotes
    };
}

function getFormValues() {
    console.log("Submitting");
    let json = localStorage.getItem('json');

    if (json == null) {
        localStorage.setItem('json', JSON.stringify([]));
        json = localStorage.getItem('json');
    }

    const newJson = createJson(
        document.getElementById("scoutName").value,
        document.getElementById("teamNum").value,
        document.getElementById("matchNum").value,
        document.getElementById("allianceColor").value,
        document.getElementById("startSide").value,
        document.getElementById("autoClassified").value,
        document.getElementById("autoMissed").value,
        document.getElementById("autoOverflow").value,
        document.getElementById("autoBounceRamp").value,
        document.getElementById("autoMotifs").value,
        document.getElementById("whichMotif").value,
        document.getElementById("autoLeave").checked,
        document.getElementById("autoNotes").value,
        document.getElementById("autoGateNotes").value,
        document.getElementById("teleopClassified").value,
        document.getElementById("teleopMissed").value,
        document.getElementById("teleopOverflow").value,
        document.getElementById("teleopBounceRamp").value,
        document.getElementById("teleopMotifs").value,
        document.getElementById("teleopNotes").value,
        document.getElementById("teleopGateNotes").value,
        document.getElementById("endgameParkLocation").value,
        document.getElementById("penaltyPoints").value,
        document.getElementById("wasBroken").checked,
        document.getElementById("sorting").checked,
        document.getElementById("otherNotes").value
    );

    let finalJson = JSON.parse(json);
    finalJson.push(newJson);
    localStorage.setItem('json', JSON.stringify(finalJson));

    document.getElementById("inputForm").reset();
    switchToInfo();
}

function reset() {
    localStorage.clear()
}

function createTable() {
    const data = JSON.parse(localStorage.getItem('json'));

    document.write("<table border==\"1\"><tr>");
    for (key in data[0]) {
        document.write('<td>' + key + '</td>');
    }
    document.write("</tr>");
    for (var i = 0; i < data.length; i++) {
        document.write('<tr>');
        for (key in data[i]) {
            document.write('<td>' + data[i][key] + '</td>');
        }
        document.write('</tr>');
    }
    document.write("</table>");
}


document.getElementById("dataTable").addEventListener("click", function(e) {
    populateDetails(e.target.parentNode.querySelectorAll(".teamNumber")[0].innerText, e.target.parentNode.querySelectorAll(".matchNumber")[0].innerText);
    console.log(findItem(e.target.parentNode.querySelectorAll(".teamNumber")[0].innerText, e.target.parentNode.querySelectorAll(".matchNumber")[0].innerText));
    switchToDetails();
})

// VALIDATE UPLOADED FILES
document.getElementById("jsonInput").addEventListener("input", function(e) {
    var validFiles = true;
    if (getFileExtension(document.getElementById("jsonInput").files[0].name) !== "json") {
        document.getElementById("jsonInput").value = "";
    }
})

function getFileExtension(filename) {
    if (!filename || filename.indexOf('.') === -1) {
        return ''; // Return empty string if no extension is found
    }
    return filename.split('.').pop();
}

function findItem(teamNumber, matchNumber) {
    const data = JSON.parse(localStorage.getItem('json'));
    return data.find(item => item.teamNumber === teamNumber && item.matchNumber === matchNumber) || null;
}

function switchToInput() {
    inputPage.classList.remove("hidden");
    overviewPage.classList.add("hidden");
    detailsPage.classList.add("hidden");
    switchToInfo();
}

function switchToOverview() {
    inputPage.classList.add("hidden");
    overviewPage.classList.remove("hidden");
    detailsPage.classList.add("hidden");
    create();
}

function switchToDetails() {
    inputPage.classList.add("hidden");
    overviewPage.classList.add("hidden");
    detailsPage.classList.remove("hidden");
}

function displayAll() {
    inputPage.classList.remove("hidden");
    overviewPage.classList.remove("hidden");
    detailsPage.classList.remove("hidden");
}

function create() {
    document.getElementById("dataTable").innerHTML = ""; // Clear previous table data
    let data = JSON.parse(localStorage.getItem('json'));
    for (let i = 0; i < data.length; i++) {
        generateRow(document.getElementById("dataTable"), generateFromJson(data[i]));
    }
}

function generateRow(table, rowData) {
    const row = table.insertRow();
    const teamNumber = row.insertCell();
    const matchNumber = row.insertCell();
    const startingSide = row.insertCell();
    const totalScore = row.insertCell();
    const autoScore = row.insertCell();
    const teleopScore = row.insertCell();
    const penalties = row.insertCell();
    const correctedScore = row.insertCell();
    const reliability = row.insertCell();
    teamNumber.innerText = rowData.teamNumber;
    matchNumber.innerText = rowData.matchNumber;
    startingSide.innerText = rowData.startSide;
    totalScore.innerText = rowData.totalScore;
    autoScore.innerText = rowData.autoScore;
    teleopScore.innerText = rowData.teleopScore;
    penalties.innerText = rowData.penalties;
    correctedScore.innerText = rowData.correctedScore;
    reliability.innerText = rowData.reliability;

    teamNumber.classList.add("teamNumber");
    matchNumber.classList.add("matchNumber");
}

function generateFromJson(object) {
    let autoScore = 0;
    if (object.autoLeave) {
        autoScore += 3;
    }
    autoScore += Number(object.autoClassified) * 3 + Number(object.autoOverflow) + Number(object.autoMotifs) * 2
    let teleopScore = Number(object.teleopHighSamplesScored)*8 + Number(object.teleopLowSamplesScored)*4 + Number(object.teleopNetSamplesScored)*2 + Number(object.teleopHighSpecimensScored)*10 + Number(object.teleopLowSpecimensScored)*6;
    let totalScore = autoScore;
    switch (object.autoParkPos) {
        case ("Auto Park Location"):
            break;
        case ("None"):
            break;
        case ("Level 1 Ascent"):
            autoScore += 3;
            break;
        case ("Observation Zone"):
            autoScore += 3;
            break;
        default:
            break;
    }
    switch (object.teleopParkPos) {
        case ("Park Location"):
            break;
        case ("None"):
            break;
        case ("Level 1 Ascent"):
            teleopScore += 3;
            break;
        case ("Level 2 Ascent"):
            teleopScore += 15;
            break;
        case ("Level 3 Ascent"):
            teleopScore += 15;
            break;
        case ("Observation Zone"):
            teleopScore += 3;
            break;
        default:
            break;
    }
    totalScore += autoScore + teleopScore;

    let reliability = (Number(object.autoHighSamplesScored) + Number(object.autoLowSamplesScored) + Number(object.autoNetSamplesScored) + Number(object.autoHighSpecimensScored) + Number(object.autoLowSpecimensScored) + Number(object.teleopHighSamplesScored) + Number(object.teleopLowSamplesScored) + Number(object.teleopNetSamplesScored) + Number(object.teleopHighSpecimensScored) + Number(object.teleopLowSpecimensScored))
    if (Number(object.autoHighSamplesDropped) + Number(object.autoLowSamplesDropped) + Number(object.autoNetSamplesDropped) + Number(object.autoHighSpecimensDropped) + Number(object.autoLowSpecimensDropped) + Number(object.teleopHighSamplesDropped) + Number(object.teleopLowSamplesDropped) + Number(object.teleopNetSamplesDropped) + Number(object.teleopHighSpecimensDropped) + Number(object.teleopLowSpecimensDropped) !== 0) {
        reliability /= Number(object.autoHighSamplesDropped) + Number(object.autoLowSamplesDropped) + Number(object.autoNetSamplesDropped) + Number(object.autoHighSpecimensDropped) + Number(object.autoLowSpecimensDropped) + Number(object.teleopHighSamplesDropped) + Number(object.teleopLowSamplesDropped) + Number(object.teleopNetSamplesDropped) + Number(object.teleopHighSpecimensDropped) + Number(object.teleopLowSpecimensDropped)
        reliability = 1-1/reliability;
    } else {
        reliability = 1;
    }

    return {
        teamNumber: object.teamNumber,
        matchNumber: object.matchNumber,
        startSide: object.startSide,
        totalScore,
        autoScore,
        teleopScore,
        penalties: object.penaltyPoints,
        correctedScore: totalScore - object.penaltyPoints,
        reliability: (reliability*100).toFixed(2) + "%",
    }
}