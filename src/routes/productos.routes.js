const express = require("express");
const router = express.Router();

const { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// PUBLICO
router.get("/", listarProductos);
router.get("/:id", obtenerProducto);

// ADMIN
router.post("/", auth, admin, crearProducto);
router.put("/:id", auth, admin, actualizarProducto);
router.delete("/:id", auth, admin, eliminarProducto);

module.exports = router;