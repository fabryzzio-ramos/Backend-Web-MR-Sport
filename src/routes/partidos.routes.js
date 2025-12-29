const express = require("express");
const router = express.Router();

const { crearPartido, listarPartidos, actualizarPartido, eliminarPartido } = require("../controllers/partidos.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const uploadLogo = require("../middlewares/upload/uploadLogo");

// PUBLICO
router.get("/", listarPartidos);

// ADMIN
router.post("/", auth, admin, uploadLogo.fields([{ name: "logoLocal", maxCount: 1 }, { name: "logoRival", maxCount: 1 }]), crearPartido);
router.put("/:id", auth, admin, uploadLogo.fields([{ name: "logoLocal", maxCount: 1 }, { name: "logoRival", maxCount: 1 }]), actualizarPartido);
router.delete("/:id", auth, admin, eliminarPartido);

module.exports = router;