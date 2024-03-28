import 'cypress-wait-until';

describe('Проверка строки', function() {
    const test = 'string';
    const circles = () => {
        return cy.get('div[class^="string_circles"]').children()
    }

    beforeEach(function() {
        cy.visit('http://localhost:3000/');
        cy.get('[href="/recursion"]').click();
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', function() {
        cy.get('[type="text"]').clear();
        cy.get('button').get('[type="submit"]').should('be.disabled');
    });

    it('строка разворачивается корректно, анимация работает', () => {
        cy.get('[type="text"]').type(test)
        cy.get('[type="submit"]').click();

        circles().should('have.length', test.length);

        for (let i = 0; i < test.length / 2; i++) {
            circles()
                .eq(i)
                .find('div[class^="circle_circle"]')
                .should('have.attr', 'class')
                .and('include', 'changing')
                .waitUntil(() => circles()
                    .find('div[class^="circle_circle"]')
                    .should('have.attr', 'class')
                    .should('include', 'modified'));
            circles()
                .should('contain.text', test[test.length - i - 1])
        }
    })
})