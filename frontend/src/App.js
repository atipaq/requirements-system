// frontend/src/app.js

import Login from './view/Login.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MenuOrganizaciones from './view/MenuOrganizaciones.js';
import ListaProyectos from './view/ListarProyectos.js';
import RegistroOrganizacion from './view/RegistroOrganizacion.js';
import RegistroProyecto from './view/RegistroProyecto.js';
import MenuProyecto from './view/MenuProyecto.js';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menuOrganizaciones" element={<MenuOrganizaciones />} />
          <Route path="/registroOrganizaciones" element={<RegistroOrganizacion />} />
          <Route path="/listarproyectos" element={<ListaProyectos />} />
          <Route path="/registroProyecto" element={<RegistroProyecto />} />
          <Route path="/menuProyecto" element={<MenuProyecto />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
