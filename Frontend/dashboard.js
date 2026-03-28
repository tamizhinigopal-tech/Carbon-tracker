const data = JSON.parse(localStorage.getItem("result"));

document.getElementById("total").innerText =
    "Total Emissions: " + data.totalEmission.toFixed(2) + " kg CO2";

document.getElementById("risk").innerText =
    "Risk Level: " + data.riskLevel;

// Suggestions
const suggestionsDiv = document.getElementById("suggestions");
data.suggestions.forEach(s => {
    const p = document.createElement("p");
    p.innerHTML = `<i class="fa-solid fa-leaf"></i> ${s}`;
    suggestionsDiv.appendChild(p);
});

// Goal Estimator
document.getElementById("goal").innerText =
    "Reduce emissions by 20% -> Target: " + (data.totalEmission * 0.8).toFixed(2);

// Chart
new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
        labels: ["Diesel", "Electricity"],
        datasets: [{
            data: [data.dieselEmission, data.electricityEmission]
        }]
    }
});
new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
        labels: ["Diesel", "Electricity"],
        datasets: [{
            data: [data.dieselEmission, data.electricityEmission]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});