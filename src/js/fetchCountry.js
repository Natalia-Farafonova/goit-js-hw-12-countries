export default { fetchCountry }


function fetchCountry(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(responce => {
        return responce.json()
    })
}