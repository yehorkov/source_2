const burger = (menuSelector, burgerSelector) => {
    const menu = document.querySelector(menuSelector), // Получаем элементы со страницы
          burger = document.querySelector(burgerSelector);

    menu.style.display = 'none'; // Устанавливаем стиль для меню display none

    burger.addEventListener('click', () => { // Навешиваем обработчик события на кнопку бургера
        if (menu.style.display == 'none' && window.screen.availWidth < 993) { // Если стиль для меню display равен none и ширина экрана меьше, чем 993 пикселя
            menu.style.display = 'block'; // Отобразить меню, установив ему свойство display block
        } else { // Иначе
            menu.style.display = 'none'; // Скрыть меню
        }
    });

    window.addEventListener('resize', () => { // Навешиваем обработчик события на глобальный объект window. Событие resize срабатывает при изменении размера представления документа (окна).
        if (window.screen.availWidth > 992) { // Если текущая ширина экрана больше, чем 992 пикселя 
            menu.style.display = 'none'; // Устанавливаем для меню свойство display none
        }
    });
};

export default burger;