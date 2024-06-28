/// <reference types="cypress" />

import order from '../../fixtures/orderComplite.json';
import tokenAuth from '../../fixtures/tokenAccess.json';

describe('Test burgerConstructor', () => {
  const ingredientSelector = 'li p:nth(1)';
  const modalCloseButtonSelector = '#modals button';
  const modalOverlaySelector = `[data-cy='modal-overlay']`;
  const orderButtonSelector = `[data-cy='order-button']`;
  const orderNumSelector = `[data-cy='order-num']`;
  const burgerConstructorEmpty1Selector = `[data-cy='burger-constructor-empty-1']`;
  const burgerConstructorIngredientsEmptySelector = `[data-cy='burger-constructor-ingredients-empty']`;
  const burgerConstructorEmpty2Selector = `[data-cy='burger-constructor-empty-2']`;
  const orderPriceSelector = `[data-cy='order-price'] p`;

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
    cy.wait(1000); // Добавляем ожидание для обеспечения загрузки страницы
  });

  it('Открытие модального окна с ингредиентом', () => {
    cy.get(ingredientSelector).click();
    cy.contains('Белки, г');
  });

  it('Закрытие модального окна на крестик', () => {
    cy.get(ingredientSelector).as('ingredient');
    cy.get('@ingredient').click();
    cy.get(modalCloseButtonSelector).click();
    cy.get(modalCloseButtonSelector).should('not.exist');
  });

  it('Закрытие модального окна по оверлею', () => {
    cy.get(ingredientSelector).as('ingredient');
    cy.get('@ingredient').click();
    cy.get(modalOverlaySelector).click({ force: true });
    cy.get(modalCloseButtonSelector).should('not.exist');
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    let expectName: string;
    cy.get(ingredientSelector)
      .as('ingredient')
      .should(($p) => (expectName = $p.text()))
      .invoke('attr', 'data-cy', 'ingredient-name');
    cy.get('ul li button').first().click();
    cy.get('ul li p.counter__num').should('have.text', '2');
    let actualName;
    cy.get('div.constructor-element span.constructor-element__text')
      .first()
      .should(($c) => {
        actualName = $c.text();
        expect(actualName).contains(expectName);
      })
      .invoke('attr', 'data-cy', 'added-ingredient');
    cy.get('ul:nth-of-type(3) li button').first().click().click().click();
    cy.get('ul:nth-of-type(3) li p.counter__num').should('have.text', '3');
    cy.get('section:last-of-type ul:last-of-type li').should('have.length', 3);
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('GET', 'api/auth/user', { fixture: 'userAuth.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'orderComplite.json' }).as(
        'order'
      );
      cy.setCookie('accessToken', tokenAuth.accessToken);
      localStorage.setItem('refreshToken', tokenAuth.refreshToken);
      cy.visit('/');
      cy.wait(1000); // Добавляем ожидание для обеспечения загрузки страницы
    });

    afterEach(() => {
      cy.clearCookies();
      localStorage.removeItem('refreshToken');
    });

    it('Собираем заказ', () => {
      cy.get('ul li button').first().click();
      cy.get('ul:nth-of-type(2) li button').first().click().click();
      cy.get(orderButtonSelector).click();
      cy.get(orderNumSelector).should('have.text', order.order.number);
      cy.get(modalCloseButtonSelector).click();
      cy.get(orderNumSelector).should('not.exist');

      cy.get(burgerConstructorEmpty1Selector).should('exist');
      cy.get(burgerConstructorIngredientsEmptySelector).should('exist');
      cy.get(burgerConstructorEmpty2Selector).should('exist');
      cy.get(orderPriceSelector).should('have.text', '0');
    });
  });
});
