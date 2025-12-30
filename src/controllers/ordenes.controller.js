const mongoose = require('mongoose');
const Orden = require("../models/Orden");
const Producto = require("../models/Producto");
const cloudinary = require("../config/cloudinary");

// CREAR ORDEN (USUARIO LOGUEADO)
async function crearOrden(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { productos } = req.body;
        if (!productos || productos.length === 0 ) return res.status(400).json({ mensaje: "Carrito vacio" });

        let total = 0;
        const productosOrden = [];

        // VALIDAR PRODUCTOS Y STOCK
        for (let item of productos) {
            const productoDB = await Producto.findById(item.producto).session(session);
            if (!productoDB) {
                await session.abortTransaction();
                return res.status(404).json({ mensaje: "Producto no existe" });
            }
            if (productoDB.stock < item.cantidad) {
                await session.abortTransaction();
                return res.status(400).json({ mensaje: `Stock insuficiente para ${productoDB.nombre}`})
            };

            productosOrden.push({
                producto: productoDB._id,
                nombre: productoDB.nombre,
                imagen: productoDB.imagen,
                precio: productoDB.precio,
                cantidad: item.cantidad
            });

            total += productoDB.precio * item.cantidad;
        }

        // DESCONTAR STOCK
        for (let item of productos) {
            await Producto.findByIdAndUpdate(item.producto, {
                $inc: { stock: -item.cantidad }
            }, {session});
        }

        // CREAR ORDEN
        const orden = new Orden({
            usuario: req.usuario.id,
            productos: productosOrden,
            total
        });
        
        await orden.save({session});
        await session.commitTransaction();

        await orden.populate("usuario", "nombre");
        res.status(201).json(orden);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ mensaje: "Error al crear orden" });
    } finally {
        session.endSession();
    }
}

// OBTENER ORDENES DEL  USUARIO
async function misOrdenes(req, res) {
    try {
        const ordenes = await Orden.find({ usuario: req.usuario.id }).populate("usuario", "nombre").populate("productos.producto", "nombre precio");
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

// CAMBIAR DE ESTADO (ADMIN)
async function actualizarEstadoOrden(req, res) {
    try {
        const { estado } = req.body;
        const estadosValidos = ["pendiente", "pagado", "enviado"];

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ mensaje: "Estado invalido" });
        }
        const orden = await Orden.findById(req.params.id);
        if (!orden) return res.status(404).json({mensaje: "Orden no encontrada"});

        orden.estado = estado
        await orden.save();

        res.json(orden);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar estado" });
    }
}

async function subirComprobante(req, res) {
    try {
        const orden = await Orden.findById(req.params.id);
        if (!orden) return res.status(404).json({mensaje: "Orden no encontrada"});

        if (!req.file) {
            return res.status(400).json({mensaje: "Comprobante requerido"});
        }

        orden.comprobante = {
            url: req.file.path,
            public_id: req.file.filename
        };

        await orden.save();
        res.json({ mensaje: "Comprobante enviado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al subir comprobante" });
    }
}

module.exports = { crearOrden, misOrdenes, todasOrdenes, actualizarEstadoOrden, subirComprobante };