import { createContext, useState, useContext, useEffect } from "react";

import { loginRequest, logoutRequest , registerRequest, verifyTokenRequest, getProfileRequest } from "../api/auth";
import Cookies from 'js-cookie'

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>
{
    const context = useContext( AuthContext )
    if ( !context )
    {
        throw new Error( 'useAuth must be used within an AuthProvider' )
    }
    return context
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ( { children } ) =>
{
    const [ user, setUser ] = useState( null )
    const [ isAuthenticathed, setIsAuthenticathed ] = useState( false )
    const [ errors, setErrors ] = useState( [] )
    const [ loading, setLoading ] = useState( true )


    const signup = async ( user ) =>
    {
        try
        {
            const res = await registerRequest( user )
            console.log( res )
            setIsAuthenticathed( true )
            setUser( res.data )
        } catch ( error )
        {
            setErrors( error.response.data )
            console.log( error )
        }
    }

    const signin = async ( user ) =>
    {
        try
        {
            const res = await loginRequest( user )
            console.log( res.data )
            setIsAuthenticathed( true )
            setUser( res.data )
        } catch ( error )
        {
            console.log( error )
            if ( Array.isArray( error.response.data ) )
            {
                setErrors( error.response.data )
            }
            setErrors( [ error.response.data.message ] )

        }
    }

    const getProfileUser = async () => {
        try {
            const res = await getProfileRequest();
            console.log('Perfil del usuario:', res.data);
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
        }
    };

    const logOut = async () => {
        try {
            await logoutRequest();
            setIsAuthenticathed(false);
            setUser(null);
        } catch (error) {
            console.error("error durin logout", error)
        }
    }

    useEffect( () =>
    {
        if ( errors.length > 0 )
        {
            const timer = setTimeout( () =>
            {
                setErrors( [] )
            }, 5000 );
            return () => clearTimeout( timer );
        }
    }, [ errors ] )

    useEffect( () =>
    {
        async function checkLogin ()
        {
            const token = Cookies.get('token')

            if ( !token )
            {
                setIsAuthenticathed( false )
                setLoading(false)
                return setUser( null )
            }
            try
            {
                const res = await verifyTokenRequest( token )
                // console.log( res )
                if ( !res.data )
                {
                    setIsAuthenticathed( false )
                    setLoading( false )
                    return 
                }
                setIsAuthenticathed( true )
                setUser( res.data )
                setLoading(false)

            } catch ( error )
            {
                setIsAuthenticathed( false )
                setUser( null )
                setLoading(false)
            }
        }
        checkLogin()
    }, [] )


    return (
        <AuthContext.Provider value={ {
            signup,
            signin,
            logOut,
            user,
            isAuthenticathed,
            errors,
            loading,
            getProfileUser
            
        } }>
            { children }
        </AuthContext.Provider>
    )
}