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

const insertGenero = async function(genero) {
    try {
        let sql = `INSERT INTO tb_genero (nome) VALUES ('${genero.nome}')`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error('Erro ao inserir gênero:', error);
        return false;
    }
};

const updateGenero = async function(genero) {
    try {
        let sql = `UPDATE tb_genero SET nome = '${genero.nome}' WHERE id = ${genero.id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error('Erro ao atualizar gênero:', error);
        return false;
    }
};

const deleteGenero = async function(id) {
    try {
        // Primeiro verifica se existem filmes associados a este gênero
        const filmes = await prisma.$queryRawUnsafe(
            `SELECT * FROM filme_genero WHERE tb_genero_id = ${id}`
        );
        
        if (filmes && filmes.length > 0) {
            throw new Error('Não é possível excluir: existem filmes associados a este gênero');
        }

        let sql = `DELETE FROM tb_genero WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);
        return result ? true : false;
    } catch (error) {
        console.error('Erro ao excluir gênero:', error.message);
        return false;
    }
};

const selectAllGeneros = async function() {
    try {
        let sql = 'SELECT * FROM tb_genero ORDER BY nome ASC';
        let result = await prisma.$queryRawUnsafe(sql);
        return result || [];
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        return [];
    }
};

const selectByIdGenero = async function(id) {
    try {
        let sql = `SELECT * FROM tb_genero WHERE id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error('Erro ao buscar gênero por ID:', error);
        return null;
    }
};

const selectByNomeGenero = async function(nome) {
    try {
        let sql = `SELECT * FROM tb_genero WHERE nome LIKE '%${nome}%'`;
        let result = await prisma.$queryRawUnsafe(sql);
        return result || [];
    } catch (error) {
        console.error('Erro ao buscar gênero por nome:', error);
        return [];
    }
};

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero,
    selectByNomeGenero
};