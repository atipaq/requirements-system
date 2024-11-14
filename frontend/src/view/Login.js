import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                UsuNomUsu: username,
                UsuCon: password
            });
    
            // Login exitoso
            console.log('Login exitoso:', response.data);
            navigate('/menuOrganizaciones');
        } catch (error) {
            if (error.response) {
                // Mostrar mensaje de error del servidor
                setError(error.response.data.error || 'Error de autenticación');
            } else {
                setError('No se pudo conectar con el servidor');
            }
        }
    };

    return (
        <div className="l-container">
            <span className="title">ReqWizards App</span>
            <form onSubmit={handleLogin}>
                <span className="User">Usuario</span>
                <input
                    type="text"
                    placeholder="Ejemplo: AUT-0000"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <span className="contraseña">Contraseña</span>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>¿Olvidaste tu contraseña?</p>
        </div>
    );
};

export default Login;
