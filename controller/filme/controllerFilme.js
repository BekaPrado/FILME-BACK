/*******************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * VERSÃO: 1.0
 *******************************************************************************************/

// Import das mensagens e códigos de status
const message = require('../../modulo/config.js')

// Import do DAO de filmes
const filmeDAO = require('../../model/DAO/filme.js')

// Inserir novo filme
const inserirFilme = async function (filme, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {

            // Validação dos campos obrigatórios
            if (
                !filme.nome || filme.nome.length > 80 ||
                !filme.duracao || filme.duracao.length > 5 ||
                !filme.sinopse ||
                !filme.data_lancamento || filme.data_lancamento.length > 10 ||
                (filme.foto_capa && filme.foto_capa.length > 200) ||
                (filme.link_trailer && filme.link_trailer.length > 200)
            ) {
                return message.ERROR_REQUIRED_FIELDS // 400
            } else {
                const resultFilme = await filmeDAO.insertFilme(filme)

                if (resultFilme)
                    return message.SUCESS_CREATED_ITEM // 201
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return message.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Atualizar filme
const atualizarFilme = async function (id, filme, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {

            if (!id || id === '')
                return message.ERROR_INVALID_ID

            // Validação igual à de inserção
            if (
                !filme.nome || filme.nome.length > 80 ||
                !filme.duracao || filme.duracao.length > 5 ||
                !filme.sinopse ||
                !filme.data_lancamento || filme.data_lancamento.length > 10 ||
                (filme.foto_capa && filme.foto_capa.length > 200) ||
                (filme.link_trailer && filme.link_trailer.length > 200)
            ) {
                return message.ERROR_REQUIRED_FIELDS
            } else {
                const result = await filmeDAO.updateFilme(id, filme)

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

// Excluir filme
const excluirFilme = async function (id) {
    try {
        if (!id || id === '')
            return message.ERROR_INVALID_ID

        const filme = await filmeDAO.selectByIdFilme(id)

        if (filme) {
            const result = await filmeDAO.deleteFilme(id)

            if (result)
                return message.SUCESS_DELETED_ITEM
            else
                return message.ERROR_INTERNAL_SERVER_MODEL
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Listar todos os filmes
const listarFilme = async function () {
    try {
        const resultFilme = await filmeDAO.selectAllFilme()

        if (resultFilme && resultFilme.length > 0) {
            return {
                status: true,
                status_code: 200,
                items: resultFilme.length,
                filmes: resultFilme
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Buscar filme por ID
const buscarFilme = async function (id) {
    try {
        if (!id || id === '')
            return message.ERROR_INVALID_ID

        const filme = await filmeDAO.selectByIdFilme(id)

        if (filme) {
            return {
                status: true,
                status_code: 200,
                filme: filme
            }
        } else {
            return message.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.error(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Exporta todas as funções
module.exports = {
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}
