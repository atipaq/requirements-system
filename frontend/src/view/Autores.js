import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFolder, FaPencilAlt, FaTrash } from "react-icons/fa";
import '../styles/stylesAutores.css'

const Autores = () => {
    const navigate = useNavigate();

    // Organizacion 
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);

    //Estado para los parámetros de búsqueda
    const [searchNombre, setSearchNombre] = useState();

    //Obtencion de la lista de Autores
    useEffect(() => {
        
        //Obtener o listar todas los autores
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/authors');
                setAuthors(response.data); // Establecer los datos de los autores en el estado
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Error al obtener los autores');
            }
        };

        fetchOrganizations();
    }, []);


    //Función para buscar autores
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/authors/search', {
                params: {
                    nombre: searchNombre,
                }
            });
            setAuthors(response.data);// actualizar los datos de busqueda 
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error al buscar autores');
        }
    };

    //Funcion de Eliminar Autor
    const handleDelete = async (autCod) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este autor?")) {
            console.log(`http://localhost:5000/api/authors/${autCod}`);
            try {
                await axios.delete(`http://localhost:5000/api/authors/${autCod}`);
                setAuthors(authors.filter((aut) => aut.autCod = autCod));
                alert("Autor eliminado correctamente");
            } catch (err) {
                setError(err.response ? err.response.data.error : "Error al eliminar el autor");
            }
        }
    };

    // Función para exportar a Excel
    const exportToExcel = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/authors/export/excel', {
                responseType: 'blob', // Importante para manejar archivos
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'authors.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error al exportar a Excel');
        }
    };

    // Función para exportar a PDF
    const exportToPDF = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/authors/export/pdf', {
                responseType: 'blob', // Importante para manejar archivos
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'authors.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Error al exportar a PDF');
        }
    };

    //Vavegancion de las Interfaces
    const irAMenuOrganizaciones = () => {
        navigate("/menuOrganizaciones");
    };
    const irANuevoAutor = () => {
        navigate("/nuevoAutor");
    };
    const irALogin = () => {
        navigate("/");
    };


    return (
        <div className="autor-container">
            <header className="autor-header">
                <h1>ReqWizards App</h1>
                <span>Menú Principal / Autores /Sistema Inventario/ Autores</span>
            </header>

            <div className="autorsub-container">

                <aside className="autor-sidebar">
                    {/*<div className="nav-button">
                            <button className="atras-button">Atras</button>
                            <button className="adelante-button">Adelante</button>
                        </div>*/}
                    <div className="bar-lista">
                        <p1 onClick={irAMenuOrganizaciones}>MENU PRINCIPAL</p1>
                    </div>

                    <div className="autor-profile-section" >
                        <div className="autor-profile-icon">👤</div>
                        <p2>Nombre Autor - Cod</p2>
                        <button onClick={irALogin} className="autor-logout-button" >Cerrar Sesión</button>
                    </div>
                </aside>

                <main className="autor-content">
                    <h2>AUTORES</h2>
                    <section className="autor-organizations-section">
                        {/* Busqueda  */}
                        <div className="autor-search-section-bar">
                            <button onClick={irANuevoAutor} className="autor-register-button">Nuevo Autor</button>
                            <div className="autor-sectionTextBuscar ">
                                <input className="autor-textBuscar" type="text" placeholder="Buscar" 
                                value={searchNombre}
                                onChange={(e) => setSearchNombre(e.target.value)}/>
                                <button className="autor-search-button" onClick={handleSearch}>Buscar</button>
                            </div>
                        </div>


                        {/* Listar Autores */}
                        {error ? (
                            <p>{error}</p>
                        ) : (
                            <table className="autor-centertabla">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Fecha </th>
                                        <th>Version</th>
                                        <th>Rol</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {authors.map((aut) => (
                                        <tr >
                                            <td>{aut.autCod}</td>
                                            <td>{aut.autNom}</td>
                                            <td>{aut.autFecMod}</td>
                                            <td>{aut.autVer}</td>
                                            <td>{aut.autRol}</td>
                                            <td>
                                                <button className="botton-crud">
                                                    <FaFolder style={{ color: "yellow", cursor: "pointer" }} />
                                                </button>
                                                <button className="botton-crud">
                                                    <FaPencilAlt style={{ color: "blue", cursor: "pointer" }} />
                                                </button>
                                                <button className="botton-crud" onClick={() => handleDelete(aut.autCod)}>
                                                    <FaTrash style={{ color: "red", cursor: "pointer" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <h4 className="autor-h4">Total de registros {authors.length}</h4>
                        <div className="autor-export-buttons">
                            <button className="autor-export-button" onClick={exportToExcel}>Excel</button>
                            <button className="autor-export-button" onClick={exportToPDF}>PDF</button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Autores