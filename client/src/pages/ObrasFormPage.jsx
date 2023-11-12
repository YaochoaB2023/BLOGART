import '../css/obrasForm.css'
import { useForm } from "react-hook-form";
import { useObras } from "../context/ObrasContext";
import { useNavigate } from 'react-router-dom';

const ObraFormPage = () => {

  const { register, handleSubmit } = useForm();
  const {createObra} = useObras();
  const navigate = useNavigate();

  const onSubmited = handleSubmit((data) => {
    try {
      createObra(data)
      console.log('obra created',data)
      navigate('/obras')
    } catch (error) {
      console.error('error al crear la obra', error)
    }
  }) 



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