const mongoose = require("mongoose");

const partidoSchema = new mongoose.Schema(
    {   
        local: {
            type: String,
            required: true
        },
        rival: {
            type: String,
            required: true
        },
        logo: {   
                local: { type: String },
                rival: { type: String },
            },
        fecha: {
            type: Date,
            required: true
        },
        lugar: {
            type: String
        },
        competicion: {
            type: String,
            required: true
        },
        resultado: {
            type: String
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Partido", partidoSchema);