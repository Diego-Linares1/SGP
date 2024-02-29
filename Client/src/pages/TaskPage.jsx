import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/tasks/TasksCard";
import { ImFileEmpty } from "react-icons/im";

export default function TaskPage() {
    const { tasks, getTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) return (<h1>No hay tareas</h1>)

    return (
        <div className="h-[calc(100vh-100px)] flex-col items-center justify-center">
            <div className='w-full flex justify-center'>
                <h1 className='font-mono text-3xl font-bold pb-5 pt-5'>TAREAS</h1>
            </div>
            <div>
                {tasks.length === 0 && (
                    <div className="flex justify-center items-center">
                        <div>
                            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
                            <h1 className="font-bold text-xl">
                                No hay tareas
                            </h1>
                        </div>
                    </div>
                )}


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task.IDTAREA} />
                    ))}
                </div>
            </div>

        </div>

    );
}