import "../css/obrasPage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useObras } from "../context/ObrasContext";

const ObrasPage = () => {
  const { obras, getObras, updateObra, deleteObra } = useObras();
  const [isModalOpen, setModalOpen] = useState(null);
  const [selectedObra, setSelectedObra] = useState(null);

  const [updatedData, setUpdatedData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getObras();
  }, []);

  const openModal = (obra) => {
    setSelectedObra(obra);
    setModalOpen(true);

    setUpdatedData({
      nombre: obra.nombre,
      descripcion: obra.descripcion,
      precio: obra.precio,
    });
  };

  const closeModal = () => {
    setSelectedObra(null);
    setModalOpen(false);
  };

  const handleUpdateObra = async () => {
    try {
      if (selectedObra) {
        const formData = new FormData();
        formData.append('nombre', updatedData.nombre);
        formData.append('descripcion', updatedData.descripcion);
        formData.append('precio', updatedData.precio);
        if (selectedImage) {
          formData.append('file', selectedImage);
        }

        await updateObra(selectedObra._id, formData);
        console.log("obra actualizada con éxito");
        closeModal();
        getObras();
      } else {
        console.error("No se ha seleccionado ninguna obra para actualizar.");
      }
    } catch (error) {
      console.error("Error al actualizar la obra", error);
    }
  };

  const handleDeleteObra = async (obraId) => {
    const isConfirmed = window.confirm(
      "Estas seguro de que quieres eliminar esta obra?"
    );
    if (isConfirmed) {
      try {
        await deleteObra(obraId);
        console.log("obra deleted");
        getObras();
      } catch (error) {
        console.log(error);
      }
    }
    console.log("eliminacion cancelada por el usuario");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <>
      <h1 className="titulo1 mt-5">Mis Obras</h1>
      <div className="flex flex-wrap mt-10">
        {obras.map((obra, index) => (
          <div
            key={obra.id || index}
            className="max-w-sm mx-auto mb-4 rounded-lg shadow bg-gray-300 p-1"
            style={{ width: "300px", height: "400px" }}
          >
            <div>
              <img
                className="rounded-t-lg"
                src={`http://localhost:5000/${obra.Urlimagen}`}
                alt={`Imagen de ${obra.nombre}`}
              />
            </div>
            <div
              className="p-5 flex flex-col justify-between"
              style={{ height: "55%" }}
            >
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                  {obra.nombre}
                </h5>
                <p className="mb-3 font-normal text-gray-700 ">
                  {obra.descripcion}
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <div
                  onClick={() => openModal(obra)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Editar <FaEdit className="ml-2" />
                </div>
                <button
                  onClick={() => handleDeleteObra(obra._id)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Eliminar <FaRegTrashCan className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="card22 flex">
            <form encType="multipart/form-data" className="form3">
              <div className="flex flex-col">
                <label>
                  <input
                    className="input1"
                    type="text"
                    placeholder="Nombre"
                    value={updatedData.nombre}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, nombre: e.target.value })
                    }
                  />
                </label>
                <div className="group">
                  <textarea
                    placeholder="Descripcion"
                    id="descripcion"
                    name="descripcion"
                    rows="5"
                    value={updatedData.descripcion}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        descripcion: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <label>
                  <input
                    className="input1"
                    type="number"
                    placeholder="Precio"
                    value={updatedData.precio}
                    onChange={(e) =>
                      setUpdatedData({ ...updatedData, precio: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="">
                <button className="boton1 ml-5" onClick={handleUpdateObra}>
                  Actualizar
                </button>
                <button
                  className="boton1 ml-20 mt-2 bg-gray-700"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
              <p className="text-gray-500 mt-2">
                ¡¡Para cambiar la imagen haga click sobre la misma!!
              </p>
            </form>
            <div className="imagenUrl2">
              <label className="imagenUrl2 text-[1.4rem] cursor-pointer ">
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <img
                  className="rounded-t-lg"
                  src={`http://localhost:5000/${selectedObra.Urlimagen}`}
                  alt={`Imagen actual de ${selectedObra.nombre}`}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ObrasPage;
