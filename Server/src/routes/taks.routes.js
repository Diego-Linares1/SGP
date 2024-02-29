import Router from 'express'

import {authRequired} from '../middlewares/validationToken.js'
import {getTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/taks.controllers.js'

const router = Router();

router.get('/listar', authRequired, getTasks)

router.get('/tasks/:id', authRequired, getTask)

router.post('/agregar', authRequired, createTask)

router.put('/actualizar/:id', authRequired, updateTask)

router.delete('/eliminar', authRequired, deleteTask)


export default router;