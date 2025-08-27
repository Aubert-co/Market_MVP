# Plano de Testes

## Objetivo
Garantir que o sistema atenda às funcionalidades principais e ofereça uma boa experiência ao usuário.  
Os testes devem assegurar que seja possível:

- Criar uma conta
- Fazer login
- Acessar produtos
- Buscar produtos
- Criar produto
- Adicionar itens ao carrinho
- Salvar o carrinho no `localStorage`
- Garantir que o carrinho seja atualizado corretamente
- Criar loja

## Escopo 

### Incluído no escopo
- Fluxos de autenticação no frontend:
  - Criar conta
  - Fazer login
  - Fazer logout
- Navegação entre páginas (Home, Produto, Carrinho, Login, Cadastro).
- Exibição e busca de produtos:
  - Listagem de produtos
  - Busca de produtos por nome ou categoria
- Funcionalidades do carrinho:
  - Adicionar itens ao carrinho
  - Remover itens do carrinho
  - Atualizar quantidade de itens
  - Atualização automática do preço total
  - Persistência do carrinho no `localStorage`
  - Recarregamento correto do carrinho ao atualizar a página
- **Mock de serviços externos (API):**
  - Todas as chamadas de rede (ex.: login, produtos, carrinho) serão simuladas.
  - Serão utilizados **mocks** para validar os fluxos do frontend sem depender do backend real.

### Fora do escopo
- Validação de regras de negócio no backend (ex.: autenticação no servidor, consistência de estoque).
- Testes de performance em larga escala (carga, stress, etc).
- Testes de segurança avançados (XSS, SQL Injection).
- Testes de integração com serviços externos reais (ex.: gateway de pagamento).


## Tipos de Testes 

### Testes Unitários
- **Objetivo:** Validar componentes, hooks e funções isoladas.
- **Ferramentas:** Jest + React Testing Library.
- **Exemplos:**
  - Verificar se o componente `LoginForm` renderiza os campos de e-mail e senha.
  - Testar se a função de cálculo de subtotal do carrinho retorna o valor correto.
  - Garantir que o botão "Adicionar ao carrinho" chama a função correta.

---

### Testes de Integração
- **Objetivo:** Garantir que diferentes componentes funcionam corretamente em conjunto.
- **Ferramentas:** Jest + React Testing Library.
- **Exemplos:**
  - Adicionar um produto ao carrinho e verificar se o valor total é atualizado na tela.
  - Garantir que ao realizar login, o estado global do usuário é atualizado e exibido no header.
  - Confirmar que a busca de produtos retorna a lista renderizada corretamente.

---

### Testes de Regressão
- **Objetivo:** Evitar que funcionalidades já existentes que funcionavam parem de funcionar após mudanças no código.
- **Ferramentas:** Jest (snapshots, testes automatizados contínuos em CI/CD).
- **Exemplos:**
  - Usar **snapshot tests** para garantir que componentes principais (ex.: `Header`, `Cart`, `ProductCard`) não sofram alterações inesperadas.
  - Rodar a suíte de testes completa a cada commit para validar que novos recursos não quebram funcionalidades antigas.

---

### Testes End-to-End (E2E)
- **Objetivo:** Validar fluxos completos do usuário no navegador, do início ao fim.
- **Ferramentas:** Cypress.
- **Exemplos:**
  - Fluxo: registro → login → buscar produto → adicionar ao carrinho → atualizar página → verificar persistência no `localStorage`.
  - Navegação entre páginas (Home → Produto → Carrinho) funciona sem erros.
  - Garantir que mensagens de erro e sucesso sejam exibidas corretamente nos formulários.


## Critérios de Aceitação

- **Cobertura de testes mínima:**
  - 80% de cobertura para testes unitários e de integração.
  - Cobertura obrigatória em todos os componentes críticos (Login, Carrinho, Produto).

- **Fluxos principais funcionando:**
  - Criação de conta.
  - Login e logout.
  - Busca de produtos.
  - Cadastro e exibição de produto.
  - Adicionar, remover e atualizar itens no carrinho.
  - Persistência correta do carrinho no `localStorage`.

- **Testes de regressão:**
  - Todos os testes de regressão devem passar sem falhas em cada release.
  - Alterações de UI cobertas por **snapshot tests** não podem gerar quebras inesperadas.

- **Testes End-to-End (E2E):**
  - Todos os fluxos de ponta a ponta (registro → login → buscar produto → adicionar ao carrinho → persistência) devem ser executados com sucesso.
  - Os testes devem rodar em ambiente de homologação (staging) antes de serem liberados em produção.

- **Estabilidade:**
  - Nenhum teste deve ser intermitente/flaky (ex.: passar em uma execução e falhar em outra sem alteração de código).
  - Todos os testes devem ser reprodutíveis localmente e no CI/CD.


## Ferramentas e Ambiente

- **Unitários e Integração:** Jest + React Testing Library
- **E2E:** Cypress (ou Playwright)
- **Mock de serviços:** MSW (Mock Service Worker) ou jest.fn
- **CI/CD:** GitHub Actions / GitLab CI para rodar todos os testes a cada commit
- **Ambiente de testes:**
  - Local: Node.js 20.x, navegador Chrome
  - Staging: ambiente com backend mockado e dados de teste

## Estratégia de Execução

- **Unitários e integração:** rodados a cada commit e pull request no CI/CD
- **Testes de regressão:** rodados antes de cada release, usando a suíte completa
- **E2E:** rodados em ambiente de staging, cobrindo fluxos críticos
- **Responsáveis:** desenvolvedores executam localmente, CI/CD executa automaticamente
- **Frequência:** unitários/integrados a cada commit, regressão e E2E antes de deploy

## Métricas e Relatórios

- **Cobertura mínima de código:** 80% para componentes críticos
- **Taxa de sucesso dos testes:** 100% para todos os testes unitários e de integração
- **Falhas permitidas:** nenhum teste crítico pode falhar
- **Relatórios:** gerados automaticamente pelo CI/CD (Jest coverage, Cypress dashboard)

