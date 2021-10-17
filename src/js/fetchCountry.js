import { alert } from '@pnotify/core';

export default fetchQuery;

function fetchQuery(countryId) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryId}`).then(
      response => {
        if (response.status === 404) {
          alert({
            type: 'error',
            text: 'Error 404!',
            styling: 'brighttheme',
            mode: 'light',
          });
        }
        return response.json();
      },
    );
  
}