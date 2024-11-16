import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Para la navegación entre rutas
import '../styles/styles.css'; // Estilos para el componente
import axios from 'axios'; // Para realizar las solicitudes HTTP al backend

const Login = () => {
    // Hooks de estado para manejar la información del formulario y los mensajes de error
    const [username, setUsername] = useState('');  // Guardará el valor del nombre de usuario
    const [password, setPassword] = useState('');  // Guardará el valor de la contraseña
    const [error, setError] = useState('');        // Guardará los mensajes de error

    const navigate = useNavigate(); // Hook de React Router para navegar a otras rutas

    // Función para manejar el envío del formulario de login
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la página)

        // Validar si los campos 'username' y 'password' no están vacíos
        if (!username || !password) {
            setError('Por favor, ingresa tu nombre de usuario y contraseña');
            return; // Detener el proceso si falta algún campo
        }

        try {
            // Realizar la solicitud POST al backend para hacer login
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                username,  // Enviar 'username' al backend
                password   // Enviar 'password' al backend
            });

            // Si el login es exitoso, el backend enviará el token
            console.log('Login exitoso:', response.data);

            // Guardar el token recibido en el localStorage para usarlo en futuras solicitudes
            localStorage.setItem('token', response.data.token);

            // Redirigir al usuario a la página de organizaciones después de un login exitoso
            navigate('/menuOrganizaciones');
        } catch (error) {
            // Manejo de errores si la solicitud falla
            if (error.response) {
                // Si el backend devuelve un error, mostrar el mensaje
                setError(error.response.data.message || 'Error de autenticación');
            } else {
                // Si no se puede conectar al servidor, mostrar un error genérico
                setError('No se pudo conectar con el servidor');
            }
        }
    };

    return (
        <div className="l-container">
            <span className="title">ReqWizards App</span>
            {/* Formulario para el login */}
            <form onSubmit={handleLogin}>
                <span className="User">Usuario</span>
                <input
                    type="text"
                    placeholder="Ejemplo: admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Actualizar el valor de username
                    required // Asegura que el campo no se deje vacío
                />
                <span className="contraseña">Contraseña</span>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el valor de password
                    required // Asegura que el campo no se deje vacío
                />
                <button type="submit">Ingresar</button>
                
                {/* Mostrar el mensaje de error si existe */}
                {error && <p className="error">{error}</p>}
            </form>
            {/* Enlace para recuperar la contraseña (opcional) */}
            <p>¿Olvidaste tu contraseña?</p>
        </div>
    );
};

export default Login;
