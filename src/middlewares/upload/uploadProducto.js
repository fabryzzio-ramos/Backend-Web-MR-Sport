const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storageProducto = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mr-sport/productos",
        allowed_formats: ["jpg", "png", "webp"],
        transformation: [{ width: 500, height: 500, crop: "fill" }]
    }
});

module.exports = multer({ storage: storageProducto });