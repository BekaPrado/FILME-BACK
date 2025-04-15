const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertUsuario = async function(usuario) {
    try {
        let sql = `insert into tb_usuario (nome, email, senha) values ('${usuario.nome}', '${usuario.email}', '${usuario.senha}')`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const updateUsuario = async function(usuario) {
    try {
        let sql = `update tb_usuario set nome = '${usuario.nome}', email = '${usuario.email}', senha = '${usuario.senha}' where id = ${usuario.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const deleteUsuario = async function(id) {
    try {
        let sql = `delete from tb_usuario where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return result ? true : false
    } catch (error) {
        return false
    }
}

const selectAllUsuario = async function() {
    try {
        let sql = `select * from tb_usuario order by id desc`
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }
}

const selectByIdUsuario = async function(id) {
    try {
        let sql = `select * from tb_usuario where id = ${id}`
        return await prisma.$queryRawUnsafe(sql)
    } catch (error) {
        return false
    }
}

module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
