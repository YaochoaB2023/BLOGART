import '../css/obrasForm.css';
import { useForm } from 'react-hook-form';
import { useObras } from '../context/ObrasContext';
import { useNavigate } from 'react-router-dom';
import { BsCloudDownload } from 'react-icons/bs'

const ObraFormPage = () => {
    
    const { register, handleSubmit } = useForm();
    const { createObra } = useObras();
    const navigate = useNavigate();

    const onSubmited = async (data) => {
        try {
            const formData = new FormData();
            formData.append('nombre', data.nombre);
            formData.append('descripcion', data.descripcion);
            formData.append('precio', data.precio);
            formData.append('file', data.file[0]);

            await createObra(formData); // Espera a que se resuelva la Promesa
            console.log('obra created', data);
            navigate('/obras');
        } catch (error) {
            console.error('error al crear la obra', error);
        }
    };

    return (
        <>
            <div className='FormularioObras'>
                  <div className=''>
                      <p className="titulo1 mt-5">Registro de Obra </p>
                      <div className='card2 flex'>
                          <form onSubmit={handleSubmit(onSubmited)} encType="multipart/form-data" className="form3">
                              <div className='flex flex-col'>
                              <label>
                                <input className="input1" type="text" {...register('nombre')} placeholder="" required />
                                <span className='letra'>Nombre</span>
                              </label>
                              <div className="group">
                                <textarea placeholder="‎" {...register('descripcion')} id="descripcion" name="descripcion" rows="5" required></textarea>
                                <label htmlFor="comment">Descripción</label>
                              </div>
                              <label>
                                <input className="input1" type="number" {...register('precio')} placeholder="" required />
                                <span className='letra'>Precio</span>
                              </label>
                              </div>
                              <div>
                                <button className="boton1">Montar</button>
                              </div>
                          </form>
                                <div className='imagenUrl  bg-[#ffffff49] relative'>
                                    <label  className='imagenUrl text-[1.4rem] cursor-pointer '>
                                        <input type='file' {...register('file')} name='file' className=' hidden' />
                                        <BsCloudDownload id='icon' className='icono absolute' />
                                    </label>
                                </div>
                      </div>
                  </div>
              </div>
        </>
    );
};

export default ObraFormPage;
