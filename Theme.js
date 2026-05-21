$(() => {

    const SCHEMA_LIGHT = 'light';
    const SCHEMA_DARK = 'dark';

    const pathCss = '/css';

    let currentSchema;

    const getSchema = () => localStorage.getItem('schema');

    const setSchema = (schema) =>
        localStorage.setItem('schema', schema);

    const getFileSchema = () =>
        `${currentSchema}Theme.css`;

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

    const loadCss = (file, callback) => {

        $("#theme-css").remove();

        const link = $('<link>')
            .attr({
                id: "theme-css",
                rel: "stylesheet",
                href: `css/${file}?t=${Date.now()}`
            });

        link.on('load', () => {

            if (callback) callback();

        });

        $('head').append(link);

    };

    (() => {

        currentSchema = getSchema();

        if (!currentSchema) {

            currentSchema = SCHEMA_LIGHT;

            setSchema(currentSchema);

        }

        loadCss(getFileSchema(), () => {

            updateThemeIcon();

            changeTable(currentSchema);

        });

    })();

});