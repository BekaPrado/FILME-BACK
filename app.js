/***************************************************************************************************************************
 * OBJETIVO: Criar uma API para realizar o CRUD do sistema de controle de Filmes
 * DATA: 11/02/2025
 * AUTOR: Rebeka 
 * Versão: 1.0
 * Observação: 
 *          Para criar a API precisamos instalar: 
 *                 express             npm install express --save
 *                 cors                npm install cors --save 
 *                 body-parser         npm install body-parser --save
 * 
 *          Para criar a integração com o Banco de Dados precisamos instalar:
 *                 prisma               npm install prisma -save(para fazer a conexão com o BD)
 *                 prisma/client        npm install @prisma/client --save (para rodar os scripts SQL)
 *                                                  
 * 
 *          Após a instalação do prima e do prisma client, devemos :
 *              npx prisma init
 * 
 *          Você deverá configurar o arquivo .env e o schema.prisma com as credenciais do BD
 *          Após essa configuração voce deverá rodar o seguinte comando:
 *                      npx prisma migrate dev
 **************************************************************************************************************************/
    // Importação das bibliotecas
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Importação do controller
const controllerFilme = require('./controller/filme/controllerFilme')

// Criação do app Express
const app = express()

// Middlewares globais
app.use(cors()) // Libera o CORS para todas as rotas
app.use(bodyParser.json()) // Permite receber JSON no body

// Rotas da API

// Inserir um novo filme
app.post('/v1/controle-filmes/filme', async (request, response) => {
    const contentType = request.headers['content-type']
    const dadosBody = request.body

    const resultFilme = await controllerFilme.inserirFilme(dadosBody, contentType)
    response.status(resultFilme.status_code).json(resultFilme)
})

// Listar todos os filmes
app.get('/v1/controle-filmes/filme', async (request, response) => {
    const resultFilme = await controllerFilme.listarFilme()
    response.status(resultFilme.status_code).json(resultFilme)
})

// Buscar filme por ID
app.get('/v1/controle-filmes/filme/:id', async (request, response) => {
    const idFilme = request.params.id
    const resultFilme = await controllerFilme.buscarFilme(idFilme)
    response.status(resultFilme.status_code).json(resultFilme)
})

// Excluir filme por ID
app.delete('/v1/controle-filmes/filme/:id', async (request, response) => {
    const idFilme = request.params.id
    const resultFilme = await controllerFilme.excluirFilme(idFilme)
    response.status(resultFilme.status_code).json(resultFilme)
})

// Atualizar filme por ID
app.put('/v1/controle-filmes/filme/:id', async (request, response) => {
    const contentType = request.headers['content-type']
    const idFilme = request.params.id
    const dadosBody = request.body

    const resultFilme = await controllerFilme.atualizarFilme(idFilme, dadosBody, contentType)
    response.status(resultFilme.status_code).json(resultFilme)
})

// Inicializa o servidor
app.listen(8080, () => {
    console.log('✅ API funcionando e aguardando requisições na porta 8080...')
})
