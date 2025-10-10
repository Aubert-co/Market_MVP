Funcionalidade: Criar Loja

Cenário: Criar loja com dados válidos
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "Loja Teste"
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  Quando o usuário envia uma requisição POST para "/store"
  Então a API deve retornar o status 201 Created
  E a resposta deve conter a mensagem "Store created"
  E a resposta deve conter os dados da loja com o nome "Loja Teste"
  E a imagem deve estar hospedada em um link do Google Cloud Storage


Cenário: Tentativa de criar loja sem autenticação
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "Loja Teste"
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  Quando o usuário envia uma requisição POST para "/store" sem fornecer um token de autenticação
  Então a API deve retornar o status 401 Unauthorized
  E a resposta deve conter a mensagem "Acess denied"


Cenário: Tentativa de criar loja com nome inválido
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "" (vazio)
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  E forneceu um token de autenticação válido
  Quando o usuário envia uma requisição POST para "/store"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid store name. Please check and try again."

Cenário: Tentativa de criar loja com nome muito curto
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "abc"
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  E forneceu um token de autenticação válido
  Quando o usuário envia uma requisição POST para "/store"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid store name. Please check and try again."

Cenário: Tentativa de criar loja com nome muito longo
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "LojaComNomeMuitoLongo"
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  E forneceu um token de autenticação válido
  Quando o usuário envia uma requisição POST para "/store"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid store name. Please check and try again."


Dado que a API de criação de loja está disponível
E o usuário preencheu o nome da loja como "MinhaLoja"
E preencheu a descrição como ""
E anexou uma imagem válida chamada "image.jpeg"
E forneceu um token de autenticação válido
Quando o usuário envia uma requisição POST para "/store"
Então a API deve retornar o status 422 Unprocessable Entity
E a resposta deve conter a mensagem:
"Invalid store description. Please check and try again."

Dado que a API de criação de loja está disponível
E o usuário preencheu o nome da loja como "MinhaLoja"
E preencheu a descrição com uma descrição com mais de 200 caracteres
E anexou uma imagem válida chamada "image.jpeg"
E forneceu um token de autenticação válido
Quando o usuário envia uma requisição POST para "/store"
Então a API deve retornar o status 422 Unprocessable Entity
E a resposta deve conter a mensagem:
"Invalid store description. Please check and try again."


Cenário: Tentativa de criar loja com imagem vazia
Dado que a API de criação de loja está disponível
E o usuário preencheu o nome da loja como "MinhaLoja"
E preencheu a descrição como "Descrição válida da loja com mais de 20 caracteres"
E anexou uma imagem vazia chamada "image.jpeg"
E forneceu um token de autenticação válido
Quando o usuário envia uma requisição POST para "/store"
Então a API deve retornar o status 422 Unprocessable Entity
E a resposta deve conter a mensagem:
"Invalid or missing image file."




Cenário: Tentativa de criar loja com PDF no lugar de imagem
Dado que a API de criação de loja está disponível
E o usuário preencheu o nome da loja como "MinhaLoja"
E preencheu a descrição como "Descrição válida da loja com mais de 20 caracteres"
E anexou um arquivo chamado "image.pdf"
E forneceu um token de autenticação válido
Quando o usuário envia uma requisição POST para "/store"
Então a API deve retornar o status 422 Unprocessable Entity
E a resposta deve conter a mensagem:
"Invalid or missing image file."


Cenário: Tentativa de criar loja com vídeo no lugar de imagem
Dado que a API de criação de loja está disponível
E o usuário preencheu o nome da loja como "MinhaLoja"
E preencheu a descrição como "Descrição válida da loja com mais de 20 caracteres"
E anexou um arquivo chamado "image.mp4"
E forneceu um token de autenticação válido
Quando o usuário envia uma requisição POST para "/store"
Então a API deve retornar o status 422 Unprocessable Entity
E a resposta deve conter a mensagem:
"Invalid or missing image file."
