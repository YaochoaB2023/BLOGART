import '../css/obrasForm.css'
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { useObras } from "../context/ObrasContext";
import { useNavigate } from 'react-router-dom';

const ObraFormPage = () =>
{

  const { register, handleSubmit } = useForm();
  const {createObra} = useObras();
  const navigate = useNavigate();

  const onSubmited = handleSubmit((data) => {
    createObra(data)
    console.log(data)
  }) 

  useEffect(() => {
    if(createObra)(navigate('/add-obra'))
  },[createObra, navigate])

  return (
    <>
      <div className='FormularioObras'>
            <div className='flex flex-col'>
                <p className="title1">Registro de Obra </p>
                <div className='card2'>
                    <form onSubmit={onSubmited} className="form3">
                        <label>
                            <input className="input1" type="text" {...register('nombre')} placeholder="" required />
                            <span className='letra'>Nombre</span>
                        </label>
                        <div className="group">
                            <textarea placeholder="‎" type="text" {...register('descripcion')} id="description" name="descripcion" rows="5" required></textarea>
                            <label htmlFor="description">Descripcion</label>
                        </div>
                        <label>
                            <input className="input1" type="number" {...register('precio')} placeholder="" required />
                            <span className='letra'>Precio</span>
                        </label>
                        <div>
                          <button className="boton1">Montar</button>
                          {/* <button className="boton3">Continuar</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default ObraFormPage