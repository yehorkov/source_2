// import checkNumInputs from "./checkNumInputs";
import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'), // Получаем элементы со страницы
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');
          
    const message = { // Переменная с сообщениями для статуса формы (загрузка, отправлено, ошибка отправки формы)
        loading: 'Загрузка',
        succes: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        done: 'assets/img/ok.png',
        failure: 'assets/img/failure.png'
    };

    const path = { // Переменная для путей отправки форм (текст на один адрес, фото на другой)
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const clearInputs = () => { // Функция очистки формы после её отправки
        inputs.forEach(item => { // Перебираем все поля ввода
            item.value = ''; // Устанавливаем им значение пустой строки
        });
        upload.forEach(item => { // Перебираем все поля загрузки изображений
            item.previousElementSibling.textContent = 'Файл не выбран'; // Каждому устанавливаем текстовый контент
        });
    };

    upload.forEach(item => { // Перебираем все поля загрузки изображений
        item.addEventListener('input', () => { // Каждому полю навешием обработчик события. Обработчик сработает, когда пользователь что-то добавит в поле 
            console.log(item.files[0]); // Выводим в консоль информацию о файле (имя файла)
            let dots; // Переменная для точек в конце названия, если оно слишком длинное. Либо будет содержать ..., либо ничего не будет содержать
            const nameArr = item.files[0].name.split('.'); // Получаем имя файла, разбитое на 2 части (до и после точки)

            nameArr[0].length > 5 ? dots = '...' : dots = '.'; // Если первая часть имени файла [0] содержит более 5 символов, то заменить их на ..., иначе ничего не менять
            const name = nameArr[0].substring(0, 5) + dots + nameArr[1]; // Формируем новое имя строки. Обрезаем с конца строки последние 5 символов, после конкатенируем с точками и второй частью строки (форматом изображения)
            item.previousElementSibling.textContent = name; // Вместо соседнего элемента (файл не выбран) помещаем новую строку с обрезанным названием строки (если она была обрезана)
        });
    });

    form.forEach(item => { // Перебираем все формы
        item.addEventListener('submit', (e) => { // На каждую форму навешиваем обработчик события submit
            e.preventDefault(); // Отменяем стандартное поведения браузера, используется, чтобы после отправки формы страница не перезагружалась

            let statusMessage = document.createElement('div'); // Создаём элемент на страницу
            statusMessage.classList.add('status'); // Добавляем этому элементу необходимый класс для оспользования сообщения о статусе отправки
            item.parentNode.appendChild(statusMessage); // Добавляем элемент на страницу

            item.classList.add('animated', 'fadeOutUp'); // Скрываем форму, делая её контент прозрачным
            setTimeout(() => { // Полностью убираем форму с сайта через 400 мс
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img'); // создаём статусное изображение отправки формы
            statusImg.setAttribute('src', message.spinner); // добавляем спиннер в статус формы
            statusImg.classList.add('animated', 'fadeInUp'); //Добавляем анимацию появления спинеру
            statusMessage.appendChild(statusImg); // Для статуса отправки добавляем спиннер вместо обычного сообщения

            let textMessage = document.createElement('div'); // Создаём текстовое сообщение 
            textMessage.textContent = message.loading; // Устанавливаем контент сообщения
            statusMessage.appendChild(textMessage); // Добавляем сообщение на страницу

            const formData = new FormData(item);
            let api; // Переменная для формировки динамического пути для отправки форм
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question; // Если ближайший элемент содержит .popup-design или в классах присутствует calc_form - использовать path.designer для отправки на сервер, иначе использовать path.question
            console.log(api); // Выводим в консоль отправленные данные

            postData(api, formData) // Используем функцию отправки на сервер. Первый аргумент - сервер, куда происходит отправка, второй - данные для отправки
                .then(res => { // Возвращаем результат отправки
                    console.log(res); // выводим его в консоль
                    statusImg.setAttribute('src', message.done); // Устанавливаем сообщение об успешной отправке пользователя
                    textMessage.textContent = message.succes; // и выводим его на страницу
                })
                .catch(() => { // Обрабатываем ошибку при отправке
                    statusImg.setAttribute('src', message.failure); // Устанавливаем сообщение об ошибке отправки формы
                    textMessage.textContent = message.failure; // Устанавливаем сообщение об ошибке при отправке формы
                })
                .finally(() => { // После отправки формы (положительный или отрицательный результат)
                    clearInputs(); // Очищаем форму
                    setTimeout(() => { // И удаляем со страницы
                        statusMessage.remove(); // сообщение о статусе отправки
                        item.style.display = 'block'; // возвращаем форму на страницу
                        item.classList.remove('fadeOutUp'); // убираем класс анимации
                        item.classList.add('fadeInUp'); // добавляем новый класс анимации
                    }, 5000); // через 5 секунд
                });
        });
    });
}

export default forms;