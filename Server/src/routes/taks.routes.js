import Router from 'express'

import {authRequired} from '../middlewares/validationToken.js'
import {getTasks, getTask, createTask, updateTask, deleteTask} from '../controllers/taks.controllers.js'

const router = Router();

router.get('/tasks', authRequired, getTasks)

router.get('/tasks/:id', authRequired, getTask)

router.post('/tasks', authRequired, createTask)

router.put('/tasks/:id', authRequired, updateTask)

router.delete('/tasks/:id', authRequired, deleteTask)


export default router;