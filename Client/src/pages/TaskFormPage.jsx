import { useEffect } from "react";
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";
import { useTasks } from "../context/TaskContext";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";

export default function TaskFormPage() {

    const { register, handleSubmit, setValue  } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit((data) => {  
        if(params.id) {
            updateTask(params.id, data)
        } else {
            createTask(data)
        }
        navigate('/tasks')
    })

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const tasks = await getTask(params.id);
                console.log("idProyecto: ", tasks[0].IDPROYECTO)
                setValue('idProyecto', tasks[0].IDPROYECTO);
                setValue('idUsuario', tasks[0].IDUSUARIO);
                setValue('idEstado', tasks[0].IDESTADO);
                setValue('nombre', tasks[0].NOMBRE);
                setValue('descripcion', tasks[0].DESCRIPCION);
            }
        }
        loadTask();
    }, [params.id]);


    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="proyecto">Proyecto</Label>
                <Input
                    type="number"
                    name="proyect"
                    placeholder="Proyecto ID"
                    {...register("idProyecto")}
                    autoFocus
                />

                <Label htmlFor="user">Usuario</Label>
                <Input
                    type="number"
                    name="user"
                    placeholder="Usuario ID"
                    {...register("idUsuario")}
                    autoFocus
                />

                <Label htmlFor="estado">Estado</Label>
                <Input
                    type="number"
                    name="estado"
                    placeholder="Estado"
                    {...register("idEstado")}
                    autoFocus
                />

                <Label htmlFor="name">Nombre</Label>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    {...register("nombre")}
                    autoFocus
                />

                <Label htmlFor="name">Descripcion</Label>
                <Textarea
                    name="description"
                    id="description"
                    rows="3"
                    placeholder="Description"
                    {...register("descripcion")}
                ></Textarea>

                {/* <Label htmlFor="date">Date</Label> */}
                {/* <Input type="date" name="date" {...register("date")} /> */}
                <Button>Guardar Tarea</Button>
            </form>
        </Card>
    )
}