const form = document.getElementById("carbonForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("loading").classList.remove("hidden");

    const data = {
        mineName: document.getElementById("mineName").value,
        coalProduction: Number(document.getElementById("coalProduction").value),
        dieselUsage: Number(document.getElementById("dieselUsage").value),
        electricityUsage: Number(document.getElementById("electricityUsage").value),
        vehicles: Number(document.getElementById("vehicles").value)
    };

    fetch("/calculate-emissions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        mineName,
        coalProduction,
        dieselUsage,
        electricityUsage,
        vehicles
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);

    // ✅ STORE DATA
    localStorage.setItem("emissionData", JSON.stringify(data));

    // ✅ REDIRECT TO DASHBOARD PAGE
    window.location.href = "dashboard.html";
})
.catch(error => {
    console.error("Error:", error);
});