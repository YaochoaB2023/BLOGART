// import '../css/obrasForm.css';
// import { useForm } from 'react-hook-form';
// import { useObras } from '../context/ObrasContext';
// import { useNavigate } from 'react-router-dom';

// const ObraFormPage = () => {

//     const { register, handleSubmit } = useForm();
//     const { createObra } = useObras();
//     const navigate = useNavigate();

//     const onSubmited = handleSubmit((data) => {
//         try {
//             createObra(data);
//             console.log('obra created', data);
//             navigate('/obras');
//         } catch (error) {
//             console.error('error al crear la obra', error);
//         }
//     });

//     return (
//         <>
//             <div className='FormularioObras'>
//                 <div className='flex flex-col'>
//                     <p className="title1">Registro de Obra </p>
//                     <div className='card2'>
//                         <form onSubmit={onSubmited}  className="form3">
//                             <label>
//                                 <input className="input1" type="text" {...register('nombre')} placeholder="" required />
//                                 <span className='letra'>Nombre</span>
//                             </label>
//                             <div className="group">
//                                 <textarea placeholder="‎" type="text" {...register('descripcion')} id="description" name="descripcion" rows="5" required></textarea>
//                                 <label htmlFor="description">Descripcion</label>
//                             </div>
//                             <label>
//                                 <input className="input1" type="number" {...register('precio')} placeholder="" required />
//                                 <span className='letra'>Precio</span>
//                             </label>
//                             <label>
//                                 <input className="input1" type="file" {...register('file')} placeholder=""  />
//                                 <span className='letra'>imagen</span>
//                             </label>
//                             <div>
//                                 <button className="boton1">Montar</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ObraFormPage;
import '../css/obrasForm.css';
import { useForm } from 'react-hook-form';
import { useObras } from '../context/ObrasContext';
import { useNavigate } from 'react-router-dom';

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
                <div className='flex flex-col'>
                    <p className="title1">Registro de Obra</p>
                    <div className='card2'>
                        <form onSubmit={handleSubmit(onSubmited)} encType="multipart/form-data" className="form3">
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
                            <label>
                                <input className="input1" type="file" {...register('file')} placeholder="" />
                                <span className='letra'>Imagen</span>
                            </label>
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
