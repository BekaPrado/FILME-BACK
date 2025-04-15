const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertSexo = async function(sexo) {
    try {
        let sql = `insert into tb_sexo (descricao) values ('${sexo.descricao}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateSexo = async function(sexo) {
    try {
        let sql = `update tb_sexo set descricao = '${sexo.descricao}' where id = ${sexo.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteSexo = async function(id) {
    try {
        let sql = `delete from tb_sexo where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllSexo = async function() {
    try {
        let sql = `select * from tb_sexo order by id desc`
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }
}

const selectByIdSexo = async function(id) {
    try {
        let sql = `select * from tb_sexo where id = ${id}`
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }
}

module.exports = {
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}
