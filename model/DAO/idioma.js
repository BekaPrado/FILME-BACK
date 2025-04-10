/***************************************************************************************************************************
 * OBJETIVO: Criar a comunicação com o Banco de Dados para fazer o CRUD de filme
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * Versão: 1.0
 **************************************************************************************************************************/
//Import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')
        
    //Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient()


//Objeto tipo JSON
//Funcao para inserir um novo filme


const insertIdioma = async function(idioma) {
    try {
        let sql = `insert into tb_idioma (
                     nome,
                     arquivo_url
                   ) values (
                     '${idioma.nome}',
                     '${idioma.arquivo_url || null}'
                   )`
        
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

const updateIdioma = async function(idioma) {
    try {
        let sql = `update tb_idioma set 
                     nome = '${idioma.nome}',
                     arquivo_url = '${idioma.arquivo_url || null}'
                   where id = ${idioma.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

const deleteIdioma = async function(id) {
    try {
        let sql = `delete from tb_idioma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        console.error(error)
        return false
    }
}

const selectAllIdiomas = async function() {
    try {
        let sql = 'select * from tb_idioma order by nome asc'
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        console.error(error)
        return false
    }
}

const selectByIdIdioma = async function(id) {
    try {
        let sql = `select * from tb_idioma where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
        return result.length > 0 ? result[0] : false
    } catch (error) {
        console.error(error)
        return false
    }
}

const selectByNomeIdioma = async function(nome) {
    try {
        let sql = `select * from tb_idioma where nome like '%${nome}%'`
        let result = await prisma.$queryRawUnsafe(sql)
        return result || false
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdiomas,
    selectByIdIdioma,
    selectByNomeIdioma
}