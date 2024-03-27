describe('Проверка Фибоначчи', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/');
        cy.get('[href="/fibonacci"]').click();
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', function() {
        cy.get('[type="text"]').clear();
        cy.get('button').get('[type="submit"]').should('be.disabled');
    });

    it('числа генерируются корректно', function() {
        const test = '5';
        const expexted = [0, 1, 1, 2, 3]
        const circles = () => {
            return cy.get('div[class^="fibonacci-page_circles"]').children()
        }

        cy.get('[type="text"]').type(test)
        cy.get('[type="submit"]').click();
        circles().should('have.length', test);

        for (let i = 0; i < Number(test); i++) {
            circles()
                .eq(i)
                .should('contain.text', expexted[i])
        }
    });
})