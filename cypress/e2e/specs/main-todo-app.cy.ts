/*
 * Project: TODO APP - e2e automation
 * Author: konrad.wyszynski
 * Copyright © 2024, konrad.wyszynski
 */

import * as helper from '../utils/helper';
import * as mainPage from '../pages/main-todo-app';

describe('Todo app tests - main page', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have background image, icon, header and a footer', function () {
    cy.get('body.light')
      .should('have.css', 'background')
      .and('include', 'rgb(250, 250, 250)')
      .and('include', 'images/bg-desktop-light.jpg');
    cy.get('header').within(() => {
      cy.get('h1').should('have.text', 'TODO');
      cy.get('#theme-switcher')
        .children('img')
        .should('have.attr', 'src', './assets/images/icon-moon.svg');
    });
    cy.get('input.txt-input').should(
      'have.attr',
      'placeholder',
      'Create a new todo...'
    );
    cy.get('footer')
      .invoke('text')
      .then((textInFooter) => {
        expect(helper.convertStringToPlainText(textInFooter)).to.eq(
          'Drag and drop to reorder list'
        );
      });
  });

  it('Should switch to dark mode when the icon is clicked', function () {
    cy.get('#theme-switcher').click();
    cy.get('body')
      .should('have.css', 'background')
      .and('include', 'rgb(22, 23, 34)')
      .and('include', 'images/bg-desktop-dark.jpg');
    cy.get('#theme-switcher img').should(
      'have.attr',
      'src',
      './assets/images/icon-sun.svg'
    );
  });

  it('Should create a new todo item and delete it', function () {
    const inputTextArray = ['Testing'];

    mainPage.createItem(inputTextArray);
    mainPage.checkAndCountItems();

    cy.get('li p').should('have.text', inputTextArray[0]);
    cy.get('.clear img').should(
      'have.attr',
      'src',
      './assets/images/icon-cross.svg'
    );

    mainPage.deleteItem(inputTextArray[0]);
    mainPage.checkAndCountItems();

    cy.get('li.card').should('not.exist', { timeout: 5000 });
  });

  it('Should mark item as a completed after a click', function () {
    const inputTextArray = ['T3$ting', '@Testing', '!TEST*'];

    mainPage.createItem(inputTextArray);
    mainPage.markItemAsCompleted(inputTextArray[1]);
    mainPage.checkAndCountItems();
    mainPage.goToActiveTab();

    cy.contains(inputTextArray[1]).should('be.hidden');

    mainPage.goToCompletedTab();

    cy.contains(inputTextArray[1]).should('be.visible');
    cy.get('.card.checked span.check').should(
      'have.css',
      'background-color',
      'rgb(87, 221, 255)'
    );
    cy.get('.card.checked p').should(
      'have.css',
      'text-decoration',
      'line-through solid rgb(210, 209, 214)'
    );

    mainPage.clearCompletedItems();

    cy.contains(inputTextArray[1]).should('not.exist', { timeout: 5000 });
  });

  it('Should drag and drop items and reorder list', function () {
    const inputTextArray = ['First item', 'Second item', 'Third item'];

    mainPage.createItem(inputTextArray);

    cy.get('li:first-child').drag('li:nth-child(3)', {
      force: true,
      log: false,
    });
    cy.get('li:nth-child(3)').should('have.text', 'First item');
  });
});
