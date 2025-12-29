const Orden = require("../models/Orden");
const Producto = require("../models/Producto");

// CREAR ORDEN (USUARIO LOGUEADO)
async function crearOrden(req, res) {
    try {
        const { productos } = req.body;
        if (!productos || productos.length === 0 ) return res.status(400).json({ mensaje: "Carrito vacio" });

        let total = 0;
        const productosOrden = [];

        // VALIDAR PRODUCTOS Y STOCK
        for (let item of productos) {
            const productoDB = await Producto.findById(item.producto);
            if (!productoDB) return res.status(404).json({ mensaje: "Producto no existe" });
            if (productoDB.stock < item.cantidad) return res.status(400).json({ mensaje: `Stock insuficiente para ${productoDB.nombre}`});

            productosOrden.push({
                producto: productoDB._id,
                precio: productoDB.precio,
                cantidad: item.cantidad
            });

            total += productoDB.precio * item.cantidad;
        }

        // DESCONTAR STOCK
        for (let item of productos) {
            await Producto.findByIdAndUpdate(item.producto, {
                $inc: { stock: -item.cantidad }
            });
        }

        // CREAR ORDEN
        const orden = new Orden({
            usuario: req.usuario.id,
            productos: productosOrden,
            total
        });
        
        await orden.save();
        res.status(201).json(orden);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear orden" });
    }
}

// OBTENER ORDENES DEL  USUARIO
async function misOrdenes(req, res) {
    try {
        const ordenes = await Orden.find({ usuario: req.usuario.id }).populate("productos.producto", "nombre precio");
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ordenes" });
    }
};

// OBTENER TODAS (ADMIN)
async function todasOrdenes(req, res) {
    try {
        const ordenes = await Orden.find().populate("usuario", "nombre correo").populate("productos.producto", "nombre precio");

        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener ordenes" });
    }
};

module.exports = { crearOrden, misOrdenes, todasOrdenes };