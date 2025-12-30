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
                    ref: "Producto",
                    required: true
                },
                nombre: String,
                imagen: String,
                precio: {
                    type: Number,
                    required: true
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
        metodoPago: {
            type: String,
            enum: ["yape", "plin"],
        },
        comprobante: {
            url: String,
            public_id: String
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Orden", ordenSchema);