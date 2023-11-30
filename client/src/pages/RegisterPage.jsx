import '../css/registerpage.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import paisaje from '../images/paisaje.jpg'

function RegisterPage ()
{
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticathed, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    useEffect( () =>
    {
        if ( isAuthenticathed ) navigate( '/profile' );
    }, [ isAuthenticathed, navigate ] )

    const onSubmited = handleSubmit( async ( values ) =>
    {
        signup( values )
    } )



    return (
    <>
    <div className="tamaño min-h-screen flex box-border justify-center items-center mt-11">
        <div className="bg-gray-300 rounded-2xl flex max-w-3xl p-5 items-center">
            <div className="md:block hidden w-1/2 color3">
                <img className="rounded-2xl max-h-[1600px]" src={paisaje}  alt="login form image"/>
            </div>
            <div className="md:w-1/2 px-8">
                <h2 className="font-bold text-3xl text-[#002D74]">Registro</h2>
                <p className="text-sm mt-4 text-[#002D74]">Si no es miembro, conéctese fácilmente ahora.</p>

                <form onSubmit={onSubmited} className="flex flex-col gap-4">
                    
                    <input { ...register( 'email', { required: true } ) } className="email text-black bg-gray-100 p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Correo"/>
                    {
                      errors.email && <p className='text-red-500'>Email is Required</p>
                    }
                    <input { ...register( 'username', { required: true } ) } className="email text-black bg-gray-100 p-2 rounded-xl border" type="username" name="username" placeholder="Nombre de Usuario"/>
                    {
                        errors.username && <p className='text-red-500'>UserName is required</p>
                    }
                    <div className="relative">
                        <input {...register('password', { required: true })} className="bg-gray-100 p-2 rounded-xl border w-full text-black placeholder-gray-500" type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Contraseña" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" onClick={togglePasswordVisibility} className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100" viewBox="0 0 16 16">
                        {showPassword ?
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                            :
                            <path d="M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                        }
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onClick={togglePasswordVisibility} className="bi bi-eye-slash-fill absolute top-1/2 right-3 -z-1 -translate-y-1/2 cursor-pointer hidden" id="mama" viewBox="0 0 16 16">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"></path>
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"></path>
                        </svg>
                    </div>
                    <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">Registrar</button>
                    {
                      RegisterErrors.map( ( error, i ) => (
                        <div className='bg-red-500 text-white p-2 my-2 mb-5' key={ i }>
                          <h1>{ error }</h1>
                        </div>
                      ) )
                    }
                </form>
                <div className="mt-10 text-sm flex justify-between items-center container-mr">
                    <p className="mr-3 md:mr-0 ">Si ya tienes una cuenta..</p>
                    <a href="/Login" className="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Inicia Sesion</a>
                </div>
            </div>
        </div>
    </div>

    </>
    )
}

export default RegisterPage