const url  = 'https://restcountries.com/v2/name/';

function fetchCountry(value){
    return fetch(`${url}${value}`)
        .then(response => {
            return response.json()
        })
}
export default { fetchCountry }
