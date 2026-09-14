/* =========================================================
   BANNER FILADELFIA
   Generador de banners
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS DEL FORMULARIO
       ===================================================== */

    const templateSelect = document.getElementById("templateSelect");
    const formatSelect = document.getElementById("formatSelect");

    const titleInput = document.getElementById("titleInput");
    const subtitleInput = document.getElementById("subtitleInput");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");
    const locationInput = document.getElementById("locationInput");
    const extraInput = document.getElementById("extraInput");

    const imageInput = document.getElementById("imageInput");
    const logoInput = document.getElementById("logoInput");

    const downloadButton = document.getElementById("downloadButton");


    /* =====================================================
       ELEMENTOS DEL BANNER
       ===================================================== */

    const banner = document.getElementById("banner");
    const bannerBackground =
        document.getElementById("bannerBackground");

    const bannerLogo =
        document.getElementById("bannerLogo");

    const bannerTitle =
        document.getElementById("bannerTitle");

    const bannerSubtitle =
        document.getElementById("bannerSubtitle");

    const bannerDate =
        document.getElementById("bannerDate");

    const bannerTime =
        document.getElementById("bannerTime");

    const bannerLocation =
        document.getElementById("bannerLocation");

    const bannerExtra =
        document.getElementById("bannerExtra");

    const formatLabel =
        document.getElementById("formatLabel");

    const separator =
        document.querySelector(".separator");

    const overlay =
        document.getElementById("bannerOverlay");


    /* =====================================================
       VARIABLES
       ===================================================== */

    let templates = {};
    let currentTemplate = null;


    /* =====================================================
       CARGAR PLANTILLAS
       ===================================================== */

    async function loadTemplates() {

        try {

            const response =
                await fetch("templates.json");

            if (!response.ok) {
                throw new Error(
                    "No se pudo cargar templates.json"
                );
            }

            templates =
                await response.json();

            templateSelect.innerHTML = "";


            Object.keys(templates).forEach(
                (templateId) => {

                    const template =
                        templates[templateId];

                    const option =
                        document.createElement("option");

                    option.value =
                        templateId;

                    option.textContent =
                        template.name;

                    templateSelect.appendChild(
                        option
                    );

                }
            );


            /* Seleccionar primera plantilla */

            const firstTemplate =
                Object.keys(templates)[0];

            if (firstTemplate) {

                templateSelect.value =
                    firstTemplate;

                currentTemplate =
                    templates[firstTemplate];

                applyTemplate();

            }

        } catch (error) {

            console.error(error);

            templateSelect.innerHTML = `
                <option value="">
                    Error al cargar plantillas
                </option>
            `;

        }

    }


    /* =====================================================
       APLICAR PLANTILLA
       ===================================================== */

    function applyTemplate() {

        if (!currentTemplate) {
            return;
        }

        const template =
            currentTemplate;


        /* -------------------------------------------------
           CLASE DE PLANTILLA
           ------------------------------------------------- */

        banner.classList.remove(
            "template-worship",
            "template-elegante",
            "template-minimalista"
        );


        if (templateSelect.value) {

            banner.classList.add(
                `template-${templateSelect.value}`
            );

        }


        /* -------------------------------------------------
           FONDO
           ------------------------------------------------- */

        if (template.background) {

            bannerBackground.style.backgroundImage =
                template.background;

        }


        /* -------------------------------------------------
           COLOR DEL TEXTO
           ------------------------------------------------- */

        if (template.textColor) {

            banner.style.color =
                template.textColor;

        }


        /* -------------------------------------------------
           OVERLAY
           ------------------------------------------------- */

        if (template.overlay) {

            overlay.style.background =
                template.overlay;

        }


        /* -------------------------------------------------
           TÍTULO
           ------------------------------------------------- */

        if (template.title) {

            if (template.title.fontSize) {

                bannerTitle.style.fontSize =
                    template.title.fontSize;

            }

            if (template.title.fontWeight) {

                bannerTitle.style.fontWeight =
                    template.title.fontWeight;

            }

            if (template.title.letterSpacing) {

                bannerTitle.style.letterSpacing =
                    template.title.letterSpacing;

            }

            if (template.title.textTransform) {

                bannerTitle.style.textTransform =
                    template.title.textTransform;

            }

        }


        /* -------------------------------------------------
           SUBTÍTULO
           ------------------------------------------------- */

        if (template.subtitle) {

            if (template.subtitle.fontSize) {

                bannerSubtitle.style.fontSize =
                    template.subtitle.fontSize;

            }

            if (template.subtitle.fontWeight) {

                bannerSubtitle.style.fontWeight =
                    template.subtitle.fontWeight;

            }

        }


        /* Actualizar banner */

        updateBanner();

    }


    /* =====================================================
       ACTUALIZAR BANNER
       ===================================================== */

    function updateBanner() {


        /* -------------------------------------------------
           TÍTULO
           ------------------------------------------------- */

        bannerTitle.textContent =
            titleInput.value.trim() ||
            "Título del evento";


        /* -------------------------------------------------
           SUBTÍTULO
           ------------------------------------------------- */

        bannerSubtitle.textContent =
            subtitleInput.value.trim() ||
            "Subtítulo del evento";


        /* -------------------------------------------------
           FECHA
           ------------------------------------------------- */

        bannerDate.textContent =
            dateInput.value.trim() ||
            "Fecha";


        /* -------------------------------------------------
           HORA
           ------------------------------------------------- */

        bannerTime.textContent =
            timeInput.value.trim() ||
            "Hora";


        /* -------------------------------------------------
           LUGAR
           ------------------------------------------------- */

        bannerLocation.textContent =
            locationInput.value.trim() ||
            "Lugar";


        /* -------------------------------------------------
           TEXTO EXTRA
           ------------------------------------------------- */

        bannerExtra.textContent =
            extraInput.value.trim() ||
            "Texto adicional";


        /* -------------------------------------------------
           MOSTRAR / OCULTAR SUBTÍTULO
           ------------------------------------------------- */

        bannerSubtitle.style.display =
            subtitleInput.value.trim()
                ? "block"
                : "none";


        /* -------------------------------------------------
           MOSTRAR / OCULTAR FECHA
           ------------------------------------------------- */

        bannerDate.style.display =
            dateInput.value.trim()
                ? "inline"
                : "none";


        /* -------------------------------------------------
           MOSTRAR / OCULTAR HORA
           ------------------------------------------------- */

        bannerTime.style.display =
            timeInput.value.trim()
                ? "inline"
                : "none";


        /* -------------------------------------------------
           MOSTRAR / OCULTAR SEPARADOR
           ------------------------------------------------- */

        if (separator) {

            separator.style.display =
                dateInput.value.trim() &&
                timeInput.value.trim()
                    ? "inline"
                    : "none";

        }


        /* -------------------------------------------------
           MOSTRAR / OCULTAR LUGAR
           ------------------------------------------------- */

        bannerLocation.style.display =
            locationInput.value.trim()
                ? "block"
                : "none";


        /* -------------------------------------------------
           MOSTRAR / OCULTAR TEXTO EXTRA
           ------------------------------------------------- */

        bannerExtra.style.display =
            extraInput.value.trim()
                ? "block"
                : "none";


        /* Actualizar formato */

        updateFormat();

    }


    /* =====================================================
       CAMBIAR FORMATO
       ===================================================== */

    function updateFormat() {

        const format =
            formatSelect.value;


        banner.classList.remove(
            "square",
            "story",
            "facebook"
        );


        banner.classList.add(
            format
        );


        /* -------------------------------------------------
           ETIQUETA DEL FORMATO
           ------------------------------------------------- */

        if (format === "square") {

            formatLabel.textContent =
                "1080 × 1080";

        }


        if (format === "story") {

            formatLabel.textContent =
                "1080 × 1920";

        }


        if (format === "facebook") {

            formatLabel.textContent =
                "1200 × 628";

        }

    }


    /* =====================================================
       CARGAR IMAGEN DE FONDO
       ===================================================== */

    imageInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];

            if (!file) {
                return;
            }

            const reader =
                new FileReader();


            reader.onload =
                (e) => {

                    bannerBackground.style.backgroundImage =
                        `url("${e.target.result}")`;

                };


            reader.readAsDataURL(file);

        }
    );


    /* =====================================================
       CARGAR LOGO
       ===================================================== */

    logoInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];

            if (!file) {
                return;
            }

            const reader =
                new FileReader();


            reader.onload =
                (e) => {

                    bannerLogo.src =
                        e.target.result;

                    bannerLogo.style.display =
                        "block";

                };


            reader.readAsDataURL(file);

        }
    );


    /* =====================================================
       CAMPOS EN TIEMPO REAL
       ===================================================== */

    const inputs = [
        titleInput,
        subtitleInput,
        dateInput,
        timeInput,
        locationInput,
        extraInput
    ];


    inputs.forEach(
        (input) => {

            input.addEventListener(
                "input",
                updateBanner
            );

        }
    );


    /* =====================================================
       CAMBIAR PLANTILLA
       ===================================================== */

    templateSelect.addEventListener(
        "change",
        () => {

            const selected =
                templateSelect.value;

            currentTemplate =
                templates[selected];

            applyTemplate();

        }
    );


    /* =====================================================
       CAMBIAR FORMATO
       ===================================================== */

    formatSelect.addEventListener(
        "change",
        updateFormat
    );


    /* =====================================================
       GENERAR PNG
       ===================================================== */

    downloadButton.addEventListener(
        "click",
        async () => {

            if (
                typeof html2canvas ===
                "undefined"
            ) {

                alert(
                    "No se pudo cargar el sistema de generación de imágenes."
                );

                return;

            }


            const originalWidth =
                banner.style.width;

            const originalHeight =
                banner.style.height;


            /* -------------------------------------------------
               TAMAÑO REAL DE EXPORTACIÓN
               ------------------------------------------------- */

            const format =
                formatSelect.value;


            if (format === "square") {

                banner.style.width =
                    "1080px";

                banner.style.height =
                    "1080px";

            }


            if (format === "story") {

                banner.style.width =
                    "1080px";

                banner.style.height =
                    "1920px";

            }


            if (format === "facebook") {

                banner.style.width =
                    "1200px";

                banner.style.height =
                    "628px";

            }


            /* -------------------------------------------------
               GENERAR IMAGEN
               ------------------------------------------------- */

            try {

                const canvas =
                    await html2canvas(
                        banner,
                        {
                            scale: 1,
                            useCORS: true,
                            backgroundColor: null
                        }
                    );


                const link =
                    document.createElement("a");


                let fileName =
                    titleInput.value.trim();


                fileName =
                    fileName
                        .replace(
                            /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g,
                            ""
                        )
                        .replace(
                            /\s+/g,
                            "-"
                        );


                if (!fileName) {

                    fileName =
                        "banner-filadelfia";

                }


                link.download =
                    `${fileName}.png`;


                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );


                link.click();


            } catch (error) {

                console.error(error);

                alert(
                    "No fue posible generar el banner. Intenta nuevamente."
                );

            }


            /* -------------------------------------------------
               RESTAURAR VISTA PREVIA
               ------------------------------------------------- */

            banner.style.width =
                originalWidth;

            banner.style.height =
                originalHeight;

        }
    );


    /* =====================================================
       INICIO
       ===================================================== */

    updateBanner();

    loadTemplates();

});
