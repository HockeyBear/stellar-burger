/// <reference types="cypress" />

import order from '../../fixtures/orderComplite.json';
import tokenAuth from '../../fixtures/tokenAccess.json';

describe('Test burgerConstructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('Открытие модального окна с ингредиентом', () => {
    cy.get('li p:nth(1)').click();
    cy.contains('Белки, г');
  });

  it('Закрытие модального окна на крестик', () => {
    cy.get('li p:nth(1)').as('ingredient');
    cy.get('@ingredient').click();
    cy.get('#modals button').click();
    cy.get('#modals button').should('not.exist');
  });

  it('Закрытие модального окна по оверлею', () => {
    cy.get('li p:nth(1)').as('ingredient');
    cy.get('@ingredient').click();
    cy.get(`[data-cy='modal-overlay']`).click('topLeft', { force: true });
    cy.get('#modals button').should('not.exist');
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    let expectName: string;
    cy.get('li p:nth(1)')
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
    });

    afterEach(() => {
      cy.clearCookies();
      localStorage.removeItem('refreshToken');
    });

    it('Собираем заказ', () => {
      cy.get('ul li button').first().click();
      cy.get('ul:nth-of-type(2) li button').first().click().click();
      cy.get(`[data-cy='order-button']`).click();
      cy.get(`[data-cy='order-num']`).should('have.text', order.order.number);
      cy.get(`[data-cy='modal-close-button']`).click();
      cy.get(`[data-cy='order-num']`).should('not.exist');

      cy.get(`[data-cy='burger-constructor-empty-1']`).should('exist');
      cy.get(`[data-cy='burger-constructor-ingredients-empty']`).should(
        'exist'
      );
      cy.get(`[data-cy='burger-constructor-empty-2']`).should('exist');
      cy.get(`[data-cy='order-price'] p`).should('have.text', '0');
    });
  });
});
