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
            <div className='FormularioObras mt-20'>
                  <div className=''>
                  <h1 className="mb-10 text-center text-3xl font-bold mt-5">Subir Obra</h1>
                      <div className='card2 flex'>
                          <form onSubmit={handleSubmit(onSubmited)} encType="multipart/form-data" className="form3 flex flex-col ">
                              <div className='formulario flex'>
                                <div className='flex flex-col'>
                                    <label>
                                        <input className="input1" type="text" {...register('nombre')} placeholder="Nombre" required />
                                    </label>
                                    <div className="group">
                                        <textarea placeholder="Descripción" {...register('descripcion')} id="descripcion" name="descripcion" rows="5"  required></textarea>
                                    </div>
                                    <label>
                                        <input className="input1" type="number" {...register('precio')} placeholder="Precio" required />
                                    </label>
                                </div>
                                <div className='imagenUrl '>
                                    <label  className='imagenUrl text-[1.4rem] cursor-pointer '>
                                        <input type='file' {...register('file')} name='file' className=' hidden' />
                                        <BsCloudDownload id='icon' className='icono absolute' />
                                    </label>
                                 </div>
                              </div>
                              <div>
                                <button className="boton1">Montar</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
        </>
    );
};

export default ObraFormPage;
