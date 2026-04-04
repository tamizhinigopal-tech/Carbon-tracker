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
        body: JSON.stringify(data)   // ✅ FIXED
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);

        // ✅ MATCH dashboard.js
        localStorage.setItem("result", JSON.stringify(result));

        // ✅ REDIRECT
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        console.error("Error:", error);
    });
});