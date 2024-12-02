// frontend/src/view/EditarProyecto.js
import React, { useState, useEffect } from "react";
import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/stylesRegistroProyecto.css';
import '../styles/styles.css';

const EditarProyecto = () => {
    
    const navigate = useNavigate();
    const irAMenuOrganizaciones = () => navigate("/menuOrganizaciones");
    const irAListaProyecto = () => navigate("/listaProyectos");
    const irALogin = () => navigate("/");


    const { id } = useParams(); // Obtener el ID del proyecto desde la URL
    console.log("ID del proyecto:", id);
    // Valores iniciales
    const [codigoProyecto, setCodigoProyecto] = useState("");
    const [versionProyecto, setVersionProyecto] = useState("0.01");
    const [nombreProyecto, setNombreProyecto] = useState(""); 
    const [fechaCreacionProyecto, setFechaCreacionProyecto] = useState("");
    const [fechaModificacionProyecto, setFechaModificacionProyecto] = useState("");
    const [estadoProyecto, setEstadoProyecto] = useState("");
    const [comentariosProyecto, setComentariosProyecto] = useState("");

    // Cargar los datos del proyecto al montar el componente
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/projects/${id}`)
                .then((response) => {
                    const { code, name, creationDate, modificationDate, status, comments } = response.data;
                    setCodigoProyecto(code);
                    setNombreProyecto(name);
                    setFechaCreacionProyecto(creationDate);
                    setFechaModificacionProyecto(modificationDate);
                    setEstadoProyecto(status);
                    setComentariosProyecto(comments);
                })
                .catch((error) => {
                    console.error("Error al cargar el proyecto:", error);
                    alert("Error al cargar el proyecto");
                });
        } else {
            console.error("El ID del proyecto no es válido");
            alert("ID del proyecto no válido");
        }
    }, [id]);

    // Manejar la actualización del proyecto
    const handleUpdate = () => {
        if (!id) {
            alert("El ID del proyecto es inválido.");
            return;
        }
    
        const updatedProject = {
            name: nombreProyecto,
            status: estadoProyecto,
            comments: comentariosProyecto,
        };
    
        console.log("ID recibido:", id);
    
        axios.put(`http://localhost:5000/api/projects/${id}`, updatedProject)
            .then(() => {
                alert("Proyecto actualizado correctamente");
                navigate("/listaProyectos");
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    alert("El proyecto no fue encontrado.");
                } else {
                    console.error("Error al actualizar el proyecto:", error);
                    alert("Error al actualizar el proyecto");
                }
            });
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
                                        onChange={(e) => setNombreProyecto(e.target.value)}
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
                                onChange={(e) => setComentariosProyecto(e.target.value)}
                                rows="3"
                                placeholder=""
                            ></textarea>
                        </div>
                        <div className="rp-buttons">
                    <button onClick={() => navigate("/listaProyectos")} className="rp-button">Cancelar</button>
                    <button onClick={handleUpdate} className="rp-button">Registrar Proyecto</button>
                </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default EditarProyecto;
