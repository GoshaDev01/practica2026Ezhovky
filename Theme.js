// Theme.js

$(document).ready(() => {

    const SCHEMA_LIGHT = 'light';
    const SCHEMA_DARK = 'dark';

    // Папка с css файлами
    // const pathCss = './css';

    let currentSchema;

    // Получить тему из localStorage
    const getSchema = () => localStorage.getItem('schema');

    // Сохранить тему
    const setSchema = (schema) =>
        localStorage.setItem('schema', schema);

    // Получить имя css файла
    const getFileSchema = () =>
        `${currentSchema}Theme.css`;

    // Переключение темы
    $('.toggle').on('click', () => {

        currentSchema =
            currentSchema === SCHEMA_LIGHT
                ? SCHEMA_DARK
                : SCHEMA_LIGHT;

        setSchema(currentSchema);

        loadCss(getFileSchema(), () => {

            updateThemeIcon();

            changeTable(currentSchema);

        });

    });

    // Обновление иконки темы
    const updateThemeIcon = () => {

        const icon = $('.theme-icon');

        if (currentSchema === SCHEMA_LIGHT) {

            icon
                .removeClass('bi-sun-fill')
                .addClass('bi-moon-stars-fill');

        } else {

            icon
                .removeClass('bi-moon-stars-fill')
                .addClass('bi-sun-fill');

        }

    };

    // Изменение стиля таблиц
    const changeTable = (schema) => {

        const tables = $('.table');

        if (tables.length) {

            $.each(tables, (index, element) => {

                if (schema === SCHEMA_LIGHT) {

                    $(element)
                        .removeClass('table-dark')
                        .addClass('table-light');

                } else {

                    $(element)
                        .removeClass('table-light')
                        .addClass('table-dark');

                }

            });

        }

    };

    // Загрузка css файла
    const loadCss = (file, callback) => {

        // Удаляем старую тему
        $('#theme-css').remove();

        // Создаем новый link
        const link = $('<link>')
            .attr({
                id: 'theme-css',
                rel: 'stylesheet',
                href: `${file}?t=${Date.now()}`
            });

        // После загрузки css
        link.on('load', () => {

            if (callback) {
                callback();
            }

        });

        // Добавляем в head
        $('head').append(link);

    };

    // Инициализация темы
    (() => {

        currentSchema = getSchema();

        // Если тема не выбрана
        if (!currentSchema) {

            currentSchema = SCHEMA_LIGHT;

            setSchema(currentSchema);

        }

        // Загружаем css
        loadCss(getFileSchema(), () => {

            updateThemeIcon();

            changeTable(currentSchema);

        });

    })();

});
