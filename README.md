# 🛒 SuperStore - E-commerce Fullstack

Projeto de **marketplace fullstack** inspirado na Shopee, onde cada usuário pode criar sua própria loja, cadastrar produtos, gerenciar cupons, realizar compras, escrever reviews e muito mais.  
O foco do projeto é demonstrar **boas práticas de desenvolvimento, testes automatizados e arquitetura escalável**.

---

## ✨ Funcionalidades

### 👤 Usuário
- Criar conta e realizar login
- Ver produtos cadastrados
- Adicionar produtos ao carrinho
- Aplicar cupons de desconto
- 🚧 Em breve: Finalizar compras
- 🚧 Em breve: Avaliar e comentar produtos

### 🏪 Loja
- Criar loja
- Criar produto
- Criar cupons de desconto
- 🚧 Em breve: Dashboard da loja com métricas de vendas e avaliações
- 🚧 Em breve: Editar e remover produtos


## 🛠️ Tecnologias Utilizadas

**Frontend**
- React.js, TypeScript, CSS

**Backend**
- Node.js, Express.js, Prisma

**Banco de Dados & Cache**
- MySQL
- Redis

**Infra**
- Docker & Docker Compose
- Google Cloud Storage (upload de imagens)

**Testes**
- Jest (unitários, integração, regressão)
- Supertest
- Cypress (E2E)
- Gherkin (BDD)

---

## 🏗️ Arquitetura

O projeto é dividido em **frontend** e **backend**, ambos orquestrados pelo Docker Compose.  
- O backend expõe APIs RESTful.  
- O frontend consome essas APIs.  
- Banco de dados MySQL e cache Redis também sobem como serviços no Compose.  
- Uploads de imagens são enviados diretamente para o **Google Cloud Storage**.  

---

## 🚀 Como rodar o projeto

### 1. Clonar repositório
```bash
git https://github.com/Aubert-co/Market_MVP
cd Market_MVP
