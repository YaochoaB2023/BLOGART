import Obras from "../models/obras.model.js"

export const getObras = async ( req, res ) =>
{

    const obras = await Obras.find( {
        user: req.user.id
    } ).populate( "user" )
    res.json( obras )
}

export const getObra = async ( req, res ) =>
{

    const obra = await Obras.findById( req.params.id ).populate( "user" )
    if ( !obra ) return res.status( 404 ).json( { message: "obra not Found" } )
    res.status( 200 ).json( obra )
}

export const createObra = async ( req, res ) =>
{

    try
    {

        const { title, description, date } = req.body

        const newObra = new Obras( {
            title,
            description,
            date,
            user: req.user.id
        } )

        const savedObra = await newObra.save()
        res.status( 200 ).json( savedObra )
    } catch ( error )
    {
        res.status( 500 ).json( { message: error.message } )
    }

}

export const deleteObra = async ( req, res ) =>
{
    const obra = await Obras.findByIdAndDelete( req.params.id )
    if ( !obra ) return res.status( 404 ).json( { message: "obra not found" } )
    return res.sendStatus( 204 )

}

export const updateObra = async ( req, res ) =>
{

    const obra = await Obras.findByIdAndUpdate( req.params.id, req.body, {
        new: true
    } )
    if ( !obra ) return res.status( 404 ).json( { message: "obra not Found" } )
    res.status( 201 ).json( obra )

}

