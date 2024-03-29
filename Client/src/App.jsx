import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContex';
import { LoginPage } from './pages/LoginPage';
import  TasksPage  from './pages/TaskPage';
import  TaskFormPage  from './pages/TaskFormPage';
import {ProtectedRoute} from  './route/ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import { Navbar } from './components/Navbar';

function HomePage() {
  return (
    <>
      <h1>PROYECTO DE BASE DE DATOS RELACIONES</h1>
      <h1>Oracle</h1>
    </>
  )
}

function App() {
  return(
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;