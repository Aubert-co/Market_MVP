# Plano de Testes - Backend

## Objetivo
Garantir que o backend funcione corretamente, fornecendo respostas confiáveis e consistentes, mesmo em situações de erro.  
O foco é validar cenários críticos, garantindo integridade dos dados, autenticação, cache e comunicação com o banco.

---

## Escopo

### Incluído
- **CRUD de recursos críticos:** produtos, lojas, usuários.
- **Filtros e validações:** inputs válidos e inválidos.
- **Paginação e limites:** controle de páginas e tamanho de lista.
- **Cache:** verificação de leitura e escrita, fallback para banco.
- **Autenticação e autorização:** tokens JWT, rotas protegidas.
- **Tratamento de erros:** validação de inputs, falhas de banco ou cache, respostas consistentes.
- **Uploads de arquivos:** validação de tipos e integridade de dados.

### Fora do escopo
- Integração com serviços externos reais.
- Testes de performance em larga escala.
- Testes de segurança avançados (XSS, SQL Injection).

---

## Tipos de Testes

### Testes Unitários
- **Objetivo:** validar funções isoladas do backend.
- **Ferramentas:** Jest
- **Cenários críticos:**
  - Validação de inputs inválidos (tipos errados, campos obrigatórios ausentes)
  - Funções utilitárias de formatação e cálculo
  - Funções de autenticação e verificação de token

### Testes de Integração
- **Objetivo:** garantir que serviços e endpoints funcionem corretamente em conjunto.
- **Ferramentas:** Jest + Supertest
- **Cenários críticos:**
  - Operações de CRUD funcionando corretamente
  - Paginação e limites retornando valores consistentes
  - Cache falhando → fallback para banco funciona
  - Transações no banco mantendo integridade dos dados

### Testes de Regressão
- **Objetivo:** evitar que funcionalidades existentes parem de funcionar.
- **Ferramentas:** Jest
- **Cenários críticos:**
  - Filtros continuam retornando resultados corretos
  - Paginação consistente após mudanças
  - Autenticação e autorização funcionando corretamente



## Critérios de Aceitação
- Cobertura mínima de 80% em funções e endpoints críticos.
- Todas as operações críticas (CRUD, filtros, cache, autenticação) funcionando corretamente.
- Tratamento de erros consistente: inputs inválidos → 400, registros não encontrados → 404, falhas inesperadas → 500.
- Nenhum teste crítico intermitente ou flaky.
- Testes reproduzíveis localmente e no CI/CD.

---

## Ferramentas e Ambiente
- **Unitários e Integração:** Jest + Supertest
- **Mock de serviços:** jest.fn, spyOn
- **Banco:** Postgres via Prisma (Docker para ambiente de teste)
- **Cache:** Redis mockado
- **CI/CD:** GitHub Actions / GitLab CI
- **Ambientes:** local e staging com dados de teste

---

## Estratégia de Execução
- Unitários e integração: a cada commit/pull request
- Regressão: antes de cada release
- E2E: em ambiente de staging cobrindo fluxos críticos
- Responsáveis: desenvolvedores localmente, CI/CD automaticamente
- Frequência: unitários/integrados a cada commit, regressão e E2E antes do deploy

---

## Métricas e Relatórios
- Cobertura mínima: 80% nos endpoints e funções críticas
- Taxa de sucesso: 100% para testes unitários e integração
- Nenhum teste crítico pode falhar
- Relatórios: Jest coverage, logs de Supertest, CI/CD
