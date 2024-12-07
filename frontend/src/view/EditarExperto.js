// frontend/src/view/RegistroOrganizacion.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/stylesNuevoExperto.css';
import '../styles/styles.css';
import axios from "axios";

const NuevoExperto = () => {
    const navigate = useNavigate();

    // Datos controlados por el usuario
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefonoOrganizacion, setTelefonoOrganizacion] = useState("");
    const [representanteLegal, setRepresentanteLegal] = useState("");
    const [telefonoRepresentante, setTelefonoRepresentante] = useState("");
    const [ruc, setRuc] = useState("");
    const [contacto, setContacto] = useState("");
    const [telefonoContacto, setTelefonoContacto] = useState("");
    const [estado, setEstado] = useState("");
    const [comentario, setComentario] = useState("");

    // Datos automáticos
    const [codigo, setCodigo] = useState("");
    const [version, setVersion] = useState("0.01");
    const [fecha, setFecha] = useState("");
    const [tipo, setTipo] = useState("Contratante");
    const [autor, setAutor] = useState("AUT-00.00");

    const [error, setError] = useState(null);

    useEffect(() => {
        // Simular la obtención de datos automáticos desde el servidor
        const fetchAutomaticData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/organizations/last");
                const nextCode = response.data.nextCode || "ORG-001";
                setCodigo(nextCode);
                setFecha(new Date().toLocaleDateString());
            } catch (err) {
                console.error("Error al obtener datos automáticos:", err);
                setError("No se pudieron cargar los datos automáticos.");
            }
        };
        fetchAutomaticData();
    }, []);

    const irAMenuOrganizaciones = () => {
        navigate("/menuOrganizaciones");
    };
    const irAListaProyecto = () => {
        navigate("/listaProyectos");
    };
    const irAFuentes = () => {
    navigate("/fuentes");
    };
    const irAExpertos = () => {
    navigate("/expertos");
    };
    const irAMenuProyecto = (code) => {
    navigate(`/menuProyecto?procod=${code}`);
    };

    // Función para registrar la organización
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/organizations", {
                orgcod: codigo,
                orgver: version,
                orgfeccrea: fecha,
                orgtiporgcod: tipo,
                orgautcod: autor,
                orgnom: nombre,
                orgdir: direccion,
                orgtel: telefonoOrganizacion,
                orgrepleg: representanteLegal,
                orgtelrepleg: telefonoRepresentante,
                orgruc: ruc,
                orgcontact: contacto,
                orgtelcon: telefonoContacto,
                orgest: estado,
                orgcom: comentario,
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
                <div className="flex-container">
                <span onClick={irAMenuOrganizaciones}>Menú Principal /</span>
                <span onClick={irAListaProyecto}>Mocar Company /</span>
                <span onClick={irAMenuProyecto}>Sistema Inventario /</span>
                <span /*onClick={irAPlantilla}*/>Plantillas /</span>
                <span onClick={irAExpertos}>Expertos /</span>
                <span>Editar Experto</span>
                </div>
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
                    <h2>EDITAR EXPERTO</h2>
                    <section className="ro-organization">
                        <h3>
                            <label className="ro-codigo">Código </label>
                            <label className="ro-version">Versión</label>
                            <label className="ro-Fecha">Fecha</label>
                        </h3>
                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <input type="text" className="inputBloq-field"  readOnly size="30" />
                            </div>
                            <div className="ro-fiel-vers">
                                <input type="text" className="inputBloq-field"  readOnly size="30" />
                            </div>
                            <div className="ro-fiel-fecha">
                                <input type="text" className="inputBloq-field"  readOnly size="30" />
                            </div>
                        </div>

                        <section className="ro-organizations-section">
                        {/* Formulario editable */}
                        <h3>Información Personal</h3>
                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <h4>Apellido Parterno*</h4>
                                <span class="message">
                                    <input className="inputnombre-field" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} size="30" />
                                    <span class="tooltip-text">Editar el apellido parterno del experto</span>
                                </span>
                                
                            </div>
                            <div className="ro-fiel-vers">
                                <h4>Apellido Materno*</h4>
                                <span class="message">
                                    <input className="inputnombre-field" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} size="30" />
                                    <span class="tooltip-text">Editar el apellido materno del experto </span>
                                </span>
                            </div>
                            <div className="ro-fiel-fecha">
                                <h4>Nombres*</h4>
                                <span class="message">
                                <input className="inputnombre-field" type="text" value={telefonoOrganizacion} onChange={(e) => setTelefonoOrganizacion(e.target.value)} size="30" />
                                    <span class="tooltip-text">Editar el nombre del experto </span>
                                </span>
                            </div>
                        </div>

                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <h4>Experiencia* </h4>
                                <span class="message">
                                    <input className="inputnombre-field" type="text" value={representanteLegal} onChange={(e) => setRepresentanteLegal(e.target.value)} size="30" />
                                    <span class="tooltip-text"> Editar la experiencia que tiene el experto </span>
                                </span>
                                
                            </div>
                           
                        </div>

                        
                    </section>
                       
                    </section>
                    <section className="ro-organization">
                        <h3>
                            <label className="ro-codigo">Organizacion </label>
                            <label className="ro-version">Autor de plantilla </label>
                            <label className="ro-Fecha">Estado* </label>
                        </h3>
                        <div className="ro-cod-vers">
                            <div className="ro-fiel-cod">
                                <span class="message">
                                    <input type="text" className="inputBloq-field" readOnly size="30" />
                                    <span class="tooltip-text"> Codigo de la Organizacion </span>
                                </span>
                                
                            </div>
                            <div className="ro-fiel-vers">
                                <span class="message">
                                    <input type="text" className="inputBloq-field"  readOnly size="30" />
                                    <span class="tooltip-text"> Codigo del autor de la plantilla </span>
                                </span>
                                
                            </div>
                            <div className="ro-fiel-fecha">
                                <select id="estado" name="estado" required>
                                    <option value="">Seleccione un estado</option>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                    <option value="pendiente">Pendiente</option>
                                </select>
                            </div>
                        </div>
                    </section>
                    <section className="ro-organizations-section">
                        <h3>Comentario*</h3>
                        <div className="input-text">
                            <textarea className="input-fieldtext" rows="3" value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Añadir comentarios sobre la fuente"></textarea>
                        </div>

                        <div className="ro-buttons">
                            <button onClick={irAExpertos} className="ro-button">Cancelar</button>
                            <button onClick={handleRegister} className="ro-button">Guardar Cambios</button>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default NuevoExperto;
