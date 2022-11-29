const filter = () => {
    const menu = document.querySelector('.portfolio-menu'), // Получаем все элементы со страницы
          items = menu.querySelectorAll('li'),
          // btnAll = menu.querySelector('.all'),
          // btnLovers = menu.querySelector('.lovers'),
          // btnChef = menu.querySelector('.chef'),
          // btnGirl = menu.querySelector('.girl'),
          // btnGuy = menu.querySelector('.guy'),
          // btnGrandmother = menu.querySelector('.grandmother'),
          // btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          // markGirl = wrapper.querySelectorAll('.girl'),
          // markLovers = wrapper.querySelectorAll('.lovers'),
          // markChef = wrapper.querySelectorAll('.chef'),
          // markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => { // Функция отображения элементов
        markAll.forEach(mark => { // Перебираем элементы со страницы
            mark.style.display = 'none'; // Ставим стиль display none
            mark.classList.remove('animated', 'fadeIn'); // Убираем классы анимации
        });

        no.style.display = 'none'; // Для элемента no ставим стиль display none
        no.classList.remove('animated', 'fadeIn'); // и убираем классы анимации

        if (markType) { // Если передан аргумент
            markType.forEach(mark => { // Перебираем все элементы
                mark.style.display = 'block'; // ставим стиль display block
                mark.classList.add('animated', 'fadeIn'); // и добавляем классы анимации
            });
        }
        if (markType.length == 0) { // Если элементов в данном разделе нет
          no.style.display = 'block'; // Отображаем блок с сообщением, что таких работ не делали
          no.classList.add('animated', 'fadeIn'); // и добавляем ему классы анимации
        }
    };

    // btnAll.addEventListener('click', () => { // Для каждой кнопки навешиваем обработчик события и вызываем функцию для отображения определённого контента
    //     typeFilter(markAll);
    // });

    // btnLovers.addEventListener('click', () => {
    //     typeFilter(markLovers);
    // });

    // btnChef.addEventListener('click', () => {
    //     typeFilter(markChef);
    // });

    // btnGirl.addEventListener('click', () => {
    //     typeFilter(markGirl);
    // });

    // btnGuy.addEventListener('click', () => {
    //     typeFilter(markGuy);
    // });

    // btnGrandmother.addEventListener('click', () => {
    //     typeFilter();
    // });

    // btnGranddad.addEventListener('click', () => {
    //     typeFilter();
    // });

    menu.addEventListener('click', (e) => { // Навешиваем обработчик события
        let classSelect = e.target.classList[0] // По умолчанию выбираем отображение первого элемента
        let allElems = wrapper.querySelectorAll(`.${classSelect}`) // Отображаем элементы на странице
        typeFilter(allElems) // и вызываем функцию, которая отфильтрует элементы
    });

    menu.addEventListener('click', (e) => { // Навешиваем обработчик события
        let target = e.target; // Переменная события

        if (target && target.tagName == 'LI') { // Если событие и имя события содержит 'LI'
            items.forEach(btn => { // Перебираем все элементы
                btn.classList.remove('active'); // Убираем им класс активности
            })
            target.classList.add('active'); // Добавляем класс активности объекту события
        }
    });
};

export default filter;

// Закомментированные переменные использовались в коде, где для каждого типа картин вызывался свой обработчик события