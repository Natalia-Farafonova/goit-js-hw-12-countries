import countrysTamplate from '../templates/countries.hbs';
import countryTamplate from '../templates/country.hbs';
import fetchQuery from './fetchCountry';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

const debounce = require('lodash.debounce');

const refs = {
  textInput: document.querySelector('.searchCountry'),
  country: document.querySelector('.js-country'),
};

refs.textInput.addEventListener('input', debounce(findCountry, 500));

function findCountry() {
  // console.log(refs.textInput.value);
  // if (!refs.textInput.value.length) {
  //   return
  // }
  if (refs.textInput.value !== '') {
    fetchQuery(refs.textInput.value).then(renderCountry).catch(console.error());
  }
  else {
    refs.country.innerHTML = '';
  }
}

function renderCountry(country) {
  refs.country.innerHTML = '';
  if (country.length === 1) {
    const newCountry = country[0];
    refs.country.insertAdjacentHTML('beforeend', countryTamplate(newCountry));
  }
  if (country.length <= 10 && country.length !== 1) {
    refs.country.insertAdjacentHTML(
      'beforeend',
      countrysTamplate(country.map(countrys => countrys.name)),
    );
  }
  if (country.length > 10) {
    alert({
      type: 'error',
      text: 'Too many matches found. Please enter a more specific query!',
      styling: 'brighttheme',
      mode: 'light',
    });
  }
}



