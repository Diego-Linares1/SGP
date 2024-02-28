import oracledb from 'oracledb';

import db from '../models/db.js'

export const getTasks = async (req, res) => {

    const idUsuario = req.body.idUsuario;

    const consult = `SELECT * FROM tarea WHERE idUsuario= :idUsuario `;

    const conexion = await db();

    const result = await conexion.execute(
        consult,
        { idUsuario },
        { outFormat: oracledb.OBJECT }
    );

    if (!result.rows[0]) return res.status(400).json({ message: "Tarea no encontrada" })

    console.log("TareaEncontrada: ", result.rows[0])
    res.json(result.rows[0])
}

export const getTask = async (req, res) => {


}

export const createTask = async (req, res) => {

    const { idProyecto, idUsuario, idEstado, nombre, descripcion } = req.body;
    console.log(idProyecto)

    const sql = `INSERT INTO tarea (idProyecto, idUsuario, idEstado, nombre, descripcion) VALUES (:idProyecto, :idUsuario, :idEstado, :nombre, :descripcion)`;

    const rows = [[idProyecto, idUsuario, idEstado, nombre, descripcion]]

    try {

        const conexion = await db();

        const result = await conexion.executeMany(sql, rows);
        conexion.commit();

        if (!result) return res.status(400).json({ message: "Usuario no encontrado" })


        console.log('Tarea:', result.rowsAffected)

        res.json(result)


    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (req, res) => {

    const nombre = req.body.nombre;
    const idTarea = req.body.idTarea;

    try {
        const conexion = await db();

        const sql = `UPDATE tarea SET nombre = :nombre WHERE idTarea= :idTarea`;

        const options = {
            autoCommit: true,
        };

        const result = await conexion.execute(sql, { nombre, idTarea }, options);

        console.log('Filas actualizadas:', result.rowsAffected);

        res.json(result)

    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
    }
}

export const deleteTask = async (req, res) => {

    const idTarea = req.body.idTarea;

    try {
        const conexion = await db();

        const sql = `DELETE tarea WHERE idTarea= :idTarea`;

        const options = {
            autoCommit: true,
        };

        const result = await conexion.execute(sql, { idTarea }, options);

        console.log('Filas eliminadas:', result.rowsAffected);

        res.json(result)

    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
    }
}



