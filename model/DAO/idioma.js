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

//--------------------------------------------------
const insertIdioma = async function(idioma) {
    try {
        let sql = `insert into tb_idioma (
                     nome,
                     arquivo_url
                   ) 
                     values 
                     (
                     '${idioma.nome}',
                     '${idioma.arquivo_url}'
                   )`
        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------
const updateIdioma = async function(idioma) {
    try {
        let sql = `update tb_idioma set nome = '${idioma.nome}',
                                        arquivo_url = '${idioma.arquivo_url || null}'
                                        where id = ${idioma.id}`

        let resultIdioma = await prisma.$executeRawUnsafe(sql)

        if(resultIdioma){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }

}

//------------------------------------------------------


const deleteIdioma = async function(id) {
    try {
        let sql = `delete from tb_idioma where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//------------------------------------------------------

const selectAllIdiomas = async function() {
    try {
        let sql = 'select * from tb_idioma order by nome asc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------

const selectByIdIdioma = async function(id) {
    try {
        let sql = `select * from tb_idioma where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

         if(result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

//------------------------------------------------------


module.exports = {
    insertIdioma,
    updateIdioma,
    deleteIdioma,
    selectAllIdiomas,
    selectByIdIdioma,
    selectByNomeIdioma
}