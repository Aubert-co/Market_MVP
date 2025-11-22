describe("filter",()=>{
    beforeEach(()=>{
        cy.visit('/buscas/test')
        
    })
    it("should correctly filter and send a request with the data from the filter form",()=>{
        cy.wait(5000)
        cy.intercept('POST', '/product/filter').as('filterRequest');
  
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('10');
        cy.get('[data-testid="max-price"]').type('500');

       cy.get('.order-by').select('maior preço');

        cy.get('.select-category').select('Eletrônicos');

        cy.contains('button', 'Enviar').click();

        cy.wait('@filterRequest').then((interception) => {

        expect(interception.request.body).to.deep.equal({
            name: 'test',
            category: 'Eletrônicos',
            minPrice: 10,
            maxPrice: 500,
            orderBy: 'desc'
        });

        expect(interception.request.headers['content-type']).to.include('application/json');
        })
    })
    it("should successfully clean the filter form and send the correct values",()=>{
        cy.wait(5000)
        cy.intercept('POST', '/product/filter').as('filterRequest');
  
        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('10');
        cy.get('[data-testid="max-price"]').type('500');

       cy.get('.order-by').select('maior preço');

        cy.get('.select-category').select('Eletrônicos');

        cy.contains('button', 'Limpar').click();

        cy.get('.collapse-container').click()
        cy.get('[data-testid="min-price"]').type('250');
        cy.get('[data-testid="max-price"]').type('5000');

       cy.get('.order-by').select('menor preço');

        cy.get('.select-category').select('Livros');
        cy.contains('button', 'Enviar').click();
        cy.wait('@filterRequest').then((interception) => {

         

        expect(interception.request.body).to.deep.equal({
            name: 'test',
            category: 'Livros',
            minPrice: 250,
            maxPrice: 5000,
            orderBy: 'asc'
        });

        expect(interception.request.headers['content-type']).to.include('application/json');
        })
    })
})