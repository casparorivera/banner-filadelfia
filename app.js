/* =========================================================
   BANNER FILADELFIA
   Generador de banners
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS DEL FORMULARIO
       ===================================================== */

    const templateSelect =
        document.getElementById("templateSelect");

    const formatSelect =
        document.getElementById("formatSelect");

    const titleInput =
        document.getElementById("titleInput");

    const subtitleInput =
        document.getElementById("subtitleInput");

    const dateInput =
        document.getElementById("dateInput");

    const timeInput =
        document.getElementById("timeInput");

    const locationInput =
        document.getElementById("locationInput");

    const extraInput =
        document.getElementById("extraInput");

    const imageInput =
        document.getElementById("imageInput");

    const logoInput =
        document.getElementById("logoInput");

    const logoSizeInput =
        document.getElementById("logoSizeInput");

    const logoSizeValue =
        document.getElementById("logoSizeValue");

    const logoPositionInput =
        document.getElementById("logoPositionInput");

    const downloadButton =
        document.getElementById("downloadButton");


    /* =====================================================
       ELEMENTOS DEL BANNER
       ===================================================== */

    const banner =
        document.getElementById("banner");

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


        /* CLASE DE PLANTILLA */

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


        /* FONDO */

        if (template.background) {

            bannerBackground.style.backgroundImage =
                template.background;

        }


        /* POSICIÓN DEL FONDO */

        bannerBackground.style.backgroundPosition =
            template.backgroundPosition ||
            "center center";


        /* COLOR DEL TEXTO */

        if (template.textColor) {

            banner.style.color =
                template.textColor;

        }


        /* OVERLAY */

        if (template.overlay) {

            overlay.style.background =
                template.overlay;

        }


        /* TÍTULO */

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


        /* SUBTÍTULO */

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


        updateBanner();

    }


    /* =====================================================
       ACTUALIZAR BANNER
       ===================================================== */

    function updateBanner() {

        /* TÍTULO */

        bannerTitle.textContent =
            titleInput.value.trim() ||
            "Título del evento";


        /* SUBTÍTULO */

        bannerSubtitle.textContent =
            subtitleInput.value.trim() ||
            "Subtítulo del evento";


        /* FECHA */

        bannerDate.textContent =
            dateInput.value.trim() ||
            "Fecha";


        /* HORA */

        bannerTime.textContent =
            timeInput.value.trim() ||
            "Hora";


        /* LUGAR */

        bannerLocation.textContent =
            locationInput.value.trim() ||
            "Lugar";


        /* TEXTO EXTRA */

        bannerExtra.textContent =
            extraInput.value.trim() ||
            "Texto adicional";


        /* MOSTRAR / OCULTAR SUBTÍTULO */

        bannerSubtitle.style.display =
            subtitleInput.value.trim()
                ? "block"
                : "none";


        /* MOSTRAR / OCULTAR FECHA */

        bannerDate.style.display =
            dateInput.value.trim()
                ? "inline"
                : "none";


        /* MOSTRAR / OCULTAR HORA */

        bannerTime.style.display =
            timeInput.value.trim()
                ? "inline"
                : "none";


        /* SEPARADOR */

        if (separator) {

            separator.style.display =
                dateInput.value.trim() &&
                timeInput.value.trim()
                    ? "inline"
                    : "none";

        }


        /* MOSTRAR / OCULTAR LUGAR */

        bannerLocation.style.display =
            locationInput.value.trim()
                ? "block"
                : "none";


        /* MOSTRAR / OCULTAR TEXTO EXTRA */

        bannerExtra.style.display =
            extraInput.value.trim()
                ? "block"
                : "none";


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


        if (bannerBackground) {

            bannerBackground.style.backgroundSize =
                "cover";

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


            if (!file.type.startsWith("image/")) {

                alert(
                    "Por favor selecciona una imagen válida."
                );

                imageInput.value = "";

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                (e) => {

                    bannerBackground.style.backgroundImage =
                        `url("${e.target.result}")`;

                    bannerBackground.style.backgroundSize =
                        "cover";

                    bannerBackground.style.backgroundRepeat =
                        "no-repeat";

                    bannerBackground.style.backgroundPosition =
                        "center center";

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


            if (!file.type.startsWith("image/")) {

                alert(
                    "Por favor selecciona una imagen válida para el logo."
                );

                logoInput.value = "";

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

                    updateLogoSize();

                    updateLogoPosition();

                };


            reader.readAsDataURL(file);

        }
    );


    /* =====================================================
       TAMAÑO DEL LOGO
       ===================================================== */

    function updateLogoSize() {

        const size =
            logoSizeInput.value;

        bannerLogo.style.width =
            `${size}%`;

        logoSizeValue.textContent =
            `${size}%`;

    }


    logoSizeInput.addEventListener(
        "input",
        updateLogoSize
    );


    /* =====================================================
       POSICIÓN DEL LOGO
       ===================================================== */

    function updateLogoPosition() {

        const position =
            logoPositionInput.value;


        /* Remover posiciones anteriores */

        banner.classList.remove(
            "logo-top-left",
            "logo-top-center",
            "logo-top-right",
            "logo-center-left",
            "logo-center",
            "logo-center-right",
            "logo-bottom-left",
            "logo-bottom-center",
            "logo-bottom-right"
        );


        /* Agregar nueva posición */

        banner.classList.add(
            `logo-${position}`
        );

    }


    logoPositionInput.addEventListener(
        "change",
        updateLogoPosition
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


            let targetWidth;
            let targetHeight;


            if (
                formatSelect.value ===
                "square"
            ) {

                targetWidth = 1080;
                targetHeight = 1080;

            }


            if (
                formatSelect.value ===
                "story"
            ) {

                targetWidth = 1080;
                targetHeight = 1920;

            }


            if (
                formatSelect.value ===
                "facebook"
            ) {

                targetWidth = 1200;
                targetHeight = 628;

            }


            const previewWidth =
                banner.getBoundingClientRect().width;

            const previewHeight =
                banner.getBoundingClientRect().height;


            const scaleX =
                targetWidth /
                previewWidth;

            const scaleY =
                targetHeight /
                previewHeight;


            const exportScale =
                Math.max(
                    scaleX,
                    scaleY
                );


            const safeScale =
                Math.min(
                    exportScale,
                    3
                );


            try {

                const canvas =
                    await html2canvas(
                        banner,
                        {
                            scale:
                                safeScale,

                            useCORS:
                                true,

                            allowTaint:
                                false,

                            backgroundColor:
                                null,

                            width:
                                previewWidth,

                            height:
                                previewHeight
                        }
                    );


                const finalCanvas =
                    document.createElement("canvas");

                finalCanvas.width =
                    targetWidth;

                finalCanvas.height =
                    targetHeight;


                const finalContext =
                    finalCanvas.getContext("2d");


                finalContext.drawImage(
                    canvas,
                    0,
                    0,
                    targetWidth,
                    targetHeight
                );


                const link =
                    document.createElement("a");

                link.download =
                    `banner-filadelfia-${formatSelect.value}.png`;

                link.href =
                    finalCanvas.toDataURL(
                        "image/png"
                    );

                link.click();


            } catch (error) {

                console.error(error);

                alert(
                    "No se pudo generar el PNG."
                );

            }

        }
    );


    /* =====================================================
       CONFIGURACIÓN INICIAL
       ===================================================== */

    updateLogoSize();

    updateLogoPosition();

    updateBanner();

    loadTemplates();

});
