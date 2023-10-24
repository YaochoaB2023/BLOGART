import { z } from "zod"

export const createObraSchema = z.object( {
    title: z.string( {
        required_error: "Thitle is required"
    } ),
    description: z.string( {
        required_error: "Description is required"
    } ),
    date: z.string().datetime().optional()
} )