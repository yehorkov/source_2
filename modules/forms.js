// import checkNumInputs from "./checkNumInputs";
import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');
          
    const message = {
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

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const nameArr = item.files[0].name.split('.');

            nameArr[0].length > 5 ? dots = '...' : dots = '.';
            const name = nameArr[0].substring(0, 5) + dots + nameArr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

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
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.done);
                    textMessage.textContent = message.succes;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.failure);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
}

export default forms;