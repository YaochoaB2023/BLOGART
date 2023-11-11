import '../css/loginPage.css'
import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage ()
{

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, isAuthenticathed , errors: signinErrors } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticathed) navigate( '/' );
  }, [ isAuthenticathed, navigate ])

  const onSubmited = handleSubmit( async ( data ) =>
  {
    signin( data )
  })

  return (
    <> 
    <div className="Login">
      <div className='flex flex-col'>
        <p className="title2">LogIn</p>
        <form onSubmit={onSubmited} className="form2">
            <label>
                <input className='input2' placeholder="" type="email" { ...register( 'email', { required: true } ) } id="email" name="email" required/>
                <span className='letra1'>Email</span>
                {
                  errors.email && <p className='text-red-500'>Email is Required</p>
                }
            </label>
            <label>
                <input className="input2" type="password" { ...register( 'password', { required: true } ) } placeholder="" required />
                <span className='letra1'>Password</span>
                {
                  errors.password && <p className='text-red-500'>Password is Required</p>
                }
            </label>
        {
          signinErrors.map( ( error, i ) => (
            <div className='bg-red-500 text-white p-2 my-2 mb-5' key={ i }>
              <h1>{ error }</h1>
            </div>
          ) )
        }
            <button className="boton2">LogIn</button>
        </form>
      </div>
    </div>
    </>

  )
}

export default LoginPage