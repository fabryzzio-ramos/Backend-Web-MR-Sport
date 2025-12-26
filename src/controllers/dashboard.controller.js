const Jugador = require("../models/Jugador");
const Partido = require("../models/Partido");
const Producto = require("../models/Producto");

async function dashboardController(req, res) {
    try {
        const totalJugadores = await Jugador.countDocuments();
        const totalPartidos = await Partido.countDocuments();
        const totalProductos = await Producto.countDocuments();

        const proximoPartido = await Partido.findOne({ fecha: { $gte: new Date() } }).sort({ fecha:1 });

        const jugadoresPorPosicion = await Jugador.aggregate([
            {
                $group: {
                    _id: "$posicion",
                    total: { $sum: 1}
                }
            }
        ]);

        const partidosPorMes = await Partido.aggregate([
            {
                $group: {
                    _id: { $month: "$fecha" },
                    total: { $sum: 1}
                }
            },
            {
                $sort: { "_id": 1}
            }
        ])
        res.json({
            totalJugadores,
            totalPartidos,
            totalProductos,
            proximoPartido,
            jugadoresPorPosicion,
            partidosPorMes
        });
    } catch (error) {
        res.status(500).json({ message: "Error al cargar dashboard" });
    }
}

module.exports = dashboardController;