const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storageJugador = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mr-sport/jugadores",
        allowed_formats: ["jpg", "png", "webp"],
        transformation: [{ width: 400, height: 500, crop: "fill", gravity: "face" }]
    }
});

module.exports = multer({ storage: storageJugador });