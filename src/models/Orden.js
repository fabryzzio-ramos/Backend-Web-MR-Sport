const mongoose = require("mongoose");

const ordenSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },
        productos: [
            {
                producto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Producto"
                },
                precio: {
                    type: Number
                },
                cantidad: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {
            type: Number,
            required: true
        },
        estado: {
            type: String,
            enum: ["pendiente", "pagado", "enviado"],
            default: "pendiente"
        },
        createAt: {
            type: Date
        },
    }, { timestamps: true }
);

module.exports = mongoose.model("Orden", ordenSchema);