const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storageProducto = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mr-sport/productos",
        allowed_formats: ["jpg", "png", "webp"],
        transformation: [{ width: 800, height: 1000, crop: "fill", gravity: "center" }]
    }
});

module.exports = multer({ storage: storageProducto });