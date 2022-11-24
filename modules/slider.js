const slider = (slides, dir, prev, next) => {
    let slideIndex = 1, // Переменная, которая показывает текущий слайд пользователю
        paused = false; // Переменная для паузы перелистывания слайдов по таймауту
    const items = document.querySelectorAll(slides); // Получаем слайды со страницы

          
    function showSlides (n) {
        if (n > items.length) { // Если показывается последний слайд и пользователь перелистывает дальше, то условие показывает снова первый слайд
            slideIndex = 1;
        }

        if (n < 1) { // Если пользователь с первого слайда перелистывает назад, то показать последний имеющийся слайд
            slideIndex = items.length;
        }

        items.forEach(item => { // Скрываем каждый отдельный слайд
            item.classList.add('animated'); // Каждому слайду добавить класс
            item.style.display = 'none'; // И установить display
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex); // Первичная инициализация слайдера

    function changeSlides (n) { // Реализация функционала слайдера
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1)
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
    } catch(e) {}

    function activateAnimation() {
        if (dir === 'vertical') { // Проверка направления слайдера, вертикальное направление
            paused = setInterval(() => {
                changeSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else { // если направление не указано
            paused = setInterval(() => {
                changeSlides(1);
                items[slideIndex - 1].classList.remove('slideInLeft');
                items[slideIndex - 1].classList.add('slideInRight');
            }, 3000);
        }
    }

    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default slider;