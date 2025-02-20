const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path"); // 🔹 Importar path

const app = express();
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir conexiones desde cualquier lugar
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

// Ruta para la página principal
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
