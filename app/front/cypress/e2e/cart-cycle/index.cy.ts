import { products, productById } from '../../fixtures/products'
import { userCartMocks } from '../../fixtures/userCart'
describe("cicle productPage to profile/cart",()=>{
    beforeEach(()=>{
        cy.visit('/')
    })
    it("should enter in the product page add to cart an see this in the cart",()=>{
        cy.intercept('GET','/product/page/1',{
            statusCode:201,
            body:{
                datas:[products[0]],
                currentPage:1,
                totalPages:2
            }
        }).as("product/page")
        cy.location('pathname').should('eq', '/');

        cy.wait("@product/page")
        cy.intercept('GET','/product/1',{
            statusCode:200,
            headers: { 'content-type': 'application/json' },
            body:{
                datas:productById,
                message:'success'
            }
        }).as("getproduct")
        cy.get(".product").should('exist').and('be.visible').first().click();
                 
                
            
        cy.wait("@getproduct")
            cy.intercept('PUT','/user/cart/add',{
            statusCode:201,
            headers: {
                'Content-Type': 'application/json'
            },
            body:{
                message:'success'
            }
        }).as('add/cart')
        cy.contains('button', 'Adicionar ao carrinho').should('be.visible').click()

        cy.wait('@add/cart')
        cy.get('.message_success')
        .should('contain.text', 'Adicionado ao carrinho com sucesso');

            cy.intercept('GET','/user/cart',{
            statusCode:200,
            headers: {
                'Content-Type': 'application/json'
            },
            body:{
                message:'success',
                datas:[userCartMocks[0]]
            } 
        })
        cy.visit('/perfil/carrinho')

               
    })
})