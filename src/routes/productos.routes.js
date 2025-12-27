const express = require("express");
const router = express.Router();

const { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const upload = require("../middlewares/upload");

// PUBLICO
router.get("/", listarProductos);
router.get("/:id", obtenerProducto);

// ADMIN
router.post("/", auth, admin, upload.single("imagen"), crearProducto);
router.put("/:id", auth, admin, upload.single("imagen"), actualizarProducto);
router.delete("/:id", auth, admin, eliminarProducto);

module.exports = router;