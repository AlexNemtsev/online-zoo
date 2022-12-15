import './style.scss';
import '../donate/style.scss'

const burgerIcon = document.querySelector('.burger-icon');
const menuContainer = document.querySelector('.burger-menu');
const nav = document.querySelector('.burger-menu > nav');
const slider = document.querySelector('.progress-bar');
const cards = document.querySelector('.testimonials-cards');
const cardPopup = document.querySelector('.testimonial-popup');
const popupContent = document.querySelector('.testimonial-popup .testimonial-card');
const cardsCollection = document.querySelectorAll('.testimonials-cards .testimonial-card');

const amountField = document.querySelector('.custom-amount');
const radios = document.querySelectorAll('.radio');
const valueRadioPairs = {};

for (let radio of radios) {
  radio.addEventListener('click', () => amountField.value = radio.value);
  valueRadioPairs[radio.value] = radio;
}

const maxRegex = /^\w{0,4}$/;

const showMenu = () => {
  menuContainer.classList.toggle('active');
  document.body.style.overflow = 'hidden';
}

const hideMenu = () => {
  menuContainer.classList.toggle('active');
  document.body.style.overflow = 'initial';
}

const showPopup = () => {
  cardPopup.classList.toggle('active-popup');
  document.body.style.overflow = 'hidden';
}

const hidePopup = () => {
  cardPopup.classList.toggle('active-popup');
  document.body.style.overflow = 'initial';
}

const moveSlider = () => {
  const screen = window.matchMedia("(max-width: 1180px)");
  let sliderStep = screen.matches ? 321 : 298;

  cards.style.transform = `translateX(${-sliderStep * slider.value}px)`;
  cards.style.transition = '500ms ease';
}

burgerIcon.addEventListener('click', () => showMenu());

document.addEventListener('click', (e) => {
  const withinNav = e.composedPath().includes(nav);
  const withinContaier = e.composedPath().includes(menuContainer);

  if (!withinNav && withinContaier) {
    hideMenu();
  }
});

document.addEventListener('click', (e) => {
  const withinPopupContent = e.composedPath().includes(popupContent);
  const withinPopup = e.composedPath().includes(cardPopup);

  if (!withinPopupContent && withinPopup) {
    hidePopup();
  }
});

for (let card of cardsCollection) {
  card.addEventListener('click', () => {
    popupContent.innerHTML = card.innerHTML;
    showPopup();
  });
}

slider?.addEventListener('input', moveSlider);

amountField?.addEventListener('input', (e) => {
  const amountFieldFocused = document.querySelector('.custom-amount:focus');
  if (!maxRegex.test(amountField.value)) {
    e.preventDefault();
    amountFieldFocused.style.outlineColor = "red";
  } else {
    amountFieldFocused.style.outlineColor = "green";

    if (valueRadioPairs.hasOwnProperty(amountField.value)) {
      console.log('found');
      valueRadioPairs[amountField.value].checked = true;
    } else {
      for (let radio of radios) radio.checked = false;
    }
  }
});