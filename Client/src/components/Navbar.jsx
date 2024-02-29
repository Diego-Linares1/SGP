import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContex";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)
  console.log("usuario: ", user)

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/login"}>G3</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              {/* Welcome {user.username} */}
            </li>
            <li>
              <ButtonLink to="/add-task">Agregar Tareas</ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
                <h1>Sistema de gestion de proyectos</h1>    
            </li>
            
          </>
        )}
      </ul>
    </nav>
  );
}