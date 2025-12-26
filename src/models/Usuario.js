const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        contraseña: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);