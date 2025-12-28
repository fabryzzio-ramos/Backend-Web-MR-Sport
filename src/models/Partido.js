const mongoose = require("mongoose");

const partidoSchema = new mongoose.Schema(
    {   
        local: {
            type: String,
            required: true,
            trim: true 
        },
        rival: {
            type: String,
            required: true,
            trim: true 
        },
        logo: {   
                local: { url: String, public_id: String },
                rival: { url: String, public_id: String }
            },
        fecha: {
            type: Date,
            required: true
        },
        lugar: {
            type: String,
            trim: true
        },
        competicion: {
            type: String,
            required: true,
            trim: true
        },
        resultado: {
            type: String,
            trim: true
        }
    }, { timestamps: true }
);

module.exports = mongoose.model("Partido", partidoSchema);