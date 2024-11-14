import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/stylesRegistroOrganizacion.css';
import axios from "axios";

const RegistroOrganizacion = () => {
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState("ORG-003");
    const [version, setVersion] = useState("00.01");
    const [fecha, setFecha] = useState(new Date().toLocaleDateString().split("/").reverse().join("-"));
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefonoOrganizacion, setTelefonoOrganizacion] = useState("");
    const [representanteLegal, setRepresentanteLegal] = useState("");
    const [telefonoRepresentante, setTelefonoRepresentante] = useState("");
    const [ruc, setRuc] = useState("");
    const [contacto, setContacto] = useState("");
    const [telefonoContacto, setTelefonoContacto] = useState("");
    const [tipo, setTipo] = useState("Contratante");
    const [autor, setAutor] = useState("AUT-00.00");
    const [estado, setEstado] = useState("");
    const [comentario, setComentario] = useState("");
    const [error, setError] = useState(null);

    const irAMenuOrganizaciones = () => {
        navigate("/menuOrganizaciones");
    };

    // Función para registrar la organización
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/organizations", {
                orgcod: codigo,
                orgver: version,
                orgfecmod: fecha,
                orgnom: nombre,
                orgdir: direccion,
                orgtel: telefonoOrganizacion,
                orgrepleg: representanteLegal,
                orgtelrepleg: telefonoRepresentante,
                orgruc: ruc,
                orgcontact: contacto,
                orgtelcon: telefonoContacto,
                orgtiporgcod: tipo,
                orgautcod: autor,
                orgest: estado,
                orgcom: comentario,
                orgartcod: "ART-001", // Valor predeterminado si aplica
                orgusuid: 1 // Valor de usuario, modificar según el sistema de autenticación
            });
            if (response.status === 201) {
                alert("Organización registrada correctamente");
                irAMenuOrganizaciones();
            }
        } catch (err) {
            setError("Error al registrar la organización: " + err.message);
        }
    };

    return (
        <div className="ro-container">
            <header className="ro-header">
                <h1>ReqWizards App</h1>
                <span>Menú Principal / Registrar Empresa /</span>
            </header>

            <div className="rosub-container">
                <aside className="sidebar">
                    <div className="bar-ro">
                        <p1 onClick={irAMenuOrganizaciones}>MENU PRINCIPAL</p1>
                    </div>
                    <div className="profile-section">
                        <div className="profile-icon">👤</div>
                        <p2>Nombre Autor - Cod</p2>
                        <button onClick={() => navigate("/")} className="logout-button">Cerrar Sesión</button>
                    </div>
                </aside>

                <main className="ro-content">
                    <h2>NUEVO ORGANIZACIÓN</h2>
                    <section className="ro-organization">
                        <h3>
                            <label className="ro-codigo">Código </label>
                            <label className="ro-version">Versión</label>
                            <label className="ro-Fecha">Fecha</label>
                        </h3>
                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <input type="text" className="inputBloq-field" value={codigo} readOnly size="30" />
                            </div>
                            <div className="ro-fiel-vers">
                                <input type="text" className="inputBloq-field" value={version} readOnly size="30" />
                            </div>
                            <div className="ro-fiel-fecha">
                                <input type="text" className="inputBloq-field" value={fecha} readOnly size="30" />
                            </div>
                        </div>
                    </section>

                    <section className="ro-organization-section">
                        <h3>Información del Proyecto</h3>
                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <h4>Nombre</h4>
                                <input className="inputnombre-field" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} size="30" />
                            </div>
                            <div className="ro-fiel-vers">
                                <h4>Dirección</h4>
                                <input className="inputnombre-field" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} size="30" />
                            </div>
                            <div className="ro-fiel-fecha">
                                <h4>Teléfono Organización</h4>
                                <input className="inputnombre-field" type="text" value={telefonoOrganizacion} onChange={(e) => setTelefonoOrganizacion(e.target.value)} size="30" />
                            </div>
                        </div>

                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <h4>Representante Legal</h4>
                                <input className="inputnombre-field" type="text" value={representanteLegal} onChange={(e) => setRepresentanteLegal(e.target.value)} size="30" />
                            </div>
                            <div className="ro-fiel-vers">
                                <h4>Teléfono Representante</h4>
                                <input className="inputnombre-field" type="text" value={telefonoRepresentante} onChange={(e) => setTelefonoRepresentante(e.target.value)} size="30" />
                            </div>
                            <div className="ro-fiel-fecha">
                                <h4>RUC Organización</h4>
                                <input className="inputnombre-field" type="text" value={ruc} onChange={(e) => setRuc(e.target.value)} size="30" />
                            </div>
                        </div>

                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <h4>Contacto (Nombre y Apellido)</h4>
                                <input className="inputnombre-field" type="text" value={contacto} onChange={(e) => setContacto(e.target.value)} size="30" />
                            </div>
                            <div className="ro-fiel-vers">
                                <h4>Teléfono del Contacto</h4>
                                <input className="inputnombre-field" type="text" value={telefonoContacto} onChange={(e) => setTelefonoContacto(e.target.value)} size="30" />
                            </div>
                        </div>

                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <h4>Tipo</h4>
                                <input type="text" className="inputBloq-field" value={tipo} readOnly size="30" />
                            </div>
                            <div className="ro-fiel-vers">
                                <h4>Autor</h4>
                                <input type="text" className="inputBloq-field" value={autor} readOnly size="30" />
                            </div>
                            <div className="ro-fiel-fecha">
                                <h4>Estado</h4>
                                <input className="inputnombre-field" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} size="30" />
                            </div>
                        </div>
                    </section>

                    <section className="ro-organizations-section">
                        <h3>Comentario</h3>
                        <div className="input-text">
                            <textarea className="input-fieldtext" rows="3" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Añadir comentarios sobre el proyecto"></textarea>
                        </div>

                        <div className="ro-buttons">
                            <button onClick={irAMenuOrganizaciones} className="ro-button">Cancelar</button>
                            <button onClick={handleRegister} className="ro-button">Registrar</button>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default RegistroOrganizacion;