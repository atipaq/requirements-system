import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/stylesRegistroProyecto.css';

const RegistroProyecto = () => {

    const navigate = useNavigate();

    const irAMenuOrganizaciones = () => {
        navigate("/menuOrganizaciones");
    };
    const irAListaProyecto = () => {
        navigate("/listarProyecto");
    };
    const irALogin = () => {
        navigate("/");
    };


    return (
        <div className="rp-container">
            <header className="rp-header">
                <h1>ReqWizards App</h1>
                <span>Menú Principal / Mocar Company / Nuevo Proyecto /</span>
            </header>

            <div className="rpsub-container">

                <aside className="sidebar">
                    {/*<div className="nav-button">
                            <button className="atras-button">Atras</button>
                            <button className="adelante-button">Adelante</button>
                        </div>*/}
                    <div className="bar-rp">
                        <p1 onClick={irAMenuOrganizaciones}>MENU PRINCIPAL</p1>
                    </div>

                    <div className="profile-section" >
                        <div className="profile-icon">👤</div>
                        <p2>Nombre Autor - Cod</p2>
                        <button onClick={irALogin}className="logout-button" >Cerrar Sesión</button>
                    </div>
                </aside>

                <main className="rp-content">
                    <h2>NUEVO PROYECTO</h2>
                    <section className="rp-organization">
                        <h3>
                            <label className="rp-codigo">Código </label>
                            <label className="rp-version">Version</label>
                        </h3>
                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <input disabled type="text" className="inputBloq-field" value="PROY-001" readOnly size="50" />
                            </div>
                            <div className="fiel-vers">
                                <input disabled type="text" className="inputBloq-field" value="00.01" readOnly size="50" />
                            </div>
                        </div>
                    </section>

                    <section className="rp-organization-section">
                        <h3>Informacion del Proyecto</h3>
                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <h4>Nombre</h4>
                                <input className="inputnombre-field" type="text"placeholder=""  size="125" />
                            </div>
                        </div>

                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <h4>Fecha de Creacion</h4>
                                <input disabled type="text" className="inputBloq-field" value="23/10/23" readOnly size="50" />
                            </div>
                            <div className="fiel-vers">
                                <h4>Fecha de Modificacion</h4>
                                <input disabled type="text" className="inputBloq-field" value="26/10/23" readOnly size="50" />
                            </div>
                        </div>

                        <div className="rp-cod-vers">
                            <div className="fiel-cod">
                                <h4>Estado</h4>
                                <input disabled type="text" className="inputBloq-field" value="En proceso" readOnly size="50" />
                            </div>
                        </div>



                    </section>

                    <section className="rp-organizations-section">
                        <h3>Comentario</h3>

                        <div className="input-text">
                            <textarea className="input-fieldtext" rows="3" placeholder="Añadir comentarios sobre el proyecto"></textarea>
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

export default RegistroProyecto;
