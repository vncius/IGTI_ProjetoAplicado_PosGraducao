1.Instalando via npm
npm install -g json-server 
2.Criando o arquivo .json
Crie um arquivo com o nome db.json

3.Rodando a API
json-server db.json
4.Testando os endpoints
Vou utilizar o Postman para testar os seguintes endpoints,
GET    /users
GET    /users/1
POST   /users
PATCH  /users/1
DELETE /users/1
4.1. Requisição GET
Teste o método GET com a URL http://localhost:3000/users/1 e http://localhost:3000/users para todos os usuários.
