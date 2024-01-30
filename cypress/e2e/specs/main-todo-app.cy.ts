/*
 * Project: TODO APP - e2e automation
 * Author: konrad.wyszynski
 * Copyright © 2024, konrad.wyszynski
 */

import * as helper from '../utils/helper';
import mainPage from '../pages/main-todo-app';

describe('Todo app tests - main page', () => {
  before(() => {
    Cypress.session.clearAllSavedSessions();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have background image, icon, header and a footer', function () {
    mainPage.elements
      .bodyLight()
      .should('have.css', 'background')
      .and('include', 'rgb(250, 250, 250)')
      .and('include', 'images/bg-desktop-light.jpg');
    mainPage.elements.header().within(() => {
      mainPage.elements.h1tag().should('have.text', 'TODO');
      mainPage.elements
        .themeSwitcherIcon()
        .should('have.attr', 'src', './assets/images/icon-moon.svg');
    });
    mainPage.elements
      .textBox()
      .should('have.attr', 'placeholder', 'Create a new todo...');
    mainPage.elements
      .footer()
      .invoke('text')
      .then((textInFooter) => {
        expect(helper.convertStringToPlainText(textInFooter)).to.eq(
          'Drag and drop to reorder list'
        );
      });
  });

  it('Should switch to dark mode when the icon is clicked', function () {
    mainPage.elements.themeSwitcher().click();
    mainPage.elements
      .body()
      .should('have.css', 'background')
      .and('include', 'rgb(22, 23, 34)')
      .and('include', 'images/bg-desktop-dark.jpg');
    mainPage.elements
      .themeSwitcherIcon()
      .should('have.attr', 'src', './assets/images/icon-sun.svg');
  });

  it('Should create a new todo item and delete it', function () {
    const inputTextArray = ['Testing'];

    mainPage.createItem(inputTextArray);
    mainPage.checkAndCountItems();

    mainPage.elements
      .item()
      .children('p')
      .should('have.text', inputTextArray[0]);
    mainPage.elements
      .deleteButtonImage()
      .should('have.attr', 'src', './assets/images/icon-cross.svg');

    mainPage.deleteItem(inputTextArray[0]);
    mainPage.checkAndCountItems();

    mainPage.elements.item().should('not.exist', { timeout: 5000 });
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
    mainPage.elements
      .checkedItemStatus()
      .should('have.css', 'background-color', 'rgb(87, 221, 255)');
    mainPage.elements
      .checkedItem()
      .children('p')
      .should(
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

    mainPage.elements.item().first().drag('li:nth-child(3)', {
      force: true,
      log: false,
    });

    mainPage.elements.item().eq(2).should('have.text', 'First item');
  });
});
