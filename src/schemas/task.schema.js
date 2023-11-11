import { z } from "zod"

export const createTaskSchema = z.object( {
    nombre: z.string( {
        required_error: "Thitle is required"
    } ),
    descripcion: z.string( {
        required_error: "Description is required"
    } ),
    Urlimagen: z.string().optional(),
    precio: z.string( {
        required_error: "Description is required"
    } ),
    date: z.string().datetime().optional()
} )