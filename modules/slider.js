const slider = (slides, dir, prev, next) => {
    let slideIndex = 1, // Переменная, которая показывает текущий слайд пользователю
        paused = false; // Переменная для паузы перелистывания слайдов по таймауту
    const items = document.querySelectorAll(slides); // Получаем слайды со страницы

          
    function showSlides (n) {
        if (n > items.length) { // Если показывается последний слайд и пользователь перелистывает дальше,
            slideIndex = 1; // то условие показывает снова первый слайд
        }

        if (n < 1) { // Если пользователь с первого слайда перелистывает назад, 
            slideIndex = items.length; // то показать последний имеющийся слайд
        }

        items.forEach(item => { // Скрываем каждый отдельный слайд
            item.classList.add('animated'); // Каждому слайду добавить класс
            item.style.display = 'none'; // И установить display
        });

        items[slideIndex - 1].style.display = 'block'; // показать первый слайд (0 индекс), установив ему display block
    }

    showSlides(slideIndex); // Первичная инициализация слайдера

    function changeSlides (n) { // Реализация функционала слайдера
        showSlides(slideIndex += n); // увеличение индекса картинки слайдера на 1
    }

    try {
        const prevBtn = document.querySelector(prev), // Получаем кнопки слайдера со страницы
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => { // Навешиваем обработчик события на кнопку
            changeSlides(-1); // Уменьшаем индекс слайдера на 1 (листаем назад)
            items[slideIndex - 1].classList.remove('slideInRight'); // Убираем анимацию перелистывание вперёд
            items[slideIndex - 1].classList.add('slideInLeft'); // заменяя её анимацией назад
        });

        nextBtn.addEventListener('click', () => { // Навешиваем обработчик события на кнопку
            changeSlides(1); // Увеличиваем индекс слайдера на 1 (листаем вперёд)
            items[slideIndex - 1].classList.remove('slideInLeft'); // Убираем анимацию перелистывание назад
            items[slideIndex - 1].classList.add('slideInRight'); // заменяя её анимацией вперёд
        });
    } catch(e) {}

    function activateAnimation() { // Функция активации анимации перелистывания
        if (dir === 'vertical') { // Проверка направления слайдера, вертикальное направление
            paused = setInterval(() => { // Автоматическое перелистывание слайдера
                changeSlides(1); // Запускаем фунционал слайдера
                items[slideIndex - 1].classList.add('slideInDown'); // Добавляем анимацию
            }, 3000); // через каждые 3 секунды меняется изображение
        } else { // если направление не указано
            paused = setInterval(() => { // Автоматическое перелистывание слайдера
                changeSlides(1); // Запускаем фунционал слайдера
                items[slideIndex - 1].classList.remove('slideInLeft'); // Убираем анимацию перелистывание назад
                items[slideIndex - 1].classList.add('slideInRight'); // заменяя её анимацией вперёд
            }, 3000); // через каждые 3 секунды меняется изображение
        }
    }

    activateAnimation(); // Первичная инициализация автоматической анимации перелистывания

    items[0].parentNode.addEventListener('mouseenter', () => { // Если пользователь навёл курсор мыши на изображение слайдера
        clearInterval(paused); // Сбросить интервал и отключить автоматическое перелистывание
    });
    items[0].parentNode.addEventListener('mouseleave', () => { // Если пользователь убрал курсор мыши
        activateAnimation(); // Снова активировать слайдер
    });
};

export default slider;