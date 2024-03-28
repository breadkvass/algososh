import 'cypress-wait-until';

describe('Проверка Очереди', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/');
        cy.get('[href="/queue"]').click();
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('[type="text"]').clear();
        cy.get('button').get('[type="submit"]').should('be.disabled');
    });

    it('элемент в очередь добавляется корректно', () => {
        const test = ['5', '4', '3', '2'];
        const circles = () => {
            return cy.get('div[class^="queue-page_circles"]').children()
        }
        
        for (let i = 0; i < test.length; i++) {
            cy.get('[type="text"]').type(test[i]);
            cy.get('[type="submit"]').click();
            cy.get('[type="text"]').clear();

            circles()
                .eq(i)
                .find('div[class^="circle_circle"]')
                .should('have.attr', 'class')
                .and('include', 'changing')
                .waitUntil(() => circles()
                    .find('div[class^="circle_circle"]')
                    .should('have.attr', 'class')
                    .should('include', 'default'));

            circles().should('contain.text', test[i]);
            circles().should('contain.text', 'tail');
        }

        circles().first().should('contain.text', 'head');
    });

    it('элемент из очереди удаляется корректно', () => {
        const test = ['5', '4', '3', '2'];
        const circles = () => {
            return cy.get('div[class^="queue-page_circles"]').children()
        }
        
        // добавляем 4 элемента в очередь
        for (let i = 0; i < test.length; i++) {
            cy.get('[type="text"]').type(test[i]);
            cy.get('[type="submit"]').click();
            cy.get('[type="text"]').clear();
        }

        // удаляем элемент из очереди
        cy.wait(1000);
        cy.get('div[class^="queue-page_edit"]').find('[type="button"]').click();

        for (let i = 1; i < test.length - 1; i++) {
            circles()
                .eq(i)
                .should('contain.text', test[i]);
            circles().should('contain.text', 'tail');
        }

        circles().eq(1).should('contain.text', 'head');
    });

    it('по нажатию на кнопку «Очистить» длина очереди должна быть равна 0', () => {
        const test = ['5', '4', '3', '2'];
        const circles = () => {
            return cy.get('div[class^="queue-page_circles"]').children()
        }
        
        // добавляем 4 элемента в очередь
        for (let i = 0; i < test.length; i++) {
            cy.get('[type="text"]').type(test[i]);
            cy.get('[type="submit"]').click();
            cy.get('[type="text"]').clear();
        }

        // удаляем все элементы из очереди
        cy.wait(1000);
        cy.get('form').find('[type="button"]').contains('Очистить').click();

        for (let i = 0; i < 7; i++) {
            circles()
                .eq(i)
                .find('div[class^="circle_circle"]')
                .should('not.contain.text');
        }

        circles().first().should('contain.text', 'head');
        circles().should('not.contain.text', 'tail');
    });
})