const Producto = require("../models/Producto");
const cloudinary = require("../config/cloudinary");

// CREAR PRODUCTO (ADMIN)
async function crearProducto(req, res) {
    try {
        const producto = await Producto.create({
            ...req.body,
            imagen: req.file? {url: req.file.path, public_id: req.file.filename} : null
        });

        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: "Erro al crear producto" });
    }
}

// LISTAR PORDUCOTS (PUBLICO)
async function listarProductos(req, res) {
    try {
        const producto = await Producto.find().sort({ createdAt: -1 });
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
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

        if (req.file) {
            if (producto.imagen?.public_id) {
                await cloudinary.uploader.destroy(producto.imagen.public_id);  // Agregado: elimina imagen anterior
            }
            producto.imagen = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        producto.nombre = req.body.nombre ?? producto.nombre;
        producto.precio = req.body.precio ?? producto.precio;  // Asumiendo campos como precio; ajusta según tu modelo
        producto.descripcion = req.body.descripcion ?? producto.descripcion;

        await producto.save();
        res.json(producto);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar producto" });
    }
};

// ELIMINAR PRODUCTO (ADMIN)
async function eliminarProducto(req, res) {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

        if (producto.imagen?.public_id) {
            await cloudinary.uploader.destroy(producto.imagen.public_id);  // Agregado: elimina imagen
        }

        await producto.deleteOne();
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar producto" });
    }
};

module.exports = { crearProducto, listarProductos, obtenerProducto, actualizarProducto, eliminarProducto };