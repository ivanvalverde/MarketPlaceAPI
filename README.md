# MarketPlaceAPI
Projeto de encerramento de módulo do Resilia.

# Objetivo

Construir uma Restful API simulando um Marketplace. Através das rotas deve ser possível cadastrar clientes, fornecedores e fazer compras de produtos previamente disponibilizados pelos fornecedores. O app deve conter testes realizados de todas suas funcionalidades.

# Frameworks, Bibliotecas e Extensões utilizadas no projeto

## Dependências

- **Express:** Framework web que cria abstrações de rotas, middlewares e muitas outras funções para facilitar a criação de API's.<br>
- **Bcrypt:** Uma biblioteca para transformar senhas em hash;<br>
- **Dotenv:** Módulo que carrega variáveis de ambiente de um arquivo .env para process.env. Guarda informações no ambiente separadas do código em si;<br>
- **Mongoose:** Uma ferramenta de modelação de objetos, direcionada para MONGODB, projetada para trabalhar em ambientes assíncronos.<br>
- **Body-parser:** Módulo para conversão do body da requisição para vários formatos.<br>

## Dependências de Desenvolvimento

- **Nodemon:** Ferramenta que derruba e sobe novamente o servidor no ar sempre que alguma mudança é aplicada no código;<br>
- **Mocha:** Framework de desenvolvimento de testes para aplicações de NodeJS;<br>
- **Chai:** Uma biblioteca para realização de testes através de afirmações;<br>
- **Chai-http:** Uma biblioteca para realização de testes HTTP focada em integração;<br>

# Entidades

- **Cliente:** Usuário que busca por um produto específico na aplicação com a intenção de comprá-lo. Os atributos de um usuário são:<br>
  - *Nome:* Nome associado ao usuário na API;<br>
  - *Cpf:* CPF associado ao usuário na API;<br>
  - *Email:* E-mail associado ao usuário na API;<br>
  - *Telefone:* Telefone associado ao usuário na API;<br>
  - *Endereço:* Endereço associado ao usuário na API;<br>
  - *Senha:* Senha criptografada através de uma função Hash;<br>
  - *Salto:* Identificador único do método utilizado durante a função hash.<br><br>

- **Fornecedor:** Usuário que fornece produtos na aplicação com a intenção de vendê-los. Os atributos de um fornecedor são:<br>
  - *Nome:* Nome associado ao fornecedor na API;<br>
  - *Cnpj:* CNPJ associado ao fornecedor na API;<br>
  - *Razão Social:* Razão Social associada ao fornecedor na API;<br>
  - *Email:* E-mail associado ao fornecedor na API;<br>
  - *Telefone:* Telefone associado ao fornecedor na API;<br>
  - *Endereço:* Endereço associado ao fornecedor na API;<br>
  - *Senha:* Senha criptografada através de uma função Hash;<br>
  - *Salto:* Identificador único do método utilizado durante a função hash.<br><br>

- **Produto:** Produto fornecido por um fornecedor, que fica exposto para os usuários o comprarem. Os atributos de um produto são:<br>
  - *Nome:* Nome associado ao usuário na API;<br>
  - *Descrição:* Descrição do produto;<br>
  - *Avaliação:* Avaliação do produto pelos clientes;<br>
  - *Preço:* Preço associado ao respectivo produto;<br>
  - *Estoque:* Quantidade do produto fornecido para venda;<br>
  - *Fornecedor:* ID do fornecedor do produto.<br><br>

- **Compra:** Compra é a entidade relacionada a transação, é uma compra de um produto por um cliente. Os atributos da compra são:<br>
  - *idCliente:* ID do cliente ;<br>
  - *idProduto:* Descrição do produto;<br>
  - *dataCompra:* Avaliação do produto pelos clientes;<br>
  - *dataCancelamento:* Preço associado ao respectivo produto.<br><br>


# Rotas

## Cliente

- **GET */cliente*:** Retorna como resposta todos os clientes cadastrados no banco da API;<br>
- **GET(único usuário) */cliente/id*:** Retorna como resposta um único cliente cujo id é passado como parâmetro na URI (substituindo o id);<br>
- **POST */cliente/adiciona*:** Adiciona um novo usuário no banco da API, os atributos do usuário devem ser enviados através do corpo da requisição em formato JSON;<br>
- **DELETE */cliente/id*:** Deleta um usuário no banco de dados cujo id é passado como parâmetro na URI (substituindo o id);<br>
- **PUT */cliente/altera/id*:** Altera uma propriedade de algum cliente cujo id foi passado como parâmetro na URI (substituindo o id). As mudanças devem ser passadas através do corpo da requisição em formato JSON.<br><br>

## Fornecedores

- **GET */fornecedor*:** Retorna como resposta todos os fornecedores cadastrados no banco da API;<br>
- **GET(único fornecedor) */fornecedor/id*:** Retorna como resposta um único fornecedor cujo id é passado como parâmetro na URI (substituindo o id);<br>
- **POST */fornecedor/adiciona*:** Adiciona um novo fornecedor no banco da API, os atributos do fornecedor devem ser enviados através do corpo da requisição em formato JSON;<br>
- **DELETE */fornecedor/id*:** Deleta um fornecedor no banco de dados cujo id é passado como parâmetro na URI (substituindo o id);<br>
- **PUT */fornecedor/altera/id*:** Altera uma propriedade de algum fornecedor cujo id foi passado como parâmetro na URI (substituindo o id). As mudanças devem ser passadas através do corpo da requisição em formato JSON.<br><br>

## Produto

- **GET */produto*:** Retorna como resposta todos os produtos cadastrados no banco da API;<br>
- **GET(único produto) */produto/id*:** Retorna como resposta um único produto cujo id é passado como parâmetro na URI (substituindo o id);<br>
- **POST */produto/adiciona*:** Adiciona um novo produto no banco da API, os atributos do produto devem ser enviados através do corpo da requisição em formato JSON;<br>
- **DELETE */produto/id*:** Deleta um produto no banco de dados cujo id é passado como parâmetro na URI (substituindo o id);<br>
- **PUT */produto/altera/id*:** Altera uma propriedade de algum produto cujo id foi passado como parâmetro na URI (substituindo o id). As mudanças devem ser passadas através do corpo da requisição em formato JSON.<br><br>

## Compra

- **GET */compra*:** Retorna como resposta todas as transações cadastradas no banco da API;<br>
- **GET(única compra) */compra/produto/idProduto*:** Retorna como resposta uma única transação cujo id do produto associado é passado como parâmetro na URI (substituindo o id);<br>
- **GET(única compra) */compra/cliente/idCliente*:** Retorna como resposta uma única transação cujo id do cliente associado é passado como parâmetro na URI (substituindo o id);<br>
- **POST */compra/adiciona*:** Adiciona uma nova transação no banco da API, os atributos do produto devem ser enviados através do corpo da requisição em formato JSON(devem ser informados, o id do cliente que está realizando a compra e o id do produto a ser comprado nos campos *idCliente* e *idFornecedor*);<br>
- **PUT */compra/altera/id*:** Cancela a transação cujo id foi passado como parâmetro na URI (substituindo o id). Essa transação não será removida do sistema, apenas o atributo *dataCancelamento* irá ser alterado para o momento em que foi feita a requisição.<br><br>

## Deploy

Para hospedar gratuitamente nossa aplicação, utilizamos o heroku. A API pode ser acessada através do link: **https://enigmatic-earth-80179.herokuapp.com/** + rota desejada.