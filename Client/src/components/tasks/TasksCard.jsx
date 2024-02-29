import { useTasks } from "../../context/TaskContext";
import { Button, ButtonLink, Card } from "../ui";

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return ( 
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.NOMBRE}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task.IDTAREA)}>Eliminar</Button>
          <ButtonLink to={`/tasks/${task.IDTAREA}`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.DESCRIPCION}</p>
    </Card>
  );
}