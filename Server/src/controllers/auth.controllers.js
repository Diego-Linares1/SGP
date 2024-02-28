import oracledb from 'oracledb';
import jwt from 'jsonwebtoken';

import db from '../models/db.js'
import crearToken from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config/key.token.js';

export const login = async(req, res) => {

    const email  = req.body.email;
    const password = req.body.password;

    console.log("email: ", email,"passord: ", password)

    const consult = `SELECT * FROM usuario WHERE correo = :email AND contrasenia =:password`

    try {

        const conexion = await db();

        const result = await conexion.execute(
            consult, 
            { email, password }, 
            { outFormat: oracledb.OBJECT }
        );
        
        const usuarioEncontrado = result.rows[0];

        if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario no encontrado" })

        const token = await crearToken({id: usuarioEncontrado.IDUSUARIO})

        res.cookie('token', token);
        
        console.log('token LOGIN:', token)

        res.json(
            {
                idUsuario: usuarioEncontrado.IDUSUARIO,
                idRol: usuarioEncontrado.IDROL,
                nombre: usuarioEncontrado.NOMBRE,
                apellido: usuarioEncontrado.APELLIDO,
                correo: usuarioEncontrado.CORREO,
                contrasenia: usuarioEncontrado.CONTRASENIA
            }
        )

    } catch (error) {
        console.log(error)
    }
}

export const logout = async(req, res) => {
    res.cookie('token', '', {expires: new Date(0)})
    return res.sendStatus(200);
};

export const profile = async(req, res) => {
    
    const consult = `SELECT * FROM usuario`;

    const conexion = await db();


    const result = await conexion.execute(
        consult, 
        {  }, 
        { outFormat: oracledb.OBJECT }
    );
    
    const usuarioEncontrado = result.rows[0];


    if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario no encontrado" })
    

    return res.json(
        {
            idUsuario: usuarioEncontrado.IDUSUARIO,
            idRol: usuarioEncontrado.IDROL,
            nombre: usuarioEncontrado.NOMBRE,
            apellido: usuarioEncontrado.APELLIDO,
            correo: usuarioEncontrado.CORREO,
            contrasenia: usuarioEncontrado.CONTRASENIA
        }
    );
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    console.log("entro a verificar el token del usuario logeado")

    if (!token) return res.status(400).json({ message: "Token no verificado" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {

        if(err) return res.status(401).json({ message: 'Token no verificado' })
        
        console.log("Usuario verificado: ", user)
        
        const usuarioEncontradoId = user.id;

        console.log("Id del usuario: ", usuarioEncontradoId)

        const consult = `SELECT * FROM usuario WHERE idUsuario = :usuarioEncontradoId`;

        try {

            
            const conexion = await db();
            
            console.log("Comenzo hacer las consulta")

            const result = await conexion.execute(
                consult, 
                { usuarioEncontradoId }, 
                { outFormat: oracledb.OBJECT }
            );

            console.log("SALIO DE LA CONSULTA")

            const usuarioEncontrado = result.rows[0];

            console.log("Usuario encontrado: ", usuarioEncontrado)
    
            if (!usuarioEncontrado) return res.status(400).json({ message: "Usuario no encontrado" })
            
            return res.json(usuarioEncontrado)
    
        } catch (error) {
            console.log(error)
        }
    })
}