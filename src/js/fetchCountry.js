// export default fetchQuery;

// function fetchQuery(countryId) {
//     return fetch(`https://restcountries.eu/rest/v2/name/${countryId}`).then(
//         response => {
//             if (response.status === 404) {
//                 alert({
//                     type: 'error',
//                     text: 'Error 404!',
//                     styling: 'brighttheme',
//                     mode: 'light',
//                 });
//             }
//             return response.json();
//         },
//     );
  
// }

const url  = 'https://restcountries.com/v2/name/';

function fetchCountry(value){
    return fetch(`${url}${value}`)
        .then(response => {
            return response.json()
        })

    
}
export default { fetchCountry }
