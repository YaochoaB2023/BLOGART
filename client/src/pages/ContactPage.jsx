
const ContactPage = () => {
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

                    <form>

                        <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black bg-gradient-to-r from-neutral-400 to-stone-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
                                type="text" placeholder="Nombre" name="name"/>

                        <input
                                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-black bg-gradient-to-r from-neutral-400 to-stone-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
                                type="email" placeholder="Email" name="email"/>

                        <textarea
                                className="shadow mb-4 min-h-0 appearance-none border rounded h-64 w-full py-2 px-3 text-gray-100 bg-gradient-to-r from-neutral-400 to-stone-300 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-600"
                                type="text" placeholder="Escribe tu mensaje aca..." name="message" style={{ height: "121px" }}></textarea>

                        <div className="flex justify-between">
                            <input
                                className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit" value="Send ➤"/>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ContactPage
