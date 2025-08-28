import {loginApi, registerApi} from '../../../src/constants/urls'
describe("Page Login",()=>{
    beforeEach(()=>{
        cy.visit('/login')
        
    })
    
    it("should log a new user successfully and redirect to /index",()=>{
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
})