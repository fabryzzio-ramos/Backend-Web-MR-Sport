const mongoose = require("mongoose");

const jugadorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        posicion: {
            type: String,
            enum: ["Portero", "Defensa", "Mediocampista", "Delantero"]
        },
        numero: {
            type: Number
        },
        foto: {
            type: String
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Jugador", jugadorSchema);