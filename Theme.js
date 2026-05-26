$(document).ready(function () {

    const SCHEMA_LIGHT = 'light';
    const SCHEMA_DARK = 'dark';

    let currentSchema =
        localStorage.getItem('schema') || SCHEMA_LIGHT;

    const setSchema = (schema) => {
        localStorage.setItem('schema', schema);
    };

    const getThemeFile = () => {
        return `${currentSchema}Theme.css`;
    };

    const updateThemeIcon = () => {
        const icon = $('.theme-icon');

        if (currentSchema === SCHEMA_LIGHT) {
            icon.removeClass('bi-sun-fill')
                .addClass('bi-moon-stars-fill');
        } else {
            icon.removeClass('bi-moon-stars-fill')
                .addClass('bi-sun-fill');
        }
    };

    const changeTable = (schema) => {

        const tables = $('.table');

        if (schema === SCHEMA_LIGHT) {

            tables.removeClass('table-dark')
                  .addClass('table-light');

        } else {

            tables.removeClass('table-light')
                  .addClass('table-dark');
        }
    };

    const applyTheme = () => {

        const themeLink = $('#theme-css');

        themeLink.attr('href', getThemeFile());

        updateThemeIcon();

        changeTable(currentSchema);
    };

    $('.toggle').on('click', function () {

        currentSchema =
            currentSchema === SCHEMA_LIGHT
                ? SCHEMA_DARK
                : SCHEMA_LIGHT;

        setSchema(currentSchema);

        applyTheme();
    });

    applyTheme();

});
