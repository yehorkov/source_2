const accordion = (triggersSelector) => { //itemsSelector
    const btns = document.querySelectorAll(triggersSelector); // Получаем элементы со страницы
        //   items = document.querySelectorAll(itemsSelector);

    // items.forEach(block => { // Перебираем все элементы на странице
    //     block.classList.add('animated', 'fadeInUp'); // Добавляем им классы анимации
    // });

    // btns.forEach(btn => { // Перебираем все кнопки на странице
    //     btn.addEventListener('click', function() { // Навешиваем обработчик события и пишем функцию
    //         if (!this.classList.contains('active')) { // Если в классах отстутствует active
    //             btns.forEach(btn => { // Перебираем все кнопки
    //                 btn.classList.remove('active', 'active-style') // Удаляем определённые классы
    //             });
    //             this.classList.add('active', 'active-style'); // Добавляем классы активности
    //         }
    //     });
    // });

    //====================
    // btns.forEach(btn => { // Перебираем кнопки
    //     btn.addEventListener('click', function() { // Навешиваем обработчик события и пишем функцию
    //         this.classList.toggle('active-style'); // "тоглим" класс активности (если он есть мы его убирает и наоборот)
    //         this.nextElementSibling.classList.toggle('active-content'); // "тоглим" класс активности у следующего элемента

    //         if (this.classList.contains('active-style')) { // Если классах содержится active-style
    //             this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'; // Следующему дочерному элементу назначаем максимальную высоту, равную высоте следующего элемента + 80px
    //         } else { // Иначе
    //             this.nextElementSibling.style.maxHeight = '0px'; // Устанавливаем высоту элемента равную 0px
    //         }
    //     });
    // });

    //====================
    btns.forEach(btn => { // Перебираем кнопки
        btn.addEventListener('click', function() { // Навешиваем обработчик события и пишем функцию
            if (!this.classList.contains('active-style')) { // Если в классах содержится active-style
                btns.forEach(item => { // Перебираем все кнопки
                    item.classList.remove('active-class'); // У каждой кнопки убираем класс
                    item.classList.remove('active-style');
                    item.nextElementSibling.classList.remove('active-content'); // И у следующего дочерного элемента убираем класс,
                    item.nextElementSibling.style.maxHeight = '0px'; // и устанавливаем максимальную высоту равную 0px
                });
                this.classList.add('active-style'); // Добавляем класс активности
                this.nextElementSibling.classList.add('active-content'); // Добавляем класс активности
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px'; // Следующему дочерному элементу назначаем максимальную высоту, равную высоте следующего элемента + 80px
            } else { // Иначе 
                this.classList.remove('active-style'); // Убираем класс активности
                this.nextElementSibling.classList.remove('active-content'); // Убираем класс активности
                this.nextElementSibling.style.maxHeight = '0px'; // И устанавливаем максимальую высоту равную 0px
            };
        });
    });
};

export default accordion;