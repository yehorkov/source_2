const modals = () => {
    let btnPressed; // Для того, чтобы узнать кликнул ли пользователь на какую-то кнопку на сайте

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) { // Передача в функцию через аргументы необходимые кнопки и селекторы для вызова определённых модальных окон, closeClickOverlay отвечает за закрытие модального окна при клике на подложку, destroy отвечает за удаление элемента со страницы, если он был открыт или пользователь кликнул на него
        const trigger = document.querySelectorAll(triggerSelector), // Получение необходимых элементов со страницы
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll(), // Переменная с функцией подсчёта пикселей для полосы прокрутки, которая исчезает при открытии модального окна. Чтобы страница не "прыгала".
              present = document.querySelector('.fixed-gift'); // Переменная для значка подарка, чтобы он не дёргался

        trigger.forEach(item => { // Перебираем все кнопки   
            item.addEventListener('click', (e) => { // и навешиваем на них обработчик события. e - объект события
                if (e.target) { // Ловим событие на определённой кнопке, если оно произошло, то
                    e.preventDefault(); // мы отменяем стандартное поведение браузера
                }

                btnPressed = true; // Если кликнул - изменить на true

                if (destroy) { // Если передан данный аргумент как true, то после нажатия на кнопку элемент удалится
                    item.remove();
                }

                windows.forEach(item => { // Для каждого модального окна
                    item.style.display = 'none'; // устанавливаем, чтобы оно не отображалось при открытии сайта
                    item.classList.add('animated', 'fadeIn') // и добавляем класс с анимацией
                });
    
                modal.style.display = "block"; // иначе при клике на кнопку отображаем окно
                document.body.style.overflow = "hidden"; // Скрываем полосу прокрутки и убирается возможность листать сайт дальше, если модальное окно открыто
                document.body.style.marginRight = `${scroll}px`; // устанавливаем отступ справа на кол-во scroll пикселей (полоса прокрутки)
                present.style.marginRight = `${scroll}px`; // при открытии модального окна делаем отступ справа на необходимое кол-во пикселей, чтобы изображение подарка находилось в одном месте
            });
        });

        close.addEventListener('click', () => { // Навешиваем обработчик события на все кнопки закрывающие модальное окно
            windows.forEach(item => { // Если кнопка закрытия была нажата устанавливаем стиль отображения всех модальных окон (закрываем их)
                item.style.display = 'none';
            });

            modal.style.display = "none"; // Если кнопка закрытия была нажата устанавливаем стиль отображения модального окна (закрываем его)
            document.body.style.overflow = ""; // и снова отображаем полосу прокрутки
            document.body.style.marginRight = `0px`; // убираем отступ справа
            present.style.marginRight = `0px`; // при закрытии возвращаем подарок на место
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Если событие отработало на модальном окне (true)
                windows.forEach(item => {
                    item.style.display = 'none'; // Закрываем все модальные окна при клике на подложку
                });

                modal.style.display = "none"; // Если кнопка закрытия была нажата устанавливаем стиль отображения модального окна (закрываем его)
                document.body.style.overflow = "";  // и снова отображаем полосу прокрутки
                document.body.style.marginRight = `0px`; // убираем отступ справа
                present.style.marginRight = `0px`; // при закрытии возвращаем подарок на место
            }
        });
    }

    function showModalByTime(selector, time) { // Функция отображения модального окна через определённый промежуток времени
        setTimeout(function() {
            let display; // Создаём переменную

            document.querySelectorAll('[data-modal]').forEach(item => { // Получаем все модальные окна и перебираем их
                if (getComputedStyle(item).display !== 'none') { // Если у модального окна стиль отображения не равен none 
                    display = 'block'; // установить его значение в block
                }
            });

            if (!display) { // Если display не равен true
                document.querySelector(selector).style.display = 'block'; // установить его значение в block
                document.body.style.overflow = "hidden"; // и скрыть полосу прокрутки
                let scroll = calcScroll(); //1 - 1 и 2 прописаны, чтобы сайт "не прыгал" во время открытия модального окна
                document.body.style.marginRight = `${scroll}px`; //2
            }
        }, time);
    }

    function calcScroll() { // Функция подсчёта ширины полосы прокрутки
        let div = document.createElement('div'); // Вместо полосы прокрутки создём контейнер

        div.style.width = '50px'; // Задаём ему определённую высоту и ширину
        div.style.height = '50px';
        div.style.overflowY = 'scroll'; // Размещаем блок в области полоы прокрутки
        div.style.visibility = 'hidden'; // Устанавливаем ему отображение в "скрыто"

        document.body.appendChild(div); // Добавляем элемент на странциу
        let scrollWidth = div.offsetWidth - div.clientWidth; // Вычисляем ширину полосы прокрутки у пользователя. offsetWidth - полная ширина блока. clientWidth - ширина элемена внутри границ (включает ширину содержимого и padding, но не включает border и прокрутку)
        div.remove(); // Удаляем элемент со страницы после полученных значений

        return scrollWidth; // Возвращаем полученное значение
    }

    function openByScroll (selector) { // Функция открытия модального окна по скроллу на странице
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // Для поддержки данного функционала в старых браузерах

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) { // Если не была нажата ни одна кнопка и пользователь долистал до конца страницы
                document.querySelector(selector).click(); // навесить событие клик на модальное окно (открыть его)
            } 
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    // showModalByTime('.popup-consultation', 60000);
};

export default modals;