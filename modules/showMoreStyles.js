import { getResource } from "../services/requests"; // Получаем ресурсы с "сервера"

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger); // Получаем кнопку со страницы
        //   cards = document.querySelectorAll(selector); // Получаем все карточки со страницы

    // cards.forEach(card => { // Перебираем все карточки на странице
    //     card.classList.add('animated', 'fadeInUp'); // Добавляем им класс анимации и саму анимацию
    // });

    // btn.addEventListener('click', () => { // Навешиваем обработчик события на кнопку
    //     cards.forEach(card => { // Перебираем все карточки
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs'); // Убираем у них определённые классы скрытия
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1'); // Добавляем им определённые классы отображения
    //     });
    //     // btn.style.display = 'none'; // После нажатия устанавливаем кнопке свойство display в none
    //     btn.remove(); // Удаляем кнопку со страницы
    // });

        // Выше способ с локальным использованием
    //===============================
        // Способ получения картинок с сервера

    btn.addEventListener('click', function () { // Навешиваем обработчик события
        getResource('assets/db.json') // Получаем ресурсы с сервера
            .then(res => createCards(res.styles)) // Далее создаём карточки
            .catch(error => console.log(error)); // Ловим ошибку

        this.remove(); // Удаляем кнопку со страницы через контекст вызова this
    });

    function createCards(response) { // Функция создания карточек
        response.forEach(({src, title, link}) => { // Перебираем аргумент функции (передан массив объектов)
            let card = document.createElement('div'); // Создаём карточку на сайте

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1'); // Добавляем карточкам определённые классы отображения

            card.innerHTML = ` 
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `; // Рендерим карточку на странице исходя из полученных данных сервера

            document.querySelector(wrapper).appendChild(card); // Обращаемся к элементу на странице и добавляем (аппендим) на него карточку.
        });
    };
};

export default showMoreStyles;