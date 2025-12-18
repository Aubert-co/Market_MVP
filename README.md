# SuperStore – E-commerce Full Stack

Projeto de **marketplace full stack** inspirado em plataformas de e-commerce modernas, onde cada usuário pode criar sua própria loja, cadastrar produtos, gerenciar cupons, realizar compras e interagir com avaliações.  

O objetivo do projeto é demonstrar **boas práticas de engenharia de software**, com foco em **arquitetura escalável**, **testes automatizados**, **qualidade de código** e **aplicação em ambiente real de produção**.

A aplicação está **disponível online**, permitindo a visualização e utilização das principais funcionalidades.

---

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

---

## Tecnologias Utilizadas

### Frontend
- React.js
- TypeScript
- CSS
- Componentes reutilizáveis
- Design responsivo

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
- Google Cloud Storage (armazenamento de imagens)
- Deploy em ambiente de nuvem

### Testes
- Jest (testes unitários, integração e regressão)
- Supertest
- Cypress (testes end-to-end)
- Gherkin (BDD)

---

## Arquitetura

O sistema foi projetado com **separação clara de responsabilidades**, visando escalabilidade e manutenção a longo prazo.

- Frontend e backend desacoplados
- Backend expondo APIs RESTful
- Persistência de dados em PostgreSQL
- Cache com Redis para otimização de performance
- Upload de imagens realizado via Google Cloud Storage
- Serviços orquestrados com Docker Compose
- Cobertura de testes incluindo fluxos de sucesso e cenários de erro (bad paths)

---

## Acesso ao Projeto

A aplicação está **disponível online**, permitindo navegação pelas funcionalidades principais do marketplace e validação prática do funcionamento do sistema em ambiente de produção.

[Projeto online](https://market.aubertdev.com.br/)
---

## Objetivo do Projeto

Este projeto foi desenvolvido com o propósito de:

- Simular um sistema real de e-commerce em produção
- Aplicar boas práticas de arquitetura e clean code
- Demonstrar domínio em testes automatizados
- Trabalhar com autenticação, performance e resiliência
- Servir como base para evolução contínua e aprendizado técnico
