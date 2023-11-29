import { MercadoPagoConfig, Preference } from 'mercadopago';
import { acces_token } from '../config.js';
import Carrito from '../models/carrito.models.js';

export const createOrder = async (req, res) => {
    try {

        const userId = req.user;
        //obtener las obras de cada usuario
        const productosCarrito = await Carrito.find({
            user: userId.id
        }).populate('user').lean();

        // mapear en un array las obras del usuario 
        const Items = productosCarrito.map(producto => ({
            id: producto._id.toString(),
            title: producto.nombre,
            quantity: producto.cantidad,
            unit_price: producto.precio,
        }));
    
        console.log('todas las obras:', Items);
    
        // res.json({ items });
        // res.json({ message: "No hay productos en el carrito" });



        const client = new MercadoPagoConfig({ accessToken: acces_token, options: { timeout: 5000 } });

        const preference = new Preference(client);


        const result = await preference.create({
            body: {
                items: Items,
            }
        });

        const initPoint = result.init_point;
        res.send({ initPoint });
    } catch (error) {
        console.error('Error al crear la orden de pago:', error);

        // Manejo del error y respuesta al cliente
        res.status(500).json({ error: 'Error al crear la orden de pago' });
    }
};
