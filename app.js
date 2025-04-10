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
    //Import das bibliotecas para configurar a API
     const express        = require('express')
     const cors           = require('cors')
     const bodyParser     = require('body-parser')
     
     //Manipular o body da requisição para chegar apenas JSON
     const bodyParserJSON = bodyParser.json()

     //Cria o objeto app com referências do express para criar a API
     const app = express()
     
     //response - Significa a resposta da API
     //request - Significa a chegada de dados na API
     
     app.use((request, response, next) =>{
         response.header('Access-Control-Allow-Origin', '*')

         response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
     
         app.use(cors()) //Aplica/ATIVA as restrições do CORS da requisição
     
         next()
     })
     
//Permissão de quais metodos a API irá responder - CORS CUIDA DESSAS PERMISSÕES ---VERBOS HTTP
//get - pegar dados da API na tela
//post - inserir novos itens e salvar 
//put - alterar dados existentes na api
//delete - excluir item existente na API
//options - 

//____________________________________________________________________________________________________________________________________________________________

const controllerFilme = require('./controller/filme/controllerFilme')
const { Param } = require('@prisma/client/runtime/library')


app.post('/v1/controle-filmes/filme', cors(), bodyParserJSON, async function (request, response){

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Recebe o body da requisição os dados encaminhados
    let  dadosBody = request.body
    let resusltFilme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(resultFilme.status_code)
    response.json(resultFilme)

})

app.get('/v1/controle-filmes/filme', cors(),async function(request, response){
    //Chama a funcao para retornar os filmes
    let resultFilme = await controllerFilme.listarFilme()

    response.status(resultFilme.status_code)
    response.json(resultFilme)
} )


app.get('/v1/controle-filmes/id')

app.listen('5050', function(){
    console.log('API funcionando e aguardando requisições .....................................')
})

