import { useAuth } from "../context/AuthContext";
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react";

const ProfilePage = () => {

    const { register, handleSubmit } = useForm();
    const { user, getProfileUser, updateProfile } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(null);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
    setModalOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('username', data.username);
            formData.append('email', data.email);
            if (selectedImage) {
                formData.append('file', selectedImage);
            }

            await updateProfile(formData);
        } catch (error) {
            console.error('Error al enviar el formulario de actualización:', error);
        }
    };

    useEffect(() => {
        getProfileUser();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div>
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-32 bg-white shadow-xl rounded-lg text-gray-900">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <label className="">

                        <img
                            className="object-cover object-center w-32 h-32 rounded-full"
                            src={user.imageUrl ? `http://localhost:5000/${user.imageUrl}` : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'}
                            alt='Imagen de perfil'
                        />
                    </label>
                </div>
                <div className="text-center mt-2">
                    <h2 className="font-bold">{user.username}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-gray-500">id: {user.id}</p>
                </div>
                <div onClick={() => openModal()} className="p-4 border-t mx-8 mt-2">
                    <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Editar Info</button>
                </div>
            </div>

            {/* update user */}
            {isModalOpen && (
            <div className="modal-overlay">
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-20 bg-white shadow-xl rounded-lg text-gray-900">
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white rounded px-8 pt-6">
                    <div className="rounded-t-lg h-32 overflow-hidden">
                        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
                    </div>
                    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                        <label className="cursor-pointer">
                            <input
                                type="file"
                                name="file"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <img
                                className="object-cover object-center w-32 h-32 rounded-full"
                                src={user.imageUrl ? `http://localhost:5000/${user.imageUrl}` : 'https://via.placeholder.com/150'}
                                alt='Imagen de perfil'
                            />
                        </label>
                    </div>
                    <div className="text-center mt-2">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" {...register('username')} placeholder={user.username}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" {...register('email')} placeholder={user.email}/>
                        </div>
                    </div>
                    <div className="p-4 border-t mx-8 mt-2">
                        <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Confirmar</button>
                        <button onClick={closeModal} className="mt-2 w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">cerrar</button>
                    </div>
                </form>
            </div>
            </div>
                  )}

        </div>
    )
}

export default ProfilePage;
