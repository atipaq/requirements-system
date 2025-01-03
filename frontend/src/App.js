// frontend/src/app.js
import Login from './view/Login.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MenuOrganizaciones from './view/MenuOrganizaciones.js';
import ListaProyectos from './view/ListaProyectos.js';
import RegistroOrganizacion from './view/RegistroOrganizacion.js';
import RegistroProyecto from './view/RegistroProyecto.js';
import EditarProyecto from './view/EditarProyecto.js';
import MenuProyecto from './view/MenuProyecto.js';
import ActaAceptacion from './view/ActaAceptacion.js';
import Autores from './view/Autores.js';
import NuevoAutor from './view/NuevoAutor.js';
import EditarAutor from './view/EditarAutor.js';
import Roles from './view/Roles.js';
import NuevoRol from './view/NuevoRol.js';
import EditarRol from './view/EditarRol.js';
import Entrevistas from './view/Entrevistas.js';
import NuevaEntrevista from './view/NuevaEntrevista.js';
import EditarEntrevista from './view/EditarEntrevista.js';
import EditarOrganizacion from './view/EditarOrganizacion.js';
import EditarActaAceptacion from './view/EditarActaAceptacion.js';
import NuevaEvidencia from './view/NuevaEvidencia.js';
import Expertos from './view/Expertos.js';
import Fuentes from './view/Fuentes.js';
import NuevaFuente from './view/NuevaFuente.js';
import EditarFuente from './view/EditarFuente.js';
import NuevoExperto from './view/NuevoExperto.js';
import EditarExperto from './view/EditarExperto.js';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
                path="/menuOrganizaciones"
                element={
                    <PrivateRoute>
                        <MenuOrganizaciones />
                    </PrivateRoute>
                }
          />
          <Route path="/registroOrganizaciones" element={<RegistroOrganizacion />} />
          <Route path="/listaProyectos" element={<ListaProyectos />} />
          <Route path="/registroProyecto" element={<RegistroProyecto />} />
          <Route path="/menuProyecto" element={<MenuProyecto />} />
          <Route path="/actaAceptacion" element={<ActaAceptacion />} />
          <Route path="/autores" element={<Autores />} />
          <Route path="/nuevoAutor" element={<NuevoAutor />} />
          <Route path="/editarAutor" element={<EditarAutor />} />
          <Route path="/Roles" element={< Roles/>} />
          <Route path="/nuevoRol" element={<NuevoRol />} />
          <Route path="/editarRol" element={<EditarRol />} />
          <Route path="/entrevistas" element={<Entrevistas />} />
          <Route path="/nuevaEntrevista" element={<NuevaEntrevista />} />
          <Route path="/editarEntrevista" element={<EditarEntrevista />} />
          <Route path="/editarOrganizacion" element={<EditarOrganizacion />} />

          <Route path="/editarProyecto/:id" element={<EditarProyecto />} />
          <Route path="/editaractaAceptacion" element={<EditarActaAceptacion />} />
          <Route path="/nuevaEvidencia" element={<NuevaEvidencia />} />
          <Route path="/expertos" element={<Expertos />} />   
          <Route path="/fuentes" element={<Fuentes />} />   
          <Route path="/nuevaFuente" element={<NuevaFuente />} /> 
          <Route path="/editarFuente" element={<EditarFuente />} /> 
          <Route path="/nuevoExperto" element={<NuevoExperto />} /> 
          <Route path="/editarExperto" element={<EditarExperto />} /> 



        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
