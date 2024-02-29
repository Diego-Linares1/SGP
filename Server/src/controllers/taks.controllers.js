import oracledb from 'oracledb';

import db from '../models/db.js'

export const getTasks = async (req, res) => {

    const consult = `SELECT * FROM tarea`;

    const conexion = await db();

    const result = await conexion.execute(
        consult,
        {  },
        { outFormat: oracledb.OBJECT }
    );

    if (!result.rows[0]) return res.status(400).json({ message: "Tareas no encontradas" })

    console.log("Tareas Encontradas: ", result.rows)

    res.json(result.rows)
}

export const getTask = async (req, res) => {

    const idTarea = req.params.id;

    try {
        const conexion = await db();

        const sql = `SELECT * FROM tarea WHERE idTarea= :idTarea`;

        const result = await conexion.execute(sql, { idTarea }, {outFormat: oracledb.OBJECT});

        console.log('Tarea encontrada para modificar:', result.rows);

        res.json(result.rows);

    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
    }

}

export const createTask = async (req, res) => {

    const idProyecto = req.body.idProyecto;
    const idUsuario = req.body.idUsuario;
    const idEstado = req.body.idEstado;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;

    console.log("Nombre de la tarea: ", nombre)

    const sql = `INSERT INTO tarea (idProyecto, idUsuario, idEstado, nombre, descripcion) VALUES (:idProyecto, :idUsuario, :idEstado, :nombre, :descripcion)`;

    const rows =  {idProyecto, idUsuario, idEstado, nombre, descripcion}
    console.log("lo que se enviara : ", rows)

    try {

        const conexion = await db();

        const result = await conexion.execute(sql, { idProyecto, idUsuario, idEstado, nombre, descripcion},{autoCommit:true});
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
    const descripcion = req.body.descripcion;
    const idTarea = req.params.id;

    console.log("id de la tarea a actualizar: ", idTarea)

    try {
        const conexion = await db();

        const sql = `UPDATE tarea SET nombre = :nombre, descripcion = :descripcion WHERE idTarea = :idTarea`;

        const result = await conexion.execute(sql, { nombre, descripcion, idTarea }, { outFormat: oracledb.OBJECT });
        conexion.commit();

        console.log('Filas actualizadas:', result.rowsAffected);

        res.json(result.rows)

    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
    }
}

export const deleteTask = async (req, res) => {

    const idTarea = req.body.idTarea;

    console.log("id de la tarea a eliminar: ", idTarea)
    console.log("REQ BODY: ", req.body)

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



