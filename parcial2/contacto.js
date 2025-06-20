document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    const nombreError = document.getElementById('nombreError');
    const apellidoError = document.getElementById('apellidoError');
    const emailError = document.getElementById('emailError');
    const mensajeError = document.getElementById('mensajeError');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        // Función para mostrar error
        function showError(element, message, errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
            element.classList.add('input-error');
        }

        // Función para limpiar error
        function clearError(element, errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
            element.classList.remove('input-error');
        }

        // Validación de Nombre 
        if (nombre.value.trim() === '') {
            showError(nombre, 'El nombre es obligatorio.', nombreError);
            isValid = false;
        } else if (nombre.value.trim().length < 2) {
            showError(nombre, 'El nombre debe tener al menos 2 caracteres.', nombreError);
            isValid = false;
        } else {
            clearError(nombre, nombreError);
        }

        // Validación de Apellido
        if (apellido.value.trim() === '') {
            showError(apellido, 'El apellido es obligatorio.', apellidoError);
            isValid = false;
        } else if (apellido.value.trim().length < 2) {
            showError(apellido, 'El apellido debe tener al menos 2 caracteres.', apellidoError);
            isValid = false;
        } else {
            clearError(apellido, apellidoError);
        }

        // Validación de Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, 'El email es obligatorio.', emailError);
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            showError(email, 'Por favor, introduce un email válido.', emailError);
            isValid = false;
        } else {
            clearError(email, emailError);
        }

        // -Validación de Mensaje (opcional, pero con mínimo de caracteres)
        if (mensaje.value.trim().length > 0 && mensaje.value.trim().length < 10) {
            showError(mensaje, 'El mensaje debe tener al menos 10 caracteres o estar vacío.', mensajeError);
            isValid = false;
        } else {
            clearError(mensaje, mensajeError);
        }

        if (isValid) {
            alert('Formulario enviado correctamente. ¡Gracias por contactarnos!');
            form.reset();
        }
    });
});