import { MercadoPagoConfig, Preference } from 'mercadopago';
import { acces_token } from '../config.js';

export const createOrder = async (req, res) => {
    try {
        const client = new MercadoPagoConfig({ accessToken: acces_token, options: { timeout: 5000 } });

        const preference = new Preference(client);

        // Intenta crear la preferencia
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: '1056928547',
                        title: 'la monalisa',
                        quantity: 3,
                        unit_price: 100
                    }
                ],
            }
        });

        // Verifica si result.body está definido antes de acceder a init_point
        const initPoint = result.init_point;
        // Responde al frontend con initPoint o null
        res.send({ initPoint });
    } catch (error) {
        console.error('Error al crear la orden de pago:', error);

        // Manejo del error y respuesta al cliente
        res.status(500).json({ error: 'Error al crear la orden de pago' });
    }
};
