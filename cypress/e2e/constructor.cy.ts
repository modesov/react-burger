describe('Конструктор работоспособен', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Должно открываться и закрываться модальное окно ингредиента', () => {
    cy.get('#bun .section-ingredients_item__MIURy:last-child').click();
    cy.get('#modals .modal_header__ZrtET').should('have.text', 'Детали ингредиента');
    cy.get('#modals button.modal_btnClose__sqy3w').click();
    cy.get('#modals').children().should('have.length', 0);

    cy.get('#main .section-ingredients_item__MIURy:first-child').click();
    cy.get('#modals .modal_header__ZrtET').should('have.text', 'Детали ингредиента');
    cy.get('#modals button.modal_btnClose__sqy3w').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Должны перетаскиваться ингредиенты в конструктор, удаляться и оформляться заказ', () => {
    const dataTransfer = new DataTransfer();
 
    // Перетаскиваем булку в конструктор
    cy.get('#bun .section-ingredients_item__MIURy:last-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('.burger-constructor_constructorBox__5flZl').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#bun .section-ingredients_item__MIURy:last-child .counter__num').should('have.text', '2');


    // Перетаскиваем соус в конструктор
    cy.get('#sauce .section-ingredients_item__MIURy:last-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('.burger-constructor_constructorBox__5flZl').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#sauce .section-ingredients_item__MIURy:last-child .counter__num').should('have.text', '1');
    // Перетаскиваем еще один такой же ингредиент
    cy.get('#sauce .section-ingredients_item__MIURy:last-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('.burger-constructor_constructorBox__5flZl').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#sauce .section-ingredients_item__MIURy:last-child .counter__num').should('have.text', '2');


    // Перетаскиваем еще (другой) соус в конструктор
    cy.get('#sauce .section-ingredients_item__MIURy:first-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('.burger-constructor_constructorBox__5flZl').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#sauce .section-ingredients_item__MIURy:first-child .counter__num').should('have.text', '1');


    // Перетаскиваем начинку в конструктор
    cy.get('#main .section-ingredients_item__MIURy:first-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('.burger-constructor_constructorBox__5flZl').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#main .section-ingredients_item__MIURy:first-child .counter__num').should('have.text', '1');

    
    // Проверяем количество добавленных ингредиентов
    cy.get('.constructor-element_pos_top'); // Верхняя булка есть 
    cy.get('.constructor-element_pos_bottom'); // Нижняя есть

    // Проверяем количество ингредиентов
    cy.get('.burger-constructor_constructorBox__5flZl ul').children().should('have.length', 4);    

    // Удаляем один ингредиент
    cy.get('.burger-constructor_constructorBox__5flZl ul>li:first-child .constructor-element__action').click();

    // Проверяем количество ингредиентов
    cy.get('.burger-constructor_constructorBox__5flZl ul').children().should('have.length', 3); 

    
    // Нажимаем оформить заказ
  });

});
