import '../css/registerpage.css'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterPage ()
{
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticathed, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();

    useEffect( () =>
    {
        if ( isAuthenticathed ) navigate( '/obras' );
    }, [ isAuthenticathed, navigate ] )

    const onSubmited = handleSubmit( async ( values ) =>
    {
        signup( values )
    } )



    return (
    <>
        <div className="registrate">
            <div className='flex flex-col'>
            {
                RegisterErrors.map( ( error, i ) => (
                    <div className='bg-red-500 text-white p-2 my-2' key={ i }>
                        { error }
                    </div>
                ) )
            }
            <p className="title1">Register </p>
            <form onSubmit={ onSubmited } className="form1">

                <label>
                    <input  className="input1" type="text" { ...register( "username", { required: true } ) } placeholder="" required />
                    <span className='letra'>Name</span>
                    {
                        errors.username && <p className='text-red-500'>UserName is required</p>
                    }
                </label>

                <label>
                    <input  className='input1' placeholder="" type="email" { ...register( "email", { required: true } ) } id="email" name="email" required/>
                    <span className='letra'>Email</span>
                    {
                        errors.email && <p className='text-red-500'>Email is required</p>
                    }
                </label>
                <label>
                    <input className="input1" type="password" { ...register( "password", { required: true } ) } placeholder="" required />
                    <span className='letra'>Password</span>
                    {
                        errors.password && <p className='text-red-500'>Password is required</p>
                    }
                </label>
                <button className="boton1">Submit</button>
                <p className="signin1">
                Already have an account? <a href="/Login">Sign in</a>
                </p>
            </form>
            </div>
        </div>
    </>
    )
}

export default RegisterPage