// Script para Formulário de Contato

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    alert(`Formulário enviado com sucesso!\n\nNome: ${name}\nE-mail: ${email}\nMensagem: ${message}`);

    form.reset();
  });
});
