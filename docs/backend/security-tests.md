## Testes de Segurança

O backend inclui testes automatizados para validar controles básicos de segurança e evitar vulnerabilidades comuns em APIs, seguindo boas práticas recomendadas pela OWASP.

### Autenticação
- Acesso a rotas protegidas sem token retorna **401 Unauthorized**
- Tokens JWT inválidos ou expirados são rejeitados
- Tentativas de autenticação inválida não retornam informações sensíveis

### Autorização
- Usuários não podem acessar recursos pertencentes a outros usuários
- Tentativas de modificar recursos de terceiros retornam **403 Forbidden**
- Operações sensíveis exigem autenticação válida

### Proteção contra manipulação de IDs
- Manipulação de identificadores em rotas protegidas não permite acesso a recursos indevidos
- Recursos inexistentes retornam **404 Not Found**

### Validação de Inputs
- Inputs maliciosos ou inválidos são rejeitados com **400 Bad Request**
- Tentativas de bypass em filtros e validações são bloqueadas
- Campos inesperados no payload são ignorados ou rejeitados

### Rate Limiting
- A API limita o número de requisições para prevenir abuso
- Requisições acima do limite retornam **429 Too Many Requests**
- Proteção aplicada especialmente em rotas sensíveis (ex: autenticação)

### Tratamento Seguro de Erros
- Erros internos não expõem detalhes do sistema
- Mensagens retornadas ao cliente são padronizadas