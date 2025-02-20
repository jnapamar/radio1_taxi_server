const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path"); // <-- Agregado

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // <-- Servir archivos estáticos

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Permite conexiones desde cualquier lugar
    },
});

io.on("connection", (socket) => {
    console.log("Un conductor se conectó:", socket.id);

    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido:", data);
        io.emit("mensaje", data); // Enviar el mensaje a todos los conductores
    });

    socket.on("disconnect", () => {
        console.log("Un conductor se desconectó:", socket.id);
    });
});

// Servir el index.html correctamente
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 10000; // Asegurar que usa la variable PORT
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
