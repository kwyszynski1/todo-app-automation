/*
 * Project: TODO APP - e2e automation
 * Author: konrad.wyszynski
 * Copyright © 2024, konrad.wyszynski
 */

export function createItem(inputTextArray: string[]) {
  inputTextArray.forEach((inputText) => {
    cy.get('.card.add').should('be.visible').type(inputText);
    cy.get('#add-btn').click();
    cy.contains(inputText).should('be.visible');
    cy.log(`**Created item: ${inputText}**`);
  });
}

export function deleteItem(cardName: string) {
  cy.contains(cardName).as('card').next('button').click({ force: true });
  cy.get('@card').should('not.exist', { timeout: 5000 });
  cy.log(`**Deleted item: ${cardName}**`);
}

export function markItemAsCompleted(cardName: string) {
  cy.contains('li.card', cardName).within(() => {
    cy.get('input.cb-input').click();
    cy.log('**Marked item as completed**');
  });
}

export function checkAndCountItems() {
  cy.get('ul.todos').then((list) => {
    if (list.find('li').length > 0) {
      cy.get('li.card:not(.checked)')
        .its('length')
        .then((itemsCount) => {
          cy.get('#items-left').should('have.text', itemsCount);
        });
    } else cy.log('**There are no items in the list**');
  });
}

export function clearCompletedItems() {
  cy.contains('Clear Completed').click();
  cy.log('**Clear Completed**');
}

export function goToActiveTab() {
  cy.contains('Active').click();
  cy.log('**Switched to Active tab**');
}

export function goToCompletedTab() {
  cy.contains('Completed').click();
  cy.log('**Switched to Completed tab**');
}
