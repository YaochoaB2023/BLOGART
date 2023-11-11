import '../css/obrasForm.css'
import { useForm } from "react-hook-form";
import { useObras } from "../context/ObrasContext";

const ObraFormPage = () =>
{

  const { register, handleSubmit } = useForm();

  const {createObra} = useObras()

  const onSubmited = handleSubmit((data) => {
    createObra(data)
    console.log(data)
  }) 

  return (
    <>
      <div className='FormularioObras'>
            <div className='flex flex-col'>
                <p className="title1">Registro de Obra </p>
                <div className='card2'>
                    <form onSubmit={onSubmited} className="form3">
                        <label>
                            <input className="input1" type="text" {...register('title')} placeholder="" required />
                            <span className='letra'>Nombre</span>
                        </label>
                        <div className="group">
                            <textarea placeholder="‎" type="text" {...register('description')} id="description" name="description" rows="5" required></textarea>
                            <label htmlFor="description">Descripcion</label>
                        </div>
                        <div>
                          <button type='submit' className="boton1">Montar</button>
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