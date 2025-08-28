import {registerApi} from '../../../src/constants/urls'
describe("Page Registro",()=>{
    beforeEach(()=>{
        cy.visit('/registro')
        
    })
    
    it("should register a new user sucessfully and redirect to login",()=>{
        cy.intercept('POST',registerApi,{
            statusCode:201,
            body:{
                message:'Sucess'
            }
        }).as('registerUserSucess')
        cy.contains('p','Cadastre-se agora e aproveite cupons de desconto exclusivos e muito mais!')
        .click()

        cy.get('input[placeholder="Ex: joao@gmail.com"]').type('user@example.com');
        cy.get('input[placeholder="Ex: joao"]').type('lucas');
        cy.get('input[placeholder="Digite uma senha forte!"]').type('1234567');
        cy.get('input[placeholder="Igual a do campo senha"]').type('1234567');

        cy.contains('button','Enviar').click()

        cy.get('.message_success')
        .should('contain.text', 'Você criou sua conta com sucesso, você será redirecionado');

        cy.location('pathname').should('eq', '/login');
    })
})