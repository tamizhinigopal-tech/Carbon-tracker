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

    const response = await fetch("/calculate-emissions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const result = await response.json();

    localStorage.setItem("result", JSON.stringify(result));

    window.location.href = "dashboard.html";
});