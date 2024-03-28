import 'cypress-wait-until';

describe('Проверка Стека', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/');
        cy.get('[href="/stack"]').click();
    });

    it('если в инпуте пусто, то кнопка добавления недоступна', () => {
        cy.get('[type="text"]').clear();
        cy.get('button').get('[type="submit"]').should('be.disabled');
    });

    it('элемент в стек добавляется корректно, анимация работает', () => {
        const test = ['5', '4', '3', '2'];
        const circles = () => {
            return cy.get('div[class^="stack-page_circles"]').children()
        }
        
        for (let i = 0; i < test.length; i++) {
            cy.get('[type="text"]').type(test[i]);
            cy.get('[type="submit"]').click();
            cy.get('[type="text"]').clear();

            circles().should('have.length', i + 1);
            circles()
                .eq(i)
                .should('contain.text', test[i])
                .find('div[class^="circle_circle"]')
                .should('have.attr', 'class')
                .and('include', 'changing')
                .waitUntil(() => circles()
                    .find('div[class^="circle_circle"]')
                    .should('have.attr', 'class')
                    .should('include', 'default'));
        }
    });

    it('элемент из стека удалятся корректно', () => {
        // добавим 4 элемента в стек
        const test = ['5', '4', '3', '2'];
        const circles = () => {
            return cy.get('div[class^="stack-page_circles"]').children()
        }
        
        for (let i = 0; i < test.length; i++) {
            cy.get('[type="text"]').type(test[i]);
            cy.get('[type="submit"]').click();
            cy.get('[type="text"]').clear();
        }

        // удаляем элемент из стека
        cy.get('div[class^="stack-page_edit"]').find('[type="button"]').click();
        circles().should('have.length', test.length - 1);

        for (let i = 0; i < test.length - 1; i++) {
            circles()
                .eq(i)
                .should('contain.text', test[i])
        }
    });

    it('по нажатию на кнопку «Очистить» длина стека должна быть равна 0', () => {
        // добавим 4 элемента в стек
        const test = ['5', '4', '3', '2'];
        const circles = () => {
            return cy.get('div[class^="stack-page_circles"]').children()
        }
        
        for (let i = 0; i < test.length; i++) {
            cy.get('[type="text"]').type(test[i]);
            cy.get('[type="submit"]').click();
            cy.get('[type="text"]').clear();
        }

        // очищаем стек
        cy.wait(1000);
        cy.get('form').find('[type="button"]').contains('Очистить').click();
        circles().should('have.length', 0);
    });

    
})