const calc = (size, material, options, promocode, result) => { // Передача в функцию необходимых аргументов и промокода
    const sizeBlock = document.querySelector(size), // Получаем элементы со страницы
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0; // Начальная сумма

    const calcFunction = () => { // Функцию подсчёта суммы заказа
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value)); // Получаем сумму, округлённую к ближайшему целому числу. Считается по формуле: значение размера умножить на значение материала и добавить блок дополнительных опций (цифры указаны в вёрстке)

        if (sizeBlock.value == '' || materialBlock.value == '') { // Если значение размера или значение материала не указаны или не выбраны
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'; // Выводим сообщение на страницу
        } else if (promocodeBlock.value === 'IWANTPOPART') { // Если в блок промокода введён промокод
            resultBlock.textContent = Math.round(sum * 0.7); // От полученной суммы отнимаем 30%
        } else { // Иначе
            resultBlock.textContent = sum; // Показываем пользователю сумму заказа (показываем с промокодом тоже)
        }
    };

    sizeBlock.addEventListener('change', calcFunction); // Навешиваем необходимые обработчики событий и вызываем функцию подсчёта
    materialBlock.addEventListener('change', calcFunction);
    optionsBlock.addEventListener('change', calcFunction);
    promocodeBlock.addEventListener('input', calcFunction);
};

export default calc;