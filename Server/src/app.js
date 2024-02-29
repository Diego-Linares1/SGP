import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import routes from './routes/auth.routes.js'
import tasksRoutes from './routes/taks.routes.js'
import proyectsRoutes from './routes/proyect.routes.js'

const app = express(); 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', routes); 
app.use('/api/tasks', tasksRoutes);
app.use('/api/proyects', proyectsRoutes);

export default app;