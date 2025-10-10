Funcionalidade criar produto

Cenário: Criar produto com dados válidos
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 201 Created
  E a resposta deve conter a mensagem "Product created"
  E a resposta deve conter os dados do produto com o nome "Produto Teste"
  E a imagem deve estar hospedada em um link do Google Cloud Storage


Cenário: Criar produto com nome inválido
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como ""
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com nome menor que 4 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abc"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com nome maior que 15 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "aaaaaaaaaaaaaaaa"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com categoria inválida
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abcdee"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria ""
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com categoria maior que 20 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abcdee"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "aaaaaaaaaaaaaaaaa"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com categoria menor que 4 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abcdee"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "abc"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com preço igual a zero
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 0
  E definiu o estoque como 10 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid price. Please check and try again."

Cenário: Criar produto com preço negativo
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como -1
  E definiu o estoque como 10 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid price. Please check and try again."


Cenário: Criar produto com preço vazio
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como ''
  E definiu o estoque como 10 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid price. Please check and try again."


Cenário: Criar produto com preço não numerico
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como '1e1'
  E definiu o estoque como 10 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid price. Please check and try again."


Cenário: Criar produto com estoque não numérico
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como "dez unidades"
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid stock. Please check and try again."

Cenário: Criar produto com estoque negativo
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como -15
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid stock. Please check and try again."

Cenário: Criar produto com estoque vázio
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como ""
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid stock. Please check and try again."

  Cenário: Criar produto com estoque igual a 0
    Dado que a API de criação de produto está disponível
    E o usuário preencheu o nome do produto como "Produto Teste"
    E preencheu a descrição como "Descrição detalhada do produto"
    E selecionou a categoria "Eletrônicos"
    E definiu o preço como 199.99
    E definiu o estoque como 0
    E anexou uma imagem válida chamada "produto.jpg"
    Quando o usuário envia uma requisição POST para "/product"
    Então a API deve retornar o status 422 Unprocessable Entity
    E a resposta deve conter a mensagem "Invalid stock. Please check and try again."


Cenário: Criar produto com descrição muito curta
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Curto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid description. Please check and try again."


Cenário: Erro ao salvar o produto no banco de dados
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição válida do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15
  E anexou uma imagem válida chamada "produto.jpg"
  E o banco de dados está indisponível ou retorna um erro durante a criação
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 500 Internal Server Error
  E a resposta deve conter a mensagem "An unexpected error occurred while creating the product."
  E o serviço de upload para o Google Cloud Storage **não deve ser chamado**
