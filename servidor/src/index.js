import app from './app.js';
import { conectarDB } from './db.js';

conectarDB();
app.listen(5000, () => console.log(`server on in port 5000`));