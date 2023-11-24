import Carrito from '../models/carrito.models.js';
import taskModel from '../models/task.model.js';

export const getCarritoArte = async (req, res) => {
    try {
        const arteCarrito = await Carrito.find({
            user:req.user.id
        }).populate('user')
    
        if(arteCarrito){
            res.json({arteCarrito})
        }else{
            res.json({message : "No hay productos en el carrito"})
        }
    } catch (error) {
        res.json(500).json("Error al encontrear el arte en el carrito")
    }
}

export const createCarritoArte = async (req, res) => {
    const { nombre, Urlimagen, precio } = req.body;

    try {
        const estaEnLaArte = await taskModel.findOne({ nombre });

        if (!estaEnLaArte) {
            return res.status(400).json({ message: "Este arte no se ha encontrado en la base de datos" });
        }

        const elItemExiste = await Carrito.findOne({
            nombre,
            Urlimagen,
            precio,
            cantidad: 1,
            user: req.user.id,
        });

        if (elItemExiste) {
            elItemExiste.cantidad += 1;
            await elItemExiste.save();

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
        const {arteId} = req.params;

        const arteEnCarrito = await Carrito.findById(arteId);

        const{nombre, Urlimagen, precio, _id} = await taskModel.findOne({
            nombre: arteEnCarrito.nombre
        });

        await Carrito.findByIdAndDelete(arteId)

        await taskModel.findByIdAndUpdate(
            _id,
            {EnCarrito: false, nombre, Urlimagen, precio},
            {new: true}
        )
        .then((arte)=>{
            res.json({message: `El arte ${arte.nombre} fue eliminada del carrito`})
        })
    } catch (error) {
        res.status(500).json("Error al eliminarlo del carrito ")
    }


}

