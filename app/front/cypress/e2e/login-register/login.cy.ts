const loginApi = "/login"
describe("Page Login",()=>{
    beforeEach(()=>{
        cy.visit('/login')
        
    })
    
    it("should log a new user successfully and redirect to /",()=>{
        cy.intercept('POST',loginApi,{
            statusCode:201,
            body:{
                message:'Sucess'
            }
        }).as('loginUserSucess')
      

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
       

        cy.contains('button','Enviar').click()

        cy.get('.message_success')
        .should('contain.text', 'Você fez login com sucesso, você será redirecionado');

        cy.location('pathname').should('eq', '/');
    })
    it("should display 'Usuário ou senha inválidos' when status is 400 and stay on the same page",()=>{
        cy.intercept('POST',loginApi,{
            statusCode:400,
            body:{
                message:''
            }
        }).as('loginUser')
        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
       

        cy.contains('button','Enviar').click()
        cy.contains('div', 'Usuário ou senha inválidos');
        cy.location('pathname').should('eq', '/login');
    })
    it("should not redirect to '/' when the status is 500 and should show the message 'Erro interno, tente novamente'",()=>{
        cy.intercept('POST',loginApi,{
            statusCode:500,
            body:{
                message:'n'
            }
        }).as('loginUser')
        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
       

        cy.contains('button','Enviar').click()
        cy.contains('div','Erro interno, tente novamente');
             cy.location('pathname').should('eq', '/login');
    })
    it("should not redirect to '/' when the status is 499 and show the message 'Usuário ou senha inválidos'",()=>{
        cy.intercept('POST',loginApi,{
            statusCode:410,
            body:{
                message:'n'
            }
        }).as('loginUser')
        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
       

        cy.contains('button','Enviar').click()
        cy.contains('div','Usuário ou senha inválidos');
        cy.location('pathname').should('eq', '/login');
    })
    it("should not redirect to '/' when the status is 399 and show the message 'Usuário ou senha inválidos'",()=>{
        cy.intercept('POST',loginApi,{
            statusCode:399,
            body:{
                message:'n'
            }
        }).as('loginUser')
        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
       

        cy.contains('button','Enviar').click()
        cy.contains('div','Erro interno, tente novamente');
        cy.location('pathname').should('eq', '/login');
    })
})