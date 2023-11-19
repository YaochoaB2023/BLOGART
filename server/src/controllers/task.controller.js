import Task from "../models/task.model.js"

export const getTasks = async ( req, res ) =>
{

    const tasks = await Task.find( {
        user: req.user.id
    } ).populate( "user" )
    res.json( tasks )
}

export const getAllObras = async ( req,res ) => {
    try {
        const tasks = await Task.find().populate("user");
        res.json(tasks);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const getTask = async ( req, res ) =>
{
    const task = await Task.findById( req.params.id ).populate( "user" )
    if ( !task ) return res.status( 404 ).json( { message: "Task not Found" } )
    res.status( 200 ).json( task )
}

export const createTask = async ( req, res ) =>
{
    try
    {
        console.log('creando tarea')
        const { nombre, descripcion, precio, date } = req.body

        const Urlimagen = req.file ? req.file.path: null;

        const newTask = new Task( {
            nombre,
            descripcion,
            precio,
            Urlimagen,
            date,
            user: req.user.id
        } )

        const savedTask = await newTask.save()
        console.log('tarea creada con exito', savedTask)
        res.status( 200 ).json( savedTask )
    } catch ( error )
    {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        // res.status( 500 ).json( { message: error.message } )
    }

}

export const deleteTask = async ( req, res ) =>
{
    try {
        const task = await Task.findByIdAndDelete( req.params.id )
        if ( !task ) return res.status( 404 ).json( { message: "Task not found" } )
        return res.sendStatus( 204 )   
    } catch (error) {
        console.error('Error deleting obra:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }

}

export const updateTask = async (req, res) => {
    try {
      console.log('actualizando imagen ')  
      const { nombre, descripcion, precio } = req.body;
      const Urlimagen = req.file ? req.file.path : null;
  
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
          nombre,
          descripcion,
          precio,
          Urlimagen // Actualiza la URL de la imagen si hay un nuevo archivo
        },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not Found" });
      }
  
      res.status(201).json(updatedTask);
    } catch (error) {
      console.error("Error updating obra", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  };

