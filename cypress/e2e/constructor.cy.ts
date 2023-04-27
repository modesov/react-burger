describe('Конструктор работоспособен', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/');
  });

  it('Должно открываться и закрываться модальное окно ингредиента', () => {
    cy.get('#bun ul>li:last-child').click();
    cy.get('#modals [class^=modal_header_]').should('have.text', 'Детали ингредиента');
    cy.get('#modals [class^=modal_btnClose_]').click();
    cy.get('#modals').children().should('have.length', 0);

    cy.get('#main ul>li:first-child').click();
    cy.get('#modals [class^=modal_header_]').should('have.text', 'Детали ингредиента');
    cy.get('#modals [class^=modal_btnClose_]').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Должны перетаскиваться ингредиенты в конструктор, удаляться и оформляться заказ', () => {
    const dataTransfer = new DataTransfer();
 
    // Перетаскиваем булку в конструктор
    cy.get('#bun [class^=section-ingredients_item_]:last-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('[class^=burger-constructor_constructorBox_]').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#bun [class^=section-ingredients_item_]:last-child .counter__num').should('have.text', '2');


    // Перетаскиваем соус в конструктор
    cy.get('#sauce [class^=section-ingredients_item_]:last-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('[class^=burger-constructor_constructorBox_]').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#sauce [class^=section-ingredients_item_]:last-child .counter__num').should('have.text', '1');
    // Перетаскиваем еще один такой же ингредиент
    cy.get('#sauce [class^=section-ingredients_item_]:last-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('[class^=burger-constructor_constructorBox_]').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#sauce [class^=section-ingredients_item_]:last-child .counter__num').should('have.text', '2');


    // Перетаскиваем еще (другой) соус в конструктор
    cy.get('#sauce [class^=section-ingredients_item_]:first-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('[class^=burger-constructor_constructorBox_]').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#sauce [class^=section-ingredients_item_]:first-child .counter__num').should('have.text', '1');


    // Перетаскиваем начинку в конструктор
    cy.get('#main [class^=section-ingredients_item_]:first-child').trigger('dragstart', {
      dataTransfer
    }); 
    cy.get('[class^=burger-constructor_constructorBox_]').trigger('drop', {
      dataTransfer
    });
    // Проверяем количество
    cy.get('#main [class^=section-ingredients_item_]:first-child .counter__num').should('have.text', '1');

    
    // Проверяем количество добавленных ингредиентов
    cy.get('.constructor-element_pos_top'); // Верхняя булка есть 
    cy.get('.constructor-element_pos_bottom'); // Нижняя есть

    // Проверяем количество ингредиентов
    cy.get('[class^=burger-constructor_constructorBox_] ul').children().should('have.length', 4);    

    // Удаляем один ингредиент
    cy.get('[class^=burger-constructor_constructorBox_] ul>li:first-child .constructor-element__action').click();

    // Проверяем количество ингредиентов
    cy.get('[class^=burger-constructor_constructorBox_] ul').children().should('have.length', 3); 

    
    // Нажимаем оформить заказ
    cy.get('[class^=burger-constructor_totalBox_] button').contains('Оформить заказ').click();
    // Перебрасывает на логин
    cy.url().should('include', '/login');
    // Вводим данные
    cy.get('input[type=email]').type('msdenimod@yandex.ru');
    cy.get('input[type=password]').type('55187f26-c725-4977-88f6-1291d64f3dfc');
    // Нажимаем войти
    cy.get('form button[type=submit]').contains('Войти').click();
    // Опять Нажимаем оформить заказ
    cy.get('[class^=burger-constructor_totalBox_] button').contains('Оформить заказ').click();
    // Проверяем есть ли модалка (Заказ оформляется примерно 15 секунд)
    cy.get('#modals [class^=order-details_box_]', { timeout: 20000 }).contains('идентификатор заказа');
    // Закрываем модалку
    cy.get('#modals [class^=modal_btnClose_]').click();
    // Проверяем что конструктор очистился
    cy.get('[class^=burger-constructor_constructorBox_]').contains('Перенесите булку сюда');
    // Зайдем в личный кабинет 
    cy.get('a[href*="profile"]').click()
    // Выход
    cy.get('[class^=profile-navigation_list_] li:last-child button').click(); 
    // Проверка что вышел
    cy.url().should('include', '/login');
  });
});
