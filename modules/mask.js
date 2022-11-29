const mask = (selector) => { // selector для инпутов, которые будут отвечать за валидацию

    let setCursorPosition = (position, element) => { // Функция позиции курсора
        element.focus(); // Устанавливаем вручную фокус на элементе

        if (element.setSelectionRange) { // Если у элемента есть выделение
            element.setSelectionRange(position, position); // устанавливаем курсор в определённую позицию
        } else if (element.createTextRange) { // Иначе если у элемента есть метод выделения
            let range = element.createTextRange(); // Создаём диапазон выделения

            range.collapse(true); // Настройка диапазона. Объединяет граничные точки диапазона (первую с последней позициями)
            range.moveEnd('character', position); // Говорим коду где будет конечная точка выделения
            range.moveStart('character', position); // Говорим коду где будет начальная точка выделения
            range.select(); // Устанавливаем курсор и выделяем значение, сформированное при помощи moveEnd и moveStart
            
            // Так как методам moveEnd и moveStart передаётся одно и тоже число (position), то курсор будет просто установлен в определённую позицию
        }
    };

    function createMask (e) { // Функция создания маски
        let matrix = '+3 (___) ___ __ __', // Матрица для создания маски
            i = 0, // Переменная итератор
            def = matrix.replace(/\D/g, ''), // Заменяем все не числа на пустоту
            val = this.value.replace(/\D/g, ''); // Заменяем все не числа на пустоту

        if (def.length >= val.length) { // Если длина def (кол-во цифр, которое останется в матрице) больше или равно кол-ву цифр в val (value)
            val = def; // Заменяем значение на стандартное, полученное на основе матрицы
        }

        this.value = matrix.replace(/./g, function(a) { // . - каждый элемент, который существует в строке; a - технический аргумент, вместо него будет подставляться каждый символ, который находится в матрице
            return  /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a; // Возвращаем строку, которую показываем пользователю /[_\d]/.test(a) - проверяем диапазон вводимых символов и итератор меньше кол-ва символов в val (выражении, которое уже "избавилось" от всех не цифр). Если это так возвращаем следующий символ (val.charAt(i++)). Если это не так, то проверяем итератор на кол-во символов и, если он больше или равен val, то мы возвращаем пустую строку, иначе возвращаем значение аргумента а
        });

        if (e.type === 'blur') { // Если тип события равен blur
            if (this.value.length == 2) { // Если длина символов в поле равна 2
                this.value = '' // Просто очищаем поле ввода
            }
        } else { // Иначе
            setCursorPosition(this.value.length, this); //Уставливаем курсор в определённую позицию
        }
    }

    let inputs = document.querySelectorAll(selector); // Получаем элементы со страницы

    inputs.forEach(input => { // Перебираем все инпуты на странице
        input.addEventListener('input', createMask); // И навешиваем на них обработчики событий
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;