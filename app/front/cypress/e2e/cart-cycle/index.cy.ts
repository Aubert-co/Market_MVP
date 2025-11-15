import { userCartMocks } from '../../fixtures/userCart'
describe("cicle productPage to profile/cart",()=>{
   
    it("should enter in the product page add to cart an see this in the cart",()=>{
        
        cy.intercept('GET','/user/cart',{
            statusCode:200,
            headers: {
                'Content-Type': 'application/json'
            },
            body:{
                message:'success',
                datas:userCartMocks
            } 
        }).as('user/cart')

        cy.visit('/perfil/carrinho')
        cy.wait('@user/cart')       
    })
})




