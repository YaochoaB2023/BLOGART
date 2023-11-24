import Carrito from '../models/carrito.models.js';
import taskModel from '../models/task.model.js';

export const getCarritoArte = async (req, res) => {
    try {
        const arteCarrito = await Carrito.find({
            user: req.user.id
        }).populate('user').lean();

        if (arteCarrito.length > 0) {
            res.json({ arteCarrito });
        } else {
            res.json({ message: "No hay productos en el carrito" });
        }
    } catch (error) {
        res.status(500).json("Error al encontrar el arte en el carrito");
    }
}


export const createCarritoArte = async (req, res) => {
    const { nombre, Urlimagen, precio } = req.body;

    try {
        const estaEnLaArte = await taskModel.findOne({ nombre });

        if (!estaEnLaArte) {
            return res.status(400).json({ message: "Este arte no se ha encontrado en la base de datos" });
        }

        const elItemExiste = await Carrito.findOneAndUpdate({
            nombre,
            Urlimagen,
            precio,
            cantidad: 1,
            user: req.user.id,
        }, {
            $inc: { cantidad: 1 },
        }, { new: true });

        if (elItemExiste) {
            estaEnLaArte.EnCarrito = true;
            await estaEnLaArte.save();

            return res.json({
                message: 'La cantidad del producto ha aumentado',
                product: elItemExiste,
            });
        } else {
            const carritoArte = new Carrito({
                nombre,
                Urlimagen,
                precio,
                cantidad: 1,
                user: req.user.id,
            });

            estaEnLaArte.EnCarrito = true;
            await estaEnLaArte.save();

            await carritoArte.save();
            return res.json({
                message: 'El producto fue agregado al carrito',
                product: carritoArte,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error al crear el arte en el carrito");
    }
};



export const deleteArte = async (req, res) => {
    try {
        const { arteId } = req.params;

        const arteEnCarrito = await Carrito.findById(arteId);

        if (!arteEnCarrito) {
            return res.status(404).json({ message: "El arte no se encontró en el carrito" });
        }

        await Carrito.findByIdAndDelete(arteId);

        await taskModel.findOneAndUpdate(
            { nombre: arteEnCarrito.nombre },
            { $set: { EnCarrito: false } },
            { new: true }
        );

        res.json({ message: `El arte fue eliminado del carrito` });
    } catch (error) {
        res.status(500).json("Error al eliminarlo del carrito");
    }
}


