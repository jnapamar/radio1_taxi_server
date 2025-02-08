const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Evento de conexión de clientes
io.on("connection", (socket) => {
  console.log("🚖 Conductor conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("📢 Mensaje recibido:", data);
    io.emit("mensaje", data); // Reenvía el mensaje a todos
  });

  socket.on("disconnect", () => {
    console.log("❌ Conductor desconectado:", socket.id);
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`📡 Servidor funcionando en http://localhost:${PORT}`);
});
