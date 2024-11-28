const { menu, pausa, leerInput } = require('./helpers/menu');
const Usuarios = require('./models/usuarios');
const guardarDB = require('./helpers/guardarArchivo');

const principal = async () => {
    let opt = 0;
    const usuarios = new Usuarios();

    do {
        opt = await menu();

        switch (opt) {
            case '1': // Crear usuario
                const nombre = await leerInput('Nombre: ');
                const apellido = await leerInput('Apellido: ');
                const telefono = await leerInput('Teléfono (opcional): ', true);
                const direccion = await leerInput('Dirección (opcional): ', true);
                usuarios.crearUsuario(nombre, apellido, telefono, direccion);
                guardarDB(usuarios._listado);
                break;

            case '2': // Listar todos los usuarios
                usuarios.listarUsuarios();
                break;

            case '3': // Listar usuarios completos
                usuarios.listarUsuariosNuevos();
                break;

            case '4': // Listar usuarios incompletos
                usuarios.listarUsuariosIncompletos();
                break;

            case '5': // Actualizar usuario
                const idActualizar = await usuarios.seleccionarUsuario(usuarios._listado, 'Seleccione el usuario a actualizar:');
                if (idActualizar) {
                    const nuevosDatos = {};
                    nuevosDatos.nombre = await leerInput('Nuevo nombre: ');
                    nuevosDatos.apellido = await leerInput('Nuevo apellido: ');
                    nuevosDatos.telefono = await leerInput('Nuevo teléfono: ');
                    nuevosDatos.direccion = await leerInput('Nueva dirección: ');
                    usuarios.actualizarUsuario(idActualizar, nuevosDatos);
                    guardarDB(usuarios._listado);
                }
                break;

            case '6': // Borrar usuario
                const idBorrar = await usuarios.seleccionarUsuario(usuarios._listado, 'Seleccione el usuario a borrar:');
                if (idBorrar) {
                    usuarios.borrarUsuario(idBorrar);
                    console.log('\nUsuario borrado correctamente.'.green);
                    guardarDB(usuarios._listado);
                }
                break;

            default:
                break;
        }

        if (opt !== '0') await pausa();
    } while (opt !== '0');
};

principal();
