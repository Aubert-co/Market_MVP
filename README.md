# SuperStore – E-commerce Full Stack

Plataforma de marketplace onde usuários podem criar lojas, vender produtos e gerenciar pedidos com foco em escalabilidade, testes e observabilidade.

Projeto focado em simular um ambiente real de produção, com CI/CD, monitoramento e alta cobertura de testes.
## Destaques

- Testes automatizados:
  - +270 testes (40 suítes)
  - Cobertura de fluxos de sucesso e cenários de erro (bad paths)
- CI/CD com execução automática de testes
- Logs estruturados com Pino
- Observabilidade com Grafana e Loki


## Funcionalidades

### Usuário
- Cadastro e autenticação
- Visualização de produtos
- Adição de produtos ao carrinho
- Aplicação de cupons de desconto
- Finalização de pedidos
- Avaliação e comentários em produtos

### Loja
- Criação e gerenciamento de loja
- Cadastro de produtos
- Criação de cupons de desconto
- Dashboard da loja (pedidos e status)
- Gerenciamento de produtos


## Tecnologias Utilizadas

### Backend
- Node.js
- Express.js
- Prisma ORM
- APIs RESTful

### Banco de Dados & Cache
- PostgreSQL
- Redis

### Infraestrutura
- Docker e Docker Compose
- Armazenamento de imagens em nuvem (AWS S3 planejado)
- Deploy em ambiente de nuvem (AWS EC2 e Route 53 em planejamento)

### Testes
- Jest (testes unitários, integração e regressão)
- Supertest (testes de endpoints HTTP)
- Gherkin (BDD)

#### Cobertura
- Validação de regras de negócio
- Fluxos de sucesso e cenários de erro (bad paths)
- Testes de rate limiting
- Testes de segurança baseados no OWASP Top 10

#### Qualidade
- Documentação dos cenários de teste
- Definição de cenários baseada em regras de negócio
- Organização dos testes por domínio (ex: pedidos, cupons, autenticação)

## Arquitetura

O sistema foi projetado com **separação clara de responsabilidades**, visando escalabilidade e manutenção a longo prazo.

- Frontend e backend desacoplados
- Backend expondo APIs RESTful
- Persistência de dados em PostgreSQL
- Cache com Redis para otimização de performance
- Serviços containerizados
- Cobertura de testes incluindo fluxos de sucesso e cenários de erro (bad paths)

### Observabilidade & Monitoramento
- Pino (logger estruturado para alta performance)
- Pino HTTP (logs de requisições)
- Grafana (visualização e análise de logs)
- Loki (agregação de logs)

### CI/CD
- GitHub Actions
- Execução automática de testes a cada push
- Garantia de integridade e estabilidade do código
- Pipeline automatizado com execução de testes unitários e de integração
- Validação contínua antes de merges

## Acesso ao Projeto

A aplicação ainda não está disponível online.

Em breve será possível acessar uma versão em produção para explorar as principais funcionalidades do marketplace.

A infraestrutura será provisionada na AWS, utilizando EC2 para hospedagem da aplicação e Route 53 para gerenciamento de domínio e DNS.

## Objetivo do Projeto

Este projeto foi desenvolvido com o propósito de:

- Simular um sistema real de e-commerce em produção
- Aplicar boas práticas de arquitetura e clean code
- Demonstrar domínio em testes automatizados
- Trabalhar com autenticação, performance e resiliência
- Servir como base para evolução contínua e aprendizado técnico
