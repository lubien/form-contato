// Script para Formulário de Contato


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');

    // Validação de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validação de telefone (formato brasileiro)
    function isValidPhone(phone) {
        if (!phone) return true; // Campo opcional
        const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Limpar erro
    function clearError(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Mostrar erro
    function showError(field, message) {
        const errorElement = document.getElementById(`${field.id}-error`);
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Validar campo
    function validateField(field) {
        clearError(field);
        let isValid = true;

        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, 'Este campo é obrigatório');
            isValid = false;
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
            showError(field, 'Digite um e-mail válido');
            isValid = false;
        } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            showError(field, 'Digite um telefone válido');
            isValid = false;
        } else if (field.id === 'name' && field.value.trim().length < 3) {
            showError(field, 'O nome deve ter pelo menos 3 caracteres');
            isValid = false;
        } else if (field.id === 'message' && field.value.trim().length < 10) {
            showError(field, 'A mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // Adicionar validação em tempo real
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    // Manipular envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar todos os campos
        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Desabilitar botão durante o envio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simular envio (aqui você pode adicionar uma requisição real para um backend)
        setTimeout(() => {
            console.log('Dados do formulário:', formData);

            // Esconder formulário e mostrar mensagem de sucesso
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Reset do formulário após 3 segundos
            setTimeout(() => {
                form.reset();
                form.classList.remove('hidden');
                successMessage.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar';
            }, 3000);
        }, 1000);
    });
});
