const fs = require('fs');


const guardarDB = ( data ) => {

    const archivo =  './db/data.txt'

     
    fs.writeFileSync(archivo, JSON.stringify(data));

}

module.exports = guardarDB;