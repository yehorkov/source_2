import { postData } from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unHighlight(item) {
        item.closest('.file_upload').style.border = 'none';

        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighlight(input), false);
        });
    });

    const clearInputs = () => {
        fileInputs.forEach(input => {
            input.value = '';
        });

        fileInputs.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        })
    };

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const nameArr = input.files[0].name.split('.');

            nameArr[0].length > 5 ? dots = '...' : dots = '.';
            const name = nameArr[0].substring(0, 5) + dots + nameArr[1];
            input.previousElementSibling.textContent = name;

            if (input.closest('main')) {
                const formData = new FormData();
                formData.append('file', input.files[0]);

                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(() => {
                        console.log('Error');
                    })
                    .finally(() => {
                        clearInputs();
                    });
            }
        });
    });
};

export default drop;