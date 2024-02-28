import Router from 'express'

import {authRequired} from '../middlewares/validationToken.js'
import {getTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/taks.controllers.js'

const router = Router();

router.get('/proyects', authRequired, getTasks)

router.get('/proyects/:id', authRequired, getTask)

router.post('/proyects', authRequired, createTask)

router.put('/proyectos/:id', authRequired, updateTask)

router.delete('/tasks/:id', authRequired, deleteTask)


export default router;