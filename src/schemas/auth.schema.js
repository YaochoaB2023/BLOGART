import { string, z } from 'zod'

export const registerSchema = z.object( {
    username: z.string( {
        required_error: "Username is a required field"
    } ),
    email: z.string( {
        required_error: "Email address is a required field"
    } ).email( {
        message: "Invalid Email Address"
    } ),
    password: z.string( {
        required_error: "Password is required field"
    } ).min( 5, {
        message: "Password must be at least 6 characters long"
    } )
} )

export const loginSchema = z.object( {
    email: z.string( {
        required_error: "Email address is a required field"
    } ).email( {
        message: "Invalid Email Address"
    } ),
    password: z.string( {
        required_error: "Password is required field"
    } ).min( 5, {
        message: "Password must be at least 6 characters long"
    } )
} )