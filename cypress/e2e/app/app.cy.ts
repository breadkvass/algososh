describe('приложение доступно', function() {
  it('приложение доступно на localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
}); 

describe('проверка работы роутинга', function() {
  it('главная страница открывается по дефолту', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Страница Строка открывается по клику на кнопку', function() {
    cy.visit('http://localhost:3000');
    cy.get('[href="/recursion"]').click();
    cy.contains('Строка');
  });

  it('Страница Сортировка массива открывается по клику на кнопку', function() {
    cy.visit('http://localhost:3000');
    cy.get('[href="/sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('Страница Стек массива открывается по клику на кнопку', function() {
    cy.visit('http://localhost:3000');
    cy.get('[href="/stack"]').click();
    cy.contains('Стек');
  });

  it('Страница Очередь открывается по клику на кнопку', function() {
    cy.visit('http://localhost:3000');
    cy.get('[href="/queue"]').click();
    cy.contains('Очередь');
  });

  it('Страница Связный список открывается по клику на кнопку', function() {
    cy.visit('http://localhost:3000');
    cy.get('[href="/list"]').click();
    cy.contains('Связный список');
  });
}); 