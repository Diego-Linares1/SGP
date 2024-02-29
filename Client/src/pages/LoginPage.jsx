import { useForm } from 'react-hook-form'
import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

import { Card, Message, Button, Input, Label } from "../components/ui";
import { useAuth } from '../context/AuthContex';

export function LoginPage() {

    const { register, handleSubmit } = useForm()

    const { signin, isAuthenticated } = useAuth()

    const navigate = useNavigate()

    const onSubmit = handleSubmit(data => {
        signin(data)
    })

    useEffect(() => {
        if (isAuthenticated) {
          navigate("/tasks");
        }
      }, [isAuthenticated]);

    return(
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <div className='w-full flex justify-center'>
                <h1 className='font-mono text-3xl font-bold'>MEDIATEC</h1>
            </div>
            <form onSubmit={onSubmit}>
                <Label htmlFor='email'>Email:</Label>
                <Input
                    label="Escribe tu email"
                    type='email'
                    name='email'
                    placeholder='tuemail@email.com'
                    {...register('email', { required: true })}
                />
                <Label htmlFor='password'>Contraseña</ Label>
                <Input 
                    type='password'
                    name='password'
                    placeholder='escribe tu contraseña'
                    {...register('password', { required: true })}
                />
                <div className='w-full flex justify-center'>
                    <Button>Login</Button>
                </div>
            </form>
            </div>
        </div>
    )
}