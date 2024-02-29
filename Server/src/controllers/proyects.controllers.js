import oracledb from 'oracledb';

import db from '../models/db.js'

export const getProyects = async (req, res) => {

    const idUsuario = req.body.idUsuario;

    const consult = `SELECT * FROM proyecto WHERE idUsuario= :idUsuario `;

    const conexion = await db();

    const result = await conexion.execute(
        consult,
        { idUsuario },
        { outFormat: oracledb.OBJECT }
    );

    console.log("Proyecto encontrado: ", result.rows[0])
    res.json(result.rows[0])
}
