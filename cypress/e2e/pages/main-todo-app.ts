/*
 * Project: TODO APP - e2e automation
 * Author: konrad.wyszynski
 * Copyright © 2024, konrad.wyszynski
 */

class MainPage {
  elements = {
    body: () => cy.get('body'),

    bodyLight: () => cy.get('body.light'),

    header: () => cy.get('header'),

    h1tag: () => cy.get('h1'),

    themeSwitcher: () => cy.get('#theme-switcher'),

    themeSwitcherIcon: () => cy.get('#theme-switcher img'),

    footer: () => cy.get('footer'),

    textBox: () => cy.get('input.txt-input'),

    item: () => cy.get('li.card'),

    itemWithName: (inputText: string) => cy.contains('li.card', inputText),

    checkedItem: () => cy.get('.card.checked'),

    checkedItemStatus: () => cy.get('.card.checked span.check'),

    notCheckedItem: () => cy.get('li.card:not(.checked)'),

    addItemButton: () => cy.get('#add-btn'),

    completedItemRadioButton: () => cy.get('.cb-input'),

    listOfItems: () => cy.get('ul.todos'),

    numberOfItemsLeft: () => cy.get('#items-left'),

    deleteButton: () => cy.get('button.clear'),

    deleteButtonImage: () => cy.get('button.clear img'),

    activeTab: () => cy.contains('Active'),

    completedTab: () => cy.contains('Completed'),

    clearCompletedItemsButton: () => cy.contains('Clear Completed'),
  };

  createItem(inputTextArray: string[]) {
    inputTextArray.forEach((inputText) => {
      this.elements.textBox().should('be.visible').type(inputText);
      this.elements.addItemButton().click();
      this.elements.itemWithName(inputText).should('be.visible');
      cy.log(`**Created item: ${inputText}**`);
    });
  }

  deleteItem(cardName: string) {
    this.elements
      .itemWithName(cardName)
      .children('button')
      .click({ force: true });
    this.elements.itemWithName(cardName).should('not.exist', { timeout: 5000 });
    cy.log(`**Deleted item: ${cardName}**`);
  }

  markItemAsCompleted(cardName: string) {
    this.elements.itemWithName(cardName).within(() => {
      this.elements.completedItemRadioButton().click();
      cy.log('**Marked item as completed**');
    });
  }

  checkAndCountItems() {
    this.elements.listOfItems().then((list) => {
      if (list.find('li').length > 0) {
        this.elements
          .notCheckedItem()
          .its('length')
          .then((itemsCount) => {
            this.elements.numberOfItemsLeft().should('have.text', itemsCount);
          });
      } else cy.log('**There are no items in the list**');
    });
  }

  clearCompletedItems() {
    this.elements.clearCompletedItemsButton().click();
    cy.log('**Clear Completed**');
  }

  goToActiveTab() {
    this.elements.activeTab().click();
    cy.log('**Switched to Active tab**');
  }

  goToCompletedTab() {
    this.elements.completedTab().click();
    cy.log('**Switched to Completed tab**');
  }
}

export default new MainPage();
