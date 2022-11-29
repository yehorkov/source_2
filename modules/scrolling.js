const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector); // Получаем элемент со страницы

    window.addEventListener('scroll', () => { // На глобальный объект window навешиваем обработчик события scroll, который следит за скроллом пользователя
        if (document.documentElement.scrollTop > 1650) { // Если пользователь проскроллил от верха страницы большше 1650 пикселей
            upElem.classList.add('animated', 'fadeIn'); // Отобразить элемент на странице, добавив классы анимаций и анимации появления
            upElem.classList.remove('fadeOut'); // Удалить класс анимации скрытия элемента
        } else { // Иначе 
            upElem.classList.add('fadeOut'); // Добавить класс анимации скрытия элемента
            upElem.classList.remove('fadeIn'); // Удалить класс анимации отображения элемента
        }
    });

    // Scrolling with requestAnimationFrame
    
    let links = document.querySelectorAll('[href^="#"]'), // ищем все ссылки, которые начинаются с #
        speed = 0.3; // Устанавливаем значение скорости

    links.forEach(link => { // Перебираем все ссылки на странице
        link.addEventListener('click', function(e) { // Навешиваем обработчик события
            e.preventDefault(); // Отменяем стандартное поведение браузера

            let widthTop = document.documentElement.scrollTop, // Получаем со страницы элементы её начала
                hash = this.hash, // Получаем хэш сайта
                toBlock = document.querySelector(hash).getBoundingClientRect().top, // Куда будем поднимать страницу
                start = null; // Стартовая позиция

            requestAnimationFrame(step); // Используем стандартное API 

            function step(time) { // Функция скролла страницы к началу
                if (start === null) { // Если стартовая позиция не определена
                    start = time; // Установить её значение в time
                }

                let progress = time - start,
                    pixels = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : // Если toBlock меньше 0, в таком случае высота до верха минус прогресс разделённый на скорость, высота до верха + toBlock
                              Math.min(widthTop + progress/speed, widthTop + toBlock)); // Или произвести обратные вычисления

                    document.documentElement.scrollTo(0, pixels); // Обращаемся к документу и говорим ему проскролить страницу к 0 от значения pixels

                if (pixels != widthTop + toBlock) { // Если pixels не равен сумме widthTop и toBlock
                    requestAnimationFrame(step); // Вызываем анимацию пролистывания
                } else { // Иначе
                    location.hash = hash; // Перезаписываем значение локального хеша
                }
            };
        });
    });

    // Pure JS scrolling

    // const element = document.documentElement,
    //       body = document.body;

    // const calcScroll = () => { // Функция подсчёта сколько нужно пролистать и как это сделать
    //     upElem.addEventListener('click', function(event) { // Навешиваем обработчик события
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); // Определяем расстояние, которое было пролистано сверху

    //         if (this.hash !== '') { // Если хеш содержить символы
    //             event.preventDefault(); // Отменить стандартное поведение браузера
    //             let hashElement = document.querySelector(this.hash), // Получаем хеш со страницы и помещаем его в переменную
    //                 hashElementTop = 0; // Переменная, подсчитывающая сколько еще нужно пролистать пикселей до родителя этого хеш элемента

    //             while (hashElement.offsetParent) { // Пока ближайший родитель хеша
    //                 hashElementTop += hashElement.offsetTop; // Изменить значние верха (0) на значение пролистанное от верха (offsetTop)
    //                 hashElement = hashElement.offsetParent; // Изменить хэш элемент на его ближайшего родителя
    //             }

    //             hashElementTop = Math.round(hashElementTop); // Округляем значение
    //             smoothScroll(scrollTop, hashElementTop, this.hash); // Вызываем анимацию скролла вверх
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => { // Инициализируем функцию скролла
    //     let timeInterval = 1, // Устанавливаем интервал
    //         prevScrollTop, // предшествующее значение
    //         speed; // скорость

    //     if (to > from) { // Определяем в какую сторону будем листать. Если куда (to) больше, чем откуда (from)
    //         speed = 30; // Установить значение сверху вниз
    //     } else {
    //         speed = -30; // Установить значение снизу вверх
    //     }

    //     let move = setInterval(function() { // Создаём анимацию перелистывания
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); // Определяем расстояние, которое было пролистано сверху

    //         if ( // Если предшествующее значение равно пролистанному значению ИЛИ (куда больше, чем откуда И пролистанное значение больше, чем откуда) ИЛИ (куда меньше, чем откуда И пролистанное значение меньше или равно куда)
    //             prevScrollTop === scrollTop ||
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) { // В таком случае
    //             clearInterval(move); // Сбросить интервал у анимации
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash); // Изменить в строку браузера хеш
    //         } else { // Иначе
    //             body.scrollTop += speed; // Добавляем скорость (из условия) к пролистанному расстоянию
    //             element.scrollTop += speed; // Добавляем скорость (из условия) к пролистанному расстоянию
    //             prevScrollTop = scrollTop; // Записываем значение, чтобы знать как оно изменяется
    //         }
    //     }, timeInterval); // Добавляем интервал обновления
    // };

    // calcScroll(); // Вызываем функцию подсчёта пикселй для пролистывания
};

export default scrolling;