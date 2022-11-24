const modals = () => {
    let btnPressed; // Для того, чтобы узнать кликнул ли пользователь на какую-то кнопку на сайте

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll(),
              present = document.querySelector('.fixed-gift'); // Переменная для значка подарка, чтобы он не дёргался

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true; // Если кликнул - изменить на true

                if (destroy) { // Если передан данный аргумент как true, то после нажатия на кнопку элемент удалится
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn')
                });
    
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                present.style.marginRight = `${scroll}px`; // при открытии модального окна делаем отступ справа на необходимое кол-во пикселей
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            present.style.marginRight = `0px`; // при закрытии возвращаем подарок на место
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = ""; 
                document.body.style.marginRight = `0px`;
                present.style.marginRight = `0px`; // при закрытии возвращаем подарок на место
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll(); //1 - 1 и 2 прописаны, чтобы сайт "не прыгал" во время открытия модального окна
                document.body.style.marginRight = `${scroll}px`; //2
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll (selector) { // Функция открытия модального окна по скроллу на странице
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // Для поддержки данного функционала в старых браузерах

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) { // Если не была нажата ни одна кнопка и пользователь долистал до конца страницы
                document.querySelector(selector).click();
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