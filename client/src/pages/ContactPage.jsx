import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react';

const ContactPage = () => {
    const form = useRef();
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: '',
    });

    const sendEmail = (event) => {
        event.preventDefault();

        emailjs.sendForm('service_e6eetny', 'template_3g3tlpz', event.target, '7vT6E2K7VQYKM9rNN')
            .then(response => {
                console.log('Correo electrónico enviado:', response);
                setIsMessageSent(true);
                // Limpiar el contenido del formulario
                setFormData({
                    user_name: '',
                    user_email: '',
                    message: '',
                });
            })
            .catch(error => console.error('Error de correo electrónico:', error));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-5">Contactanos</h1>
            <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-neutral-300 to-stone-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="text-white relative px-4 py-10 bg-gradient-to-r from-neutral-400 to-stone-300 shadow-lg sm:rounded-3xl sm:p-20">

                        <div className="text-center pb-6">
                            <h1 className="text-3xl text-gray-800 font-bold">¡Hola!</h1>

                            <p className="text-gray-700 mt-1">
                                Complete el siguiente formulario para enviarnos un mensaje
                            </p>
                        </div>

                        {isMessageSent && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">¡Mensaje enviado con éxito!</strong>
                            </div>
                        )}

                        <form ref={form} onSubmit={sendEmail}>
                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black bg-gradient-to-r from-neutral-400 to-stone-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
                                type="text" placeholder="Nombre" name="user_name" value={formData.user_name} onChange={handleInputChange} />

                            <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black bg-gradient-to-r from-neutral-400 to-stone-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
                                type="email" placeholder="Email" name="user_email" value={formData.user_email} onChange={handleInputChange} />

                            <textarea
                                className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-black bg-gradient-to-r from-neutral-400 to-stone-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
                                type="text" placeholder="Escribe tu mensaje aquí..." name="message" style={{ height: "121px" }} value={formData.message} onChange={handleInputChange}></textarea>

                            <div className="flex justify-between">
                                <input
                                    className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit" value="Send ➤" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactPage;
