const Producto = require("../models/Producto");

// CREAR PRODUCTO (ADMIN)
async function crearProducto(req, res) {
    try {
        const producto = await Producto.create({
            ...req.body,
            imagen: req.file?.path || null
        });
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: "Erro al crear producto" });
    }
}

// LISTAR PORDUCOTS (PUBLICO)
async function listarProductos(req, res) {
    try {
        const producto = await Producto.find().sort({ createdAd: -1 });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos" });
    }
}

// OBTENRE UN PRODUCTO
async function obtenerProducto(req, res) {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

        res.json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: "ID invalido" });
    }
}

// ACTUALIZAR PRODUCTO (ADMIN)
async function actualizarProducto(req, res) {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar producto" });
    }
};

// ELIMINAR PRODUCTO (ADMIN)
async function eliminarProducto(req, res) {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar producto" });
    }
};

module.exports = { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto };