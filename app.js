document.addEventListener("DOMContentLoaded", () => {

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

    const logoSizeInput = document.getElementById("logoSizeInput");
    const logoSizeValue = document.getElementById("logoSizeValue");
    const logoHorizontalInput = document.getElementById("logoHorizontalInput");
    const logoHorizontalValue = document.getElementById("logoHorizontalValue");
    const logoVerticalInput = document.getElementById("logoVerticalInput");
    const logoVerticalValue = document.getElementById("logoVerticalValue");

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
    const separator = document.querySelector(".separator");
    const overlay = document.getElementById("bannerOverlay");

    const textControls = {
        title: {
            element: bannerTitle,
            fontInput: document.getElementById("titleFontInput"),
            horizontalInput: document.getElementById("titleHorizontalInput"),
            horizontalValue: document.getElementById("titleHorizontalValue"),
            verticalInput: document.getElementById("titleVerticalInput"),
            verticalValue: document.getElementById("titleVerticalValue")
        },
        subtitle: {
            element: bannerSubtitle,
            fontInput: document.getElementById("subtitleFontInput"),
            horizontalInput: document.getElementById("subtitleHorizontalInput"),
            horizontalValue: document.getElementById("subtitleHorizontalValue"),
            verticalInput: document.getElementById("subtitleVerticalInput"),
            verticalValue: document.getElementById("subtitleVerticalValue")
        },
        date: {
            element: bannerDate,
            fontInput: document.getElementById("dateFontInput"),
            horizontalInput: document.getElementById("dateHorizontalInput"),
            horizontalValue: document.getElementById("dateHorizontalValue"),
            verticalInput: document.getElementById("dateVerticalInput"),
            verticalValue: document.getElementById("dateVerticalValue")
        },
        time: {
            element: bannerTime,
            fontInput: document.getElementById("timeFontInput"),
            horizontalInput: document.getElementById("timeHorizontalInput"),
            horizontalValue: document.getElementById("timeHorizontalValue"),
            verticalInput: document.getElementById("timeVerticalInput"),
            verticalValue: document.getElementById("timeVerticalValue")
        },
        location: {
            element: bannerLocation,
            fontInput: document.getElementById("locationFontInput"),
            horizontalInput: document.getElementById("locationHorizontalInput"),
            horizontalValue: document.getElementById("locationHorizontalValue"),
            verticalInput: document.getElementById("locationVerticalInput"),
            verticalValue: document.getElementById("locationVerticalValue")
        },
        extra: {
            element: bannerExtra,
            fontInput: document.getElementById("extraFontInput"),
            horizontalInput: document.getElementById("extraHorizontalInput"),
            horizontalValue: document.getElementById("extraHorizontalValue"),
            verticalInput: document.getElementById("extraVerticalInput"),
            verticalValue: document.getElementById("extraVerticalValue")
        }
    };

    let templates = {};
    let currentTemplate = null;

    async function loadTemplates() {
        try {
            const response = await fetch("templates.json");
            if (!response.ok) throw new Error("No se pudo cargar templates.json");

            const data = await response.json();

            // templates.json puede venir como arreglo (formato original)
            // o como objeto. Aceptamos ambos para no romper las plantillas.
            if (Array.isArray(data)) {
                templates = {};
                data.forEach((template, index) => {
                    const templateId = template.id || template.name || `template-${index}`;
                    templates[templateId] = template;
                });
            } else {
                templates = data || {};
            }

            templateSelect.innerHTML = "";

            Object.keys(templates).forEach((templateId) => {
                const option = document.createElement("option");
                option.value = templateId;
                option.textContent = templates[templateId].name || templateId;
                templateSelect.appendChild(option);
            });

            const firstTemplate = Object.keys(templates)[0];

            if (firstTemplate) {
                templateSelect.value = firstTemplate;
                currentTemplate = templates[firstTemplate];
                applyTemplate();
            }
        } catch (error) {
            console.error(error);
            templateSelect.innerHTML = `<option value="">Error al cargar plantillas</option>`;
        }
    }

    function applyTemplate() {
        if (!currentTemplate) return;

        const template = currentTemplate;

        banner.classList.remove(
            "template-worship",
            "template-elegante",
            "template-minimalista"
        );

        if (templateSelect.value) {
            banner.classList.add(`template-${templateSelect.value}`);
        }

        if (template.background) {
            bannerBackground.style.backgroundImage = template.background;
        }

        bannerBackground.style.backgroundPosition =
            template.backgroundPosition || "center center";

        if (template.textColor) {
            banner.style.color = template.textColor;
        }

        if (template.overlay) {
            overlay.style.background = template.overlay;
        }

        if (template.title) {
            if (template.title.fontSize) bannerTitle.style.fontSize = template.title.fontSize;
            if (template.title.fontWeight) bannerTitle.style.fontWeight = template.title.fontWeight;
            if (template.title.letterSpacing) bannerTitle.style.letterSpacing = template.title.letterSpacing;
            if (template.title.textTransform) bannerTitle.style.textTransform = template.title.textTransform;
        }

        if (template.subtitle) {
            if (template.subtitle.fontSize) bannerSubtitle.style.fontSize = template.subtitle.fontSize;
            if (template.subtitle.fontWeight) bannerSubtitle.style.fontWeight = template.subtitle.fontWeight;
        }

        updateBanner();
    }

    function updateBanner() {
        bannerTitle.textContent = titleInput.value.trim() || "Título del evento";
        bannerSubtitle.textContent = subtitleInput.value.trim() || "Subtítulo del evento";
        bannerDate.textContent = dateInput.value.trim() || "Fecha";
        bannerTime.textContent = timeInput.value.trim() || "Hora";
        bannerLocation.textContent = locationInput.value.trim() || "Lugar";
        bannerExtra.textContent = extraInput.value.trim() || "Texto adicional";

        bannerSubtitle.style.display = subtitleInput.value.trim() ? "block" : "none";
        bannerDate.style.display = dateInput.value.trim() ? "inline" : "none";
        bannerTime.style.display = timeInput.value.trim() ? "inline" : "none";

        if (separator) {
            separator.style.display =
                dateInput.value.trim() && timeInput.value.trim()
                    ? "inline"
                    : "none";
        }

        bannerLocation.style.display = locationInput.value.trim() ? "block" : "none";
        bannerExtra.style.display = extraInput.value.trim() ? "block" : "none";

        updateFormat();
    }

    function updateFormat() {
        const format = formatSelect.value;

        banner.classList.remove("square", "story", "facebook");
        banner.classList.add(format);

        if (format === "square") formatLabel.textContent = "1080 × 1080";
        if (format === "story") formatLabel.textContent = "1080 × 1920";
        if (format === "facebook") formatLabel.textContent = "1200 × 628";

        bannerBackground.style.backgroundSize = "cover";
    }

    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Por favor selecciona una imagen válida.");
            imageInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            bannerBackground.style.backgroundImage = `url("${e.target.result}")`;
            bannerBackground.style.backgroundSize = "cover";
            bannerBackground.style.backgroundRepeat = "no-repeat";
            bannerBackground.style.backgroundPosition = "center center";
        };

        reader.readAsDataURL(file);
    });

    logoInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Por favor selecciona una imagen válida para el logo.");
            logoInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            bannerLogo.src = e.target.result;
            bannerLogo.style.display = "block";
            updateLogoControls();
        };

        reader.readAsDataURL(file);
    });

    function updateLogoControls() {
        const size = Number(logoSizeInput.value);
        const horizontal = Number(logoHorizontalInput.value);
        const vertical = Number(logoVerticalInput.value);

        bannerLogo.style.width = `${size}%`;
        bannerLogo.style.left = `calc(50% + ${horizontal}%)`;
        bannerLogo.style.top = `calc(5% + ${vertical}%)`;
        bannerLogo.style.right = "auto";
        bannerLogo.style.bottom = "auto";
        bannerLogo.style.transform = "translateX(-50%)";

        logoSizeValue.textContent = `${size}%`;
        logoHorizontalValue.textContent = horizontal;
        logoVerticalValue.textContent = vertical;
    }

    function updateTextPosition(control) {
        const horizontal = Number(control.horizontalInput.value);
        const vertical = Number(control.verticalInput.value);

        control.element.style.transform =
            `translate(${horizontal}px, ${vertical}px)`;

        control.horizontalValue.textContent = horizontal;
        control.verticalValue.textContent = vertical;
    }

    function updateTextFont(control) {
        if (!control.fontInput) return;
        const font = control.fontInput.value;
        control.element.style.fontFamily = `"${font}", sans-serif`;
    }

    Object.values(textControls).forEach((control) => {
        if (control.fontInput) {
            control.fontInput.addEventListener("change", () => updateTextFont(control));
            updateTextFont(control);
        }

        control.horizontalInput.addEventListener("input", () => {
            updateTextPosition(control);
        });

        control.verticalInput.addEventListener("input", () => {
            updateTextPosition(control);
        });
    });

    logoSizeInput.addEventListener("input", updateLogoControls);
    logoHorizontalInput.addEventListener("input", updateLogoControls);
    logoVerticalInput.addEventListener("input", updateLogoControls);

    [
        titleInput,
        subtitleInput,
        dateInput,
        timeInput,
        locationInput,
        extraInput
    ].forEach((input) => {
        input.addEventListener("input", updateBanner);
    });

    templateSelect.addEventListener("change", () => {
        currentTemplate = templates[templateSelect.value];
        applyTemplate();
    });

    formatSelect.addEventListener("change", updateFormat);

    downloadButton.addEventListener("click", async () => {
        if (typeof html2canvas === "undefined") {
            alert("No se pudo cargar el sistema de generación de imágenes.");
            return;
        }

        let targetWidth;
        let targetHeight;

        if (formatSelect.value === "square") {
            targetWidth = 1080;
            targetHeight = 1080;
        }

        if (formatSelect.value === "story") {
            targetWidth = 1080;
            targetHeight = 1920;
        }

        if (formatSelect.value === "facebook") {
            targetWidth = 1200;
            targetHeight = 628;
        }

        const previewWidth = banner.getBoundingClientRect().width;
        const previewHeight = banner.getBoundingClientRect().height;

        const scaleX = targetWidth / previewWidth;
        const scaleY = targetHeight / previewHeight;
        const safeScale = Math.min(Math.max(scaleX, scaleY), 3);

        try {
            const canvas = await html2canvas(banner, {
                scale: safeScale,
                useCORS: true,
                allowTaint: false,
                backgroundColor: null,
                imageTimeout: 15000
            });

            const finalCanvas = document.createElement("canvas");
            finalCanvas.width = targetWidth;
            finalCanvas.height = targetHeight;

            const finalContext = finalCanvas.getContext("2d");

            finalContext.drawImage(
                canvas,
                0,
                0,
                targetWidth,
                targetHeight
            );

            let fileName = titleInput.value.trim();

            fileName = fileName
                .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "")
                .replace(/\s+/g, "-");

            if (!fileName) fileName = "banner-filadelfia";

            const link = document.createElement("a");
            link.download = `${fileName}.png`;
            link.href = finalCanvas.toDataURL("image/png");
            link.click();

        } catch (error) {
            console.error(error);
            alert("No fue posible generar el banner. Intenta nuevamente.");
        }
    });

    updateLogoControls();

    Object.values(textControls).forEach((control) => {
        updateTextPosition(control);
        updateTextFont(control);
    });

    updateBanner();
    loadTemplates();
});
