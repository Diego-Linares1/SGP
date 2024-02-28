import { useAuth } from "../context/AuthContex"

export default function TaskPage() {

    const { user } = useAuth();
    console.log(user);

    return (
        <>
        <h1>TasksPage</h1>
        </>
    )
}