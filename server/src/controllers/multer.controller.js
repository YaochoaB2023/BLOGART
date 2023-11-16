import multer from "multer";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Verifica y crea la carpeta "uploads" si no existe
        const uploadsFolder = 'uploads';
        if (!fs.existsSync(uploadsFolder)) {
          fs.mkdirSync(uploadsFolder);
        }
    
        cb(null, uploadsFolder);
      },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    },
});

export const uploadImage = (req, res) => {
  upload.single('file')(req, res, (err) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      // Devuelve el nombre del archivo en la respuesta
      res.status(200).json({ filename: req.file.filename });
  });
};

export const upload = multer({storage:storage})