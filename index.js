// Global
const openModalBtns = document.querySelectorAll('[data-modal-target="contact"]');

const modal = document.getElementById('contact-modal');

const closeModalBtn = modal.querySelector('.contact-modal__close-btn');
const successBtn = modal.querySelector('button[type="button"]');

const form = modal.querySelector('form');
const successSection = modal.querySelector('.contact-modal__success');

const requiredFields = [form.elements.name, form.elements.email, form.elements.phoneNumber];

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

  requiredFields.forEach((field) => {
    const errorMessage = field.nextElementSibling;
    if (field.value.trim() === '') {
      isFormValid = false;
      errorMessage.hidden = false;
      field.classList.add('contact-modal__form-input_invalid');
    } else {
      errorMessage.hidden = true;
      field.classList.remove('contact-modal__form-input_invalid');
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
