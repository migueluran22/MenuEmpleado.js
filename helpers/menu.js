const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');



const preguntas = [
    {
        type: 'list',
        name: 'options',
        message: '¿Qué deseas hacer?',
        choices: [
            { value: '1', name: '1. Crear usuario' },
            { value: '2', name: '2. Listar todos los usuarios' },
            { value: '3', name: '3. Listar usuarios completos' },
            { value: '4', name: '4. Listar usuarios incompletos' },
            { value: '5', name: '5. Actualizar usuario' },
            { value: '6', name: '6. Borrar usuario' },
            { value: '0', name: '0. Salir' },
        ],
    },
];

const menu = async () => {

    console.clear();
    console.log('····························································'.green);
    console.log('       First Application'.blue);
    console.log('····························································'.green);

    const { options } = await inquirer.default.prompt(preguntas);
    return options;
    
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${`enter`.green}`
        }
    ]

    await inquirer.default.prompt(question);
}

  
const leerInput = async (message, optional = false) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (!optional && value.length === 0) {
                    return 'Por favor ingrese un valor.';
                }
                return true;
            },
        },
    ];
    const { desc } = await inquirer.default.prompt(question);
    return desc;
};


module.exports = {
    menu,
    pausa,
    leerInput
};