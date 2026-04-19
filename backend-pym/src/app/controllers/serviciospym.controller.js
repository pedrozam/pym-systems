const jwt = require('jsonwebtoken');

const con = require('../../infraestructure/config/config');

const listarServiciospym = async (req, res) => {
    const estado = req.params.estado
    const query = {
        text: `select * from servicios.f_listar_servicios_estado($1)`,
        values: [estado]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

const listarTecnologias = async (req, res) => {
    const estado = req.params.estado
    const query = {
        text: `select * from servicios.f_listar_tecnologias_estado($1)`,
        values: [estado]
    };
    await con
        .query(query)
        .then((result) =>{
            //formateamos el resultado para que retorne solo Rows
            const resultado =  result.rows
            res.status(200).json({
                datos: resultado,
            })}
        )
        .catch((e) => res.status(500).json({ msg: 'Error:'+ e }))
}

module.exports = {
    listarServiciospym,
    listarTecnologias
}