const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storageLogo = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mr-sport/logos",
        allowed_formats: ["png", "webp"],
        transformation: [{ width: 300, height: 300, crop: "fit", background: "transparent" }]
    }
});

module.exports = multer({ storage: storageLogo });