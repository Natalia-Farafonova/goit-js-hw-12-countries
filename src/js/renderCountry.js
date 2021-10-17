import countrysTamplate from '../templates/countries.hbs';
import countryTamplate from '../templates/country.hbs';
import api from './fetchCountry.js';
import getRefs from './refs.js';
import pnotify from './pnotify.js';

// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import { alert } from '@pnotify/core';

const debounce = require('lodash.debounce');

const refs = getRefs();

refs.input.addEventListener('input', debounce(findCountry, 500));

function findCountry(e) {

    onReset();
    e.preventDefault();
    const value = e.target.value;
    if (!value) {
        clearMarkup();
        return;
    }

    searchCountry(value);
}

function searchCountry(value) {
    api.fetchCountry(value).then(country => {

        if (!country) {
            return;
        } else if (country.length > 10) {

            clearMarkup();
            const message = "Too many matches found. Please enter a more specific query! "
            pnotify({
                title: 'Error',
                text: message,
                delay: 1000,
            });
        } else if (country.length >= 2 && country.length <= 10) {
            createCountryList(country);
        } else if (country.length === 1) {
            onStyleCountry();
            createMarkup(country);
        } else {
            pnotify({
                title: 'Error',
                text: 'Invalid request or such countries are not in the list',
                delay: 1000,
            });
        }
    }).catch(error => {
        onError();
    })
    
}

function onError(){
  pnotify({
    title: 'Critical error',
    text: 'Something went wrong.',
    delay: 500,
  });
}

function onStyleCountry() {
    refs.markupCountry.classList.add('opacity');

}

function createMarkup (country){
  const markup = markupCountry(country);
  refs.markup.innerHTML = markup;
}

function createCountryList(list) {
    const markup = countryList(list);
     refs.markup.innerHTML = markup;
}

function clearMarkup(){
  refs.markup.innerHTML = '';
}

function onReset() {
    refs.markupCountry.classList.remove('opacity');
}






