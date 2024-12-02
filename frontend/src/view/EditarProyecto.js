// frontend/src/view/EditarProyecto.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/stylesRegistroProyecto.css';
import '../styles/styles.css';

const EditarProyecto = () => {
    const navigate = useNavigate();

    const irAMenuOrganizaciones = () => navigate("/menuOrganizaciones");
    const irAListaProyecto = () => navigate("/listaProyectos");
    const irALogin = () => navigate("/");

     //valores iniciales o cargados
     const [codigoProyecto, setCodigoProyecto] = useState("PROY-001");
     const [versionProyecto, setVersionProyecto] = useState("00.01");
     const [nombreProyecto, setNombreProyecto] = useState("Mocar Company"); 
     const [fechaCreacionProyecto, setFechaCreacionProyecto] = useState("23/10/2023");
     const [fechaModificacionProyecto, setFechaModificacionProyecto] = useState("26/10/2023");
     const [estadoProyecto, setEstadoProyecto] = useState("En curso");
     const [comentariosProyecto, setComentariosProyecto] = useState(" El proyecto será basado en el sector salud");
 
     // Función para manejar cambios en el input
     const handleChange = (event) => {
        setCodigoProyecto(event.target.value);
        setVersionProyecto(event.target.value);
        setNombreProyecto(event.target.value);
        setFechaCreacionProyecto(event.target.value);
        setFechaModificacionProyecto(event.target.value);
        setEstadoProyecto(event.target.value);
        setComentariosProyecto(event.target.value);
     };
    
    return (
        <div className="rp-container">
            <header className="rp-header">
                <h1>ReqWizards App</h1>
                <div className="flex-container">
                    <span onClick={irAMenuOrganizaciones}>Menú Principal /</span>
                    <span onClick={irAListaProyecto}>Mocar Company /</span>
                    <span>Editar Proyecto</span>
                </div>
            </header>

            <div className="rpsub-container">
                <aside className="sidebar">
                    <div className="bar-rp">
                        <p1 onClick={irAMenuOrganizaciones}>MENU PRINCIPAL</p1>
                    </div>
                    <div className="profile-section">
                        <div className="profile-icon">👤</div>
                        <p2>Nombre Autor - Cod</p2>
                        <button onClick={irALogin} className="logout-button">Cerrar Sesión</button>
                    </div>
                </aside>

                <main className="rp-content">
                    <h2>EDITAR PROYECTO</h2>
                    <section className="rp-organization">
                        <h3>
                            <label className="rp-codigo">Código </label>
                            <label className="rp-version">Versión</label>
                        </h3>
                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <input
                                    disabled
                                    type="text"
                                    className="inputBloq-field"
                                    value={codigoProyecto}  
                                    readOnly
                                    size="50"
                                />
                            </div>
                            <div className="fiel-vers">
                                <input
                                    disabled
                                    type="text"
                                    className="inputBloq-field"
                                    value={versionProyecto}
                                    readOnly
                                    size="50"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rp-organization-section">
                        <h3>Información del Proyecto</h3>
                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <h4>Nombre</h4>
                                <span class="message">
                                    <input
                                        className="inputnombre-field"
                                        type="text"
                                        name="name"
                                        value={nombreProyecto}  
                                        onChange={handleChange}
                                        placeholder=""
                                        size="125"
                                    />
                                    <span class="tooltip-text">Nombre del proyecto</span>
                                </span>
                            </div>
                        </div>

                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <h4>Fecha de Creación</h4>
                                <input
                                    disabled
                                    type="text"
                                    className="inputBloq-field"
                                    value={fechaCreacionProyecto}  
                                    readOnly
                                    size="50"
                                />
                            </div>
                            <div className="fiel-vers">
                                <h4>Fecha de Modificación</h4>
                                <input
                                    disabled
                                    type="text"
                                    className="inputBloq-field"
                                    value={fechaModificacionProyecto}  
                                    readOnly
                                    size="50"
                                />
                            </div>
                        </div>

                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <h4>Estado</h4>
                                <input
                                    disabled
                                    type="text"
                                    className="inputBloq-field"
                                    value={estadoProyecto}
                                    readOnly
                                    size="50"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rp-organizations-section">
                        <h3>Comentario</h3>
                        <div className="input-text">
                            <textarea
                                className="input-fieldtext"
                                name="comments"
                                value={comentariosProyecto} 
                                onChange={handleChange}
                                rows="3"
                                placeholder=""
                            ></textarea>
                        </div>
                        <div className="rp-buttons">
                            <button onClick={irAListaProyecto} className="rp-button" size="50">Cancelar</button>
                            <button onClick={irAListaProyecto} className="rp-button" size="50">Registrar Proyecto</button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default EditarProyecto;
