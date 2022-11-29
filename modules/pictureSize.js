const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector); // Получаем элементы со страницы

    function showImg (block) { // Функция показа изображений
        const img = block.querySelector('img'); // Получаем изображения со страницы
        img.src = img.src.slice(0, -4) + '-1.png'; // Изменяем название изображения, отрезая последние 4 символа и добавляя в конец -1.png (картинки для показа в названии, перед точкой, седержат -1)
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => { // Получаем элементы со страницы с псевдоклассом :not (в данном случае не содержащие .sizes-hit) и перебираем их
            p.style.display = 'none'; // Для каждого элемента ставим стиль display none
        });
    }

    function hideImg (block) { // Функция скрытия изображений
        const img = block.querySelector('img'); // Получаем изображение со страницы
        img.src = img.src.slice(0, -6) + '.png'; // Изменяем новый путь изображения (изменяли в функции showImg), удаляя последние 6 символов и добавляем в конец расширение изображения
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => { // Получаем элементы со страницы с псевдоклассом :not (в данном случае не содержащие .sizes-hit) и перебираем их
            p.style.display = 'block'; // Для каждого элемента ставим стиль display block
        });
    }

    blocks.forEach(block => { // Перебираем все элементы на странице
        block.addEventListener('mouseover', () => { // Навешиваем обработчик события наведения мыши
            showImg(block); // Показываем изображение
        });
        block.addEventListener('mouseout', () => { // Навешиваем обработчик события ухода мыши с элемента
            hideImg(block); // Скрываем изображение
        });
    });
}

export default pictureSize;