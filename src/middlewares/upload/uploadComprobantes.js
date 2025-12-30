const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storageComprobante = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mr-sport/comprobantes",
        allowed_formats: ["jpg", "png", "webp"],
    }
});

module.exports = multer({ storage: storageComprobante });