const inquirer = require('inquirer');
require('colors');

class Usuarios {
    constructor() {
        this._listado = {};
    }

    crearUsuario(nombre, apellido, telefono = '', direccion = '') {
        const id = new Date().toISOString();
        const usuario = {
            id,
            nombre,
            apellido,
            telefono,
            direccion,
        };
        this._listado[id] = usuario;
    }

    listarUsuarios() {
        console.log('\nUsuarios:');
        if (Object.keys(this._listado).length === 0) {
            console.log('No hay usuarios registrados.'.red);
            return;
        }
        Object.values(this._listado).forEach((usuario, index) => {
            const idx = `${index + 1}.`.green;
            const { nombre, apellido, telefono, direccion } = usuario;
            const estado = nombre && apellido && telefono && direccion ? 'Completo'.green : 'Incompleto'.red;
            console.log(`${idx} ${nombre || 'N/A'} ${apellido || 'N/A'} - Tel: ${telefono || 'N/A'} - Dirección: ${direccion || 'N/A'} :: ${estado}`);
        });
    }

    listarUsuariosNuevos() {
        console.log('\nUsuarios completos:');
        const usuariosCompletos = Object.values(this._listado).filter(
            (usuario) => usuario.nombre && usuario.apellido && usuario.telefono && usuario.direccion
        );
        if (usuariosCompletos.length === 0) {
            console.log('No hay usuarios completos.'.yellow);
            return;
        }
        usuariosCompletos.forEach((usuario, index) => {
            const idx = `${index + 1}.`.green;
            console.log(`${idx} ${usuario.nombre} ${usuario.apellido}`);
        });
    }

    listarUsuariosIncompletos() {
        console.log('\nUsuarios con datos incompletos:');
        const usuariosIncompletos = Object.values(this._listado).filter(
            (usuario) => !(usuario.nombre && usuario.apellido && usuario.telefono && usuario.direccion)
        );
        if (usuariosIncompletos.length === 0) {
            console.log('No hay usuarios con datos incompletos.'.yellow);
            return;
        }
        usuariosIncompletos.forEach((usuario, index) => {
            const idx = `${index + 1}.`.green;
            console.log(`${idx} ${usuario.nombre || 'N/A'} ${usuario.apellido || 'N/A'}`);
        });
    }

    async seleccionarUsuario(usuarios, mensaje) {
        const choices = Object.keys(usuarios).map((id) => {
            const usuario = usuarios[id];
            return {
                value: id,
                name: `${usuario.nombre || 'N/A'} ${usuario.apellido || 'N/A'}`,
            };
        });

        if (choices.length === 0) {
            console.log('\nNo hay usuarios disponibles.'.yellow);
            return null;
        }

        const { id } = await inquirer.default.prompt([
            {
                type: 'list',
                name: 'id',
                message: mensaje,
                choices,
            },
        ]);

        return id;
    }

    actualizarUsuario(id, nuevosDatos) {
        if (this._listado[id]) {
            this._listado[id] = { ...this._listado[id], ...nuevosDatos };
        }
    }

    borrarUsuario(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
}

module.exports = Usuarios;
