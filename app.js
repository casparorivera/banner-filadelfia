/* =========================================================
   BANNER FILADELFIA
   Motor del generador
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
    const bannerBackground = document.getElementById("bannerBackground");
    const bannerLogo = document.getElementById("bannerLogo");

    const bannerTitle = document.getElementById("bannerTitle");
    const bannerSubtitle = document.getElementById("bannerSubtitle");

    const bannerDate = document.getElementById("bannerDate");
    const bannerTime = document.getElementById("bannerTime");

    const bannerLocation = document.getElementById("bannerLocation");
    const bannerExtra = document.getElementById("bannerExtra");

    const formatLabel = document.getElementById("formatLabel");


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

            const response = await fetch("templates.json");

            if (!response.ok) {
                throw new Error("No se pudo cargar templates.json");
            }

            templates = await response.json();

            templateSelect.innerHTML = "";

            Object.keys(templates).forEach((templateId) => {

                const template = templates[templateId];

                const option = document.createElement("option");

                option.value = templateId;
                option.textContent = template.name;

                templateSelect.appendChild(option);

            });


            /* Seleccionar la primera plantilla */

            const firstTemplate = Object.keys(templates)[0];

            if (firstTemplate) {

                templateSelect.value = firstTemplate;

                currentTemplate = templates[firstTemplate];

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

        const template = currentTemplate;


        /* Fondo de la plantilla */

        if (template.background) {

            bannerBackground.style.backgroundImage =
                template.background;

        }


        /* Color del texto */

        if (template.textColor) {

            banner.style.color = template.textColor;

        }


        /* Capa oscura */

        const overlay = document.getElementById("bannerOverlay");

        if (overlay && template.overlay) {

            overlay.style.background = template.overlay;

        }


        /* Título */

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


        /* Subtítulo */

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


        /* Actualizar información */

        updateBanner();

    }


    /* =====================================================
       ACTUALIZAR BANNER
       ===================================================== */

    function updateBanner() {

        bannerTitle.textContent =
            titleInput.value.trim() ||
            "Título del evento";


        bannerSubtitle.textContent =
            subtitleInput.value.trim() ||
            "Subtítulo del evento";


        bannerDate.textContent =
            dateInput.value.trim() ||
            "Fecha";


        bannerTime.textContent =
            timeInput.value.trim() ||
            "Hora";


        bannerLocation.textContent =
            locationInput.value.trim() ||
            "Lugar";


        bannerExtra.textContent =
            extraInput.value.trim() ||
            "Texto adicional";


        /* Mostrar u ocultar elementos vacíos */

        bannerSubtitle.style.display =
            subtitleInput.value.trim()
                ? "block"
                : "none";


        bannerDate.style.display =
            dateInput.value.trim()
                ? "inline"
                : "none";


        bannerTime.style.display =
            timeInput.value.trim()
                ? "inline"
                : "none";


        bannerLocation.style.display =
            locationInput.value.trim()
                ? "block"
                : "none";


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

        const format = formatSelect.value;


        banner.classList.remove(
            "square",
            "story",
            "facebook"
        );


        banner.classList.add(format);


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

    imageInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {

            bannerBackground.style.backgroundImage =
                `url("${e.target.result}")`;

        };

        reader.readAsDataURL(file);

    });


    /* =====================================================
       CARGAR LOGO
       ===================================================== */

    logoInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {

            bannerLogo.src = e.target.result;

            bannerLogo.style.display =
                "block";

        };

        reader.readAsDataURL(file);

    });


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


    inputs.forEach((input) => {

        input.addEventListener(
            "input",
            updateBanner
        );

    });


    /* =====================================================
       CAMBIAR PLANTILLA
       ===================================================== */

    templateSelect.addEventListener("change", () => {

        const selected =
            templateSelect.value;

        currentTemplate =
            templates[selected];

        applyTemplate();

    });


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

            if (typeof html2canvas === "undefined") {

                alert(
                    "No se pudo cargar el sistema de generación de imágenes."
                );

                return;
            }


            const originalWidth =
                banner.style.width;

            const originalHeight =
                banner.style.height;


            /* Determinar tamaño real */

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


            /* Crear imagen */

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


                const title =
                    titleInput.value.trim()
                        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
                        .replace(/\s+/g, "-");


                link.download =
                    `${title || "banner-filadelfia"}.png`;


                link.href =
                    canvas.toDataURL("image/png");


                link.click();


            } catch (error) {

                console.error(error);

                alert(
                    "No fue posible generar el banner. Intenta nuevamente."
                );

            }


            /* Restaurar tamaño de vista previa */

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
