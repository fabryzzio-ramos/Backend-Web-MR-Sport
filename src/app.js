const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const conectarDB = require("./config/database");

const app = express();

// CONECTAR DB
conectarDB();

// MIDDLEWARES GLOBALES
app.use(cookieParser());
app.use(cors({
    origin: true,  // Permite todos (temporal)
    credentials: true
}));
app.use(express.json());

// RUTAS
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/jugadores", require("./routes/jugadores.routes"));
app.use("/api/productos", require("./routes/productos.routes"));
app.use("/api/ordenes", require("./routes/ordenes.routes"));
app.use("/api/partidos", require("./routes/partidos.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

// RUTA BASE
app.get("/", (req, res) => {
    res.send("API MR Sport funcionando");
});

// EXPORTAR APP
module.exports = app;