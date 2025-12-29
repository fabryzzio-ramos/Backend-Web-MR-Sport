const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storageBanners = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "mr-sport/banners",
        allowed_formats: ["jpg", "png", "webp"],
        transformation: [{ width: 1200, height: 675, crop: "fill" }]
    }
});

module.exports = multer({ storage: storageBanners });