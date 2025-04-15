/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * VERSÃO: 1.0
 *******************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js')

// Import do DAO de filmes
const filmeDAO = require('../../model/DAO/genero.js')

//------------------------------------------------------

const inserirGenero = async function (genero, contentType) {
    try{
        if (String(contentType).toLowerCase() === 'application/json') {


            if(
                !genero.nome || genero.nome.lenght > 80 
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else{
                const resultGenero = await filmeDAO.insertGenero(genero)

                if (resultGenero)
                    return message.SUCESS_CREATED_ITEM //201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    }catch(error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//------------------------------------------------------


const atualizarGenero = async function (id, filme, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {

            if (!id || id === '')
                return message.ERROR_INVALID_ID

            // Validação igual à de inserção
            if (
                !genero.nome || genero.nome.length > 80
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                const result = await generoDAO.updateGenero(id, genero)

                if (result)
                    return message.SUCESS_UPDATED_ITEM
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------

const excluirGenero = async function (id) {
    try {
        if  ( !id || id === '')
            return message.ERROR_INVALID_ID

        const filme = await genero.selectByIdFilme(id)

        if (filme) {
            const result = await generoDAO.deleteGenero(id)

            if (result) 
                return message.SUCESS_DELETED_ITEM
            else
                return message.ERROR_INTERNAL_SERVER_MODEL
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------
//???
/*const listarGenero = async function () {
    try {
        const resultGenero = await generoDAO.sele
    }*/

//------------------------------------------------------

const buscarGenero = async function (id) {
    try {
        if (!id || id === '')
            return message.ERROR_INVALID_ID

        const genero = await filmeDAO.selectByIdGenero(id)

        if (filme) {
            return {
                status: true,
                status_code: 200,
                genero: genero
            }
        } else {
            return message.ERROR_NOT_FOUND
        }

    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//------------------------------------------------------

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    buscarGenero,
}