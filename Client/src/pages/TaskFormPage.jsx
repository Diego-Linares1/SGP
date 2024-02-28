import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";
import { useTasks } from "../context/TaskContext";
import { useForm } from "react-hook-form"
import { ComboBox } from "../components/ui/ComboBox";

export default function TaskFormPage() {

    const { register, handleSubmit } = useForm();

    const { createTask } = useTasks();

    console.log(createTask());

    const onSubmit = handleSubmit((data) => {
        data.estado = selectedOption?.value;
        createTask(data)
    })

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="proyecto">Proyecto</Label>
                <Input
                    type="number"
                    name="proyect"
                    placeholder="Proyecto ID"
                    {...register("number")}
                    autoFocus
                />

                <Label htmlFor="user">Usuario</Label>
                <Input
                    type="number"
                    name="user"
                    placeholder="Usuario ID"
                    {...register("number")}
                    autoFocus
                />

                <Label htmlFor="state">Estado</Label>
                <ComboBox selectedOption={selectedOption}/>

                <Label htmlFor="name">otro</Label>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    {...register("title")}
                    autoFocus
                />

                <Label htmlFor="title">Title</Label>

                {/* <Label htmlFor="date">Date</Label> */}
                {/* <Input type="date" name="date" {...register("date")} /> */}
                <Button>Save</Button>
            </form>
        </Card>
    )
}