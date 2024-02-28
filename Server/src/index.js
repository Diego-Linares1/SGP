import app from "./app.js";
import db from './models/db.js'

const port = 4000;

db();

app.listen(port, () => {
    console.log(`Server encendido en el puerto ${port}`);
});





