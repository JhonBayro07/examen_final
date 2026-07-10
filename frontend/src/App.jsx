import React, { useEffect, useState } from "react";

function App() {
    const [roles, setRoles] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [idEditar, setIdEditar] = useState(null);

    const [usuario, setUsuario] = useState({
        rol_id: "",
        nombre: "",
        apePaterno: "",
        apeMaterno: "",
        user: "",
        password: "",
        estado: ""
    });

    const cargarRoles = () => {
        fetch("http://192.168.1.61:8080/api/roles/")
            .then((respuesta) => respuesta.json())
            .then((datos) => setRoles(datos));
    };

    const cargarUsuarios = () => {
        fetch("http://192.168.1.61:8080/api/usuarios/")
            .then((respuesta) => respuesta.json())
            .then((datos) => setUsuarios(datos));
    };

    useEffect(() => {
        cargarRoles();
        cargarUsuarios();
    }, []);

    const cambiarDato = (evento) => {
        setUsuario({
            ...usuario,
            [evento.target.name]: evento.target.value
        });
    };

    const guardarUsuario = (evento) => {
        evento.preventDefault();

        let metodo = "POST";
        let url = "http://192.168.1.61:8080/api/usuarios/";

        if (idEditar !== null) {
            metodo = "PUT";
            url = `http://192.168.1.61:8080/api/usuarios/${idEditar}`;
        }

        fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                alert(datos.mensaje);

                setUsuario({
                    rol_id: "",
                    nombre: "",
                    apePaterno: "",
                    apeMaterno: "",
                    user: "",
                    password: "",
                    estado: ""
                });

                setIdEditar(null);
                cargarUsuarios();
            });
    };

    const editarUsuario = (fila) => {
        setUsuario({
            rol_id: fila.rol_id,
            nombre: fila.nombre,
            apePaterno: fila.apePaterno,
            apeMaterno: fila.apeMaterno,
            user: fila.user,
            password: fila.password,
            estado: fila.estado
        });

        setIdEditar(fila.id);
    };

    const eliminarUsuario = (id) => {
        const confirmar = window.confirm(
            "¿Está seguro de eliminar este usuario?"
        );

        if (confirmar) {
            fetch(`http://192.168.1.61:8080/api/usuarios/${id}`, {
                method: "DELETE"
            })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    alert(datos.mensaje);
                    cargarUsuarios();
                });
        }
    };

    const mostrarNombreRol = (rolId) => {
        const rol = roles.find((fila) => fila.id == rolId);

        if (rol) {
            return rol.nombre;
        }

        return rolId;
    };

    return (
        <div>
            <h1>Sistema de Gestión de Usuarios</h1>

            <form onSubmit={guardarUsuario}>
                <label>Rol: </label>
                <select
                    name="rol_id"
                    value={usuario.rol_id}
                    onChange={cambiarDato}
                    required
                >
                    <option value="">Seleccione un rol</option>

                    {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                            {rol.nombre}
                        </option>
                    ))}
                </select>

                <br /><br />

                <label>Nombre: </label>
                <input
                    type="text"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={cambiarDato}
                    required
                />

                <br /><br />

                <label>Apellido paterno: </label>
                <input
                    type="text"
                    name="apePaterno"
                    value={usuario.apePaterno}
                    onChange={cambiarDato}
                    required
                />

                <br /><br />

                <label>Apellido materno: </label>
                <input
                    type="text"
                    name="apeMaterno"
                    value={usuario.apeMaterno}
                    onChange={cambiarDato}
                    required
                />

                <br /><br />

                <label>Usuario: </label>
                <input
                    type="text"
                    name="user"
                    value={usuario.user}
                    onChange={cambiarDato}
                    required
                />

                <br /><br />

                <label>Contraseña: </label>
                <input
                    type="password"
                    name="password"
                    value={usuario.password}
                    onChange={cambiarDato}
                    required
                />

                <br /><br />

                <label>Estado: </label>
                <select
                    name="estado"
                    value={usuario.estado}
                    onChange={cambiarDato}
                    required
                >
                    <option value="">Seleccione un estado</option>
                    <option value="activo">Activo</option>
                    <option value="no activo">No activo</option>
                </select>

                <br /><br />

                <button type="submit">
                    {idEditar === null
                        ? "Registrar usuario"
                        : "Actualizar usuario"}
                </button>
            </form>

            <h2>Lista de usuarios</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rol</th>
                        <th>Nombre</th>
                        <th>Apellido paterno</th>
                        <th>Apellido materno</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((fila) => (
                        <tr key={fila.id}>
                            <td>{fila.id}</td>
                            <td>{mostrarNombreRol(fila.rol_id)}</td>
                            <td>{fila.nombre}</td>
                            <td>{fila.apePaterno}</td>
                            <td>{fila.apeMaterno}</td>
                            <td>{fila.user}</td>
                            <td>{fila.estado}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => editarUsuario(fila)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => eliminarUsuario(fila.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;