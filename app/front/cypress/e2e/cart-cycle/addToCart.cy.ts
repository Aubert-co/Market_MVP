import { products, productById } from '../../fixtures/products'



describe("User flow: home, product detail, and add to cart",()=>{
    beforeEach(()=>{
        cy.visit('/')
        
    })
    
    it("should successfully add an item to the cart",()=>{
       
     
        cy.intercept('GET','/product/page/1',{
            statusCode:201,
            body:{
                datas:products,
                currentPage:1,
                totalPages:2
            }
        })
      

        
        cy.intercept('GET', '/product/1', {
        statusCode: 200,
        body: {
            datas: productById,
            message: 'success'
        },
      
        }).as('getproduct')

        cy.wait(2000)
        cy.get(".product")
        .should('exist')
        .and('be.visible')
        .first()
        .click()    

        cy.wait("@getproduct")   
        
    
        cy.intercept('POST', '/user/cart/add', (req) => {
            
            expect(req.body.productId).to.equal(1)
            expect(req.body.quantity).to.equal(1)
           
            req.reply({
                statusCode: 201,
                body: { message: 'success' }
            })
        }).as('addCart')
        cy.contains('button','Adicionar ao carrinho').first().should('be.visible').click()
        
        cy.get('.message_success')
        .should('contain.text', 'Adicionado ao carrinho com sucesso');
        
    })
     it("should return an error message when the user is not logged in",()=>{
       
     
        cy.intercept('GET','/product/page/1',{
            statusCode:201,
            body:{
                datas:products,
                currentPage:1,
                totalPages:2
            }
        })
    
        cy.intercept('GET', '/product/1', {
        statusCode: 200,
        body: {
            datas: productById,
            message: 'success'
        },
      
        }).as('getproduct')

        cy.wait(2000)
        cy.get(".product")
        .should('exist')
        .and('be.visible')
        .first()
        .click()    

        cy.wait("@getproduct")   
        
    
        cy.intercept('POST', '/user/cart/add', (req) => {
            
            expect(req.body.productId).to.equal(1)
            expect(req.body.quantity).to.equal(1)
           
            req.reply({
                statusCode: 401,
                body: { message: 'success' }
            })
        }).as('addCart')
        cy.contains('button','Adicionar ao carrinho').first().should('be.visible').click()
        
        cy.get('.message_error')
        .should('contain.text', 'Faça login para adicionar ao carrinho');
        
    })
    it("should return an info message when an internal error occurs",()=>{
       
     
        cy.intercept('GET','/product/page/1',{
            statusCode:201,
            body:{
                datas:products,
                currentPage:1,
                totalPages:2
            }
        })
    
        cy.intercept('GET', '/product/1', {
        statusCode: 200,
        body: {
            datas: productById,
            message: 'success'
        },
      
        }).as('getproduct')

        cy.wait(2000)
        cy.get(".product")
        .should('exist')
        .and('be.visible')
        .first()
        .click()    

        cy.wait("@getproduct")   
        
    
        cy.intercept('POST', '/user/cart/add', (req) => {
            
            expect(req.body.productId).to.equal(1)
            expect(req.body.quantity).to.equal(1)
           
            req.reply({
                statusCode: 500,
                body: { message: 'success' }
            })
        }).as('addCart')
        cy.contains('button','Adicionar ao carrinho').first().should('be.visible').click()
        
        cy.get('.message_error')
        .should('contain.text', 'Algo deu errado');
        
    })
})