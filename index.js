// Global
const openModalBtns = document.querySelectorAll('[data-modal-target="contact"]');

const modal = document.getElementById('contact-modal');

const closeModalBtn = modal.querySelector('.contact-modal__close-btn');
const submitModalBtn = modal.querySelector('form button[type="submit"]');
const successBtn = modal.querySelector('button[type="button"]');

const form = modal.querySelector('form');
const successSection = modal.querySelector('.contact-modal__success');
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const phoneNumberInput = form.querySelector('input[name="phoneNumber"]');

const requiredFields = [nameInput, emailInput, phoneNumberInput];

// Handlers
const openModal = () => {
  modal.showModal();
};

const closeModal = () => {
  modal.close();
};

const closeOnOverlayClick = ({ currentTarget, target }) => {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;
  if (isClickedOnBackDrop) {
    closeModal();
  }
};

const submitForm = (e) => {
  e.preventDefault();
  let isFormValid = true;

  requiredFields.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    if (input.value.trim() === '') {
      isFormValid = false;
      errorMessage.hidden = false;
      input.classList.add('contact-modal__form-input_invalid');
    } else {
      errorMessage.hidden = true;
      input.classList.remove('contact-modal__form-input_invalid');
    }
  });

  if (isFormValid) {
    form.classList.add('hidden');
    successSection.classList.remove('hidden');
  }
};

const resetForm = () => {
  form.reset();
  form.classList.remove('hidden');
  successSection.classList.add('hidden');
  requiredFields.forEach((input) => {
    const errorMessage = input.nextElementSibling;
    errorMessage.hidden = true;
    input.classList.remove('contact-modal__form-input_invalid');
  });
};

// Listeners
openModalBtns.forEach((btn) => btn.addEventListener('click', openModal));
closeModalBtn.addEventListener('click', closeModal);
form.addEventListener('submit', submitForm);
modal.addEventListener('click', closeOnOverlayClick);
successBtn.addEventListener('click', closeModal);
modal.addEventListener('close', resetForm);
