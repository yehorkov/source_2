import { postData } from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]'); // Получаем элементы со страницы

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => { // Назначаем Drag'n'Drop события и перебираем их
        fileInputs.forEach(input => { // Перебираем элементы на странице
            input.addEventListener(eventName, preventDefaults, false); // Навешиваем на них обработчик события
        });
    });

    function preventDefaults(e) { // Функция отмены стандартного поведения браузера
        e.preventDefault(); // Отменяем стандартное поведение браузера
        e.stopPropagation(); // Прекращаем дальнейшую передачу текущего события
    };

    function highlight(item) { // Функция наведения курсора с файлом на область загрузки
        item.closest('.file_upload').style.border = '5px solid yellow'; // Ближайшему элементу .file_upload устанавливаем стиль границы
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)'; // И стиль заднего фона
    }

    function unHighlight(item) { // Функция сброса курсора мыши
        item.closest('.file_upload').style.border = 'none'; // Ближайшему элементу .file_upload убираем границу

        if (item.closest('.calc_form')) { // Если ближайший элемент .calc_form
            item.closest('.file_upload').style.backgroundColor = '#fff'; // Устанавливаем цвет заднего фона
        } else { // Иначе
            item.closest('.file_upload').style.backgroundColor = '#ededed'; // Устанавливаем другой цвет заднего фона
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => { // Перебираем события когда элемент достиг конечного элемента и курсор мыши наведён на элемент
        fileInputs.forEach(input => { // Перебираем все элементы со страницы
            input.addEventListener(eventName, () => highlight(input), false); // Навешиваем обработчик события и в нём вызываем функцию наведения курсора
        });
    });

    ['dragleave', 'drop'].forEach(eventName => { // Перебираем события когда курсор мыши покинул пределы перетаскиваемого элемента и произошел drop элемента
        fileInputs.forEach(input => { // Перебираем все элементы со страницы 
            input.addEventListener(eventName, () => unHighlight(input), false); // Навешиваем обработчик события и в нём вызываем функцию сброса курсора мыши
        });
    });

    const clearInputs = () => { // Функция очисти полей
        fileInputs.forEach(input => { // Перебираем все элементы
            input.value = ''; // Устанавливаем значение пустой строки
        });

        fileInputs.forEach(item => { // Перебираем все элементы
            item.previousElementSibling.textContent = 'Файл не выбран'; // И предыдущему элементу добавляем текст Файл не выбран
        })
    };

    fileInputs.forEach(input => { // Перебираем все элементы
        input.addEventListener('drop', (e) => { // Навешиваем обработчик события drop элемента
            input.files = e.dataTransfer.files; // Обращаемся к файлам в поле и модифицируем их через dataTransfer. dataTransfer - объект с файлами, которые перетаскивают из файловой структуры
            let dots; // Переменная для точек в конце названия, если оно слишком длинное. Либо будет содержать ..., либо ничего не будет содержать
            const nameArr = input.files[0].name.split('.'); // Получаем имя файла, разбитое на 2 части (до и после точки)

            nameArr[0].length > 5 ? dots = '...' : dots = '.'; // Если первая часть имени файла [0] содержит более 5 символов, то заменить их на ..., иначе ничего не менять
            const name = nameArr[0].substring(0, 5) + dots + nameArr[1]; // Формируем новое имя строки. Обрезаем с конца строки последние 5 символов, после конкатенируем с точками и второй частью строки (форматом изображения)
            input.previousElementSibling.textContent = name; // Вместо соседнего элемента (файл не выбран) помещаем новую строку с обрезанным названием строки (если она была обрезана)

            if (input.closest('main')) { // Если у поля ближайший элемент main
                const formData = new FormData(); // Собираем данные, которые есть в форме
                formData.append('file', input.files[0]); // Добавляем (аппендим) в formData новый файл с индексом 0

                postData('assets/server.php', formData) // Используем функцию отправки на сервер. Первый аргумент - сервер, куда происходит отправка, второй - данные для отправки
                    .then(res => { // Возвращаем результат отправки
                        console.log(res); // выводим его в консоль
                    })
                    .catch(() => { // Обрабатываем ошибку при отправке
                        console.log('Error'); // выводим её в консоль
                    })
                    .finally(() => { // После отправки формы (положительный или отрицательный результат)
                        clearInputs(); // Очищаем форму
                    });
            }
        });
    });
};

export default drop;