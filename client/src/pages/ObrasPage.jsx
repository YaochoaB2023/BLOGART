import "../css/obrasPublic.css";
import Monalisa from "../images/la-monalisa.jpeg";
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

  // console.log(obras);
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
        await updateObra(selectedObra._id, updatedData);
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

  return (
    <>
      <div className="Obras">
        <h1 className="titulo1">Obras</h1>
        <div className="container">
          {obras.map((obra, index) => (
            <div key={obra.id || index} className="cuadro">
              <div className="Mona flex flex-col">
                <img src={Monalisa} className="Monalisa" />
              </div>
              <h1 className="nombre">
                <div className=" font-bold">Nombre:</div>
                {obra.nombre}
              </h1>
              <h1 className="descripcion">
                <div className=" font-bold">Descripcion:</div>
                {obra.descripcion}
              </h1>
              <h1 className="precio">
                <div className=" font-bold">Precio:</div>
                {obra.precio}
              </h1>
              <div className="boton">
                <button onClick={() => openModal(obra)}>Editar</button>
              </div>
              <div className="boton ">
                <button onClick={() => handleDeleteObra(obra._id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="font-bold">Editar Obra</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={updatedData.nombre}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, nombre: e.target.value })
                }
              />
            </label>
            <label>
              Descripción:
              <textarea
                value={updatedData.descripcion}
                onChange={(e) =>
                  setUpdatedData({
                    ...updatedData,
                    descripcion: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Precio:
              <input
                type="number"
                value={updatedData.precio}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, precio: e.target.value })
                }
              />
            </label>
            <button onClick={handleUpdateObra}>Actualizar</button>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ObrasPage;
