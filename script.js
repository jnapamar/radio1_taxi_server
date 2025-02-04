document.addEventListener("DOMContentLoaded", () => {
    const drivers = ["Conductor 1", "Conductor 2", "Conductor 3", "Conductor 4", "Conductor 5"];
    const driversList = document.getElementById("drivers");

    function renderDrivers() {
        driversList.innerHTML = "";
        drivers.forEach(driver => {
            const li = document.createElement("li");
            li.textContent = driver;
            driversList.appendChild(li);
        });
    }

    function showNotification(message) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    document.getElementById("talk-button").addEventListener("click", () => {
        showNotification("🎤 Comunicación activada. Solo conductores pueden hablar.");
    });

    document.getElementById("group-chat").addEventListener("click", () => {
        showNotification("💬 Abriendo chat grupal...");
    });

    document.getElementById("private-chat").addEventListener("click", () => {
        showNotification("🔒 Abriendo chat privado...");
    });

    document.getElementById("settings").addEventListener("click", () => {
        showNotification("⚙️ Abriendo configuración...");
    });

    renderDrivers();
});