const checkTextInputs = (selector) => { // Функция проверки на ввод символов
    const textInputs = document.querySelectorAll(selector); // Получаем элемент со страницы

    textInputs.forEach(input => { // Перебираем все текстовые поля на страницу
        input.addEventListener('keypress', function(e) { // Навешиваем обработчик события нажатия клавиши
            if (e.key.match(/[^а-яё 0-9]/ig)) { // Если вводимые символы совпадают с русской раскладкой клавиатуры
                e.preventDefault(); // отменяем стандартное поведение браузера
            }
        });
        input.addEventListener('input', () => { // Навешиваем обработчик события
            input.value = input.value.replace(/[a-z]/gim, ''); // Если пользователь вводит буквы английской раскладкой - в поля ничего не вводится
          });
    });
};

export default checkTextInputs;