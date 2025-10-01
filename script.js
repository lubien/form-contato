// Script para Formulário de Contato

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const successMessage = document.getElementById("success-message");
  const notificationContainer = document.getElementById(
    "notification-container"
  );

  // Validação de email
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  // Validação de telefone (formato brasileiro)
  function isValidPhone(phone) {
    if (!phone) return true;
    const cleanedPhone = phone.replace(/\D/g, "");
    return cleanedPhone.length >= 8 && cleanedPhone.length <= 11;
  }

  // Validação do nome (mínimo de 3 letras)
  function isValidName(name) {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
    return nameRegex.test(name.trim());
  }

  // Limpar erro
  function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    field.classList.remove("error");
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  // Mostrar erro
  function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    field.classList.add("error");
    // Disparar animação de erro
    field.classList.remove("error-animate");
    // forçar reflow para reiniciar animação se já aplicada antes
    void field.offsetWidth;
    field.classList.add("error-animate");
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  // Validar campo
  function validateField(field) {
    clearError(field);
    let isValid = true;
    const value = field.value.trim();

    if (field.hasAttribute("required") && !value) {
      showError(field, "Este campo é obrigatório.");
      isValid = false;
    } else if (field.id === "name") {
      if (!isValidName(value)) {
        showError(
          field,
          "Digite um nome válido (apenas letras, min. 3 caracteres)."
        );
        isValid = false;
      }
    } else if (field.type === "email" && value) {
      if (!isValidEmail(value)) {
        showError(field, "O formato do e-mail é inválido.");
        isValid = false;
      }
    } else if (field.type === "tel" && value) {
      if (!isValidPhone(value)) {
        showError(field, "O telefone deve ter 8 a 11 dígitos.");
        isValid = false;
      }
    } else if (field.id === "subject" && value.length < 5) {
      showError(field, "O assunto deve ter pelo menos 5 caracteres.");
      isValid = false;
    } else if (field.id === "message" && value.length < 15) {
      showError(field, "A mensagem deve ter pelo menos 15 caracteres.");
      isValid = false;
    }

    return isValid;
  }

  function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    notificationContainer.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => {
        toast.remove();
      });
    }, 3000);
  }

  // Adicionar validação em tempo real
  const fields = form.querySelectorAll("input, textarea");
  fields.forEach((field) => {
    field.addEventListener("blur", function () {
      validateField(this);
    });

    field.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        // Valida o campo enquanto o usuário digita SE já estiver com erro
        validateField(this);
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isFormValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      showToast(
        "❌ Por favor, preencha os campos obrigatórios corretamente.",
        "error"
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    setTimeout(() => {
      console.log("Dados do formulário:", formData);

      showToast("✅ Mensagem enviada com sucesso!", "success");

      form.classList.add("hidden");
      successMessage.classList.remove("hidden");

      setTimeout(() => {
        form.reset();
        fields.forEach(clearError);

        form.classList.remove("hidden");
        successMessage.classList.add("hidden");
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }, 3000);
    }, 1000);
  });
});
