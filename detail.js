const mode = document.getElementById("mode")
const iconMode = document.getElementById("iconMode")
const textmode = document.getElementById("textMode")
const body = document.querySelector("body")
const nav = document.querySelector("nav")
const h1 = document.querySelector("h1")

let cont = 0

let isTheDark = true

mode.addEventListener("click", ()=>{
    body.classList.toggle("bgLight")
    body.classList.toggle("textBgLight")
    nav.classList.toggle("elementBgLight")
    h1.classList.toggle("textBgLight")
    textmode.classList.toggle("textBgLight")
    
    if(isTheDark){
        textmode.textContent = "Light Mode"
        iconMode.src = "/icons/moon-regular.svg"
        isTheDark = false
    }else{
        textmode.textContent = "Dark Mode"
        iconMode.src = "/icons/moon-solid.svg"
        isTheDark = true
    }
    changeTheme()
    cont++;
})

function changeTheme() {            
    const allCountry = document.querySelectorAll(".country")
    const alllinkCountry = document.querySelectorAll(".country a")
    allCountry.forEach((country) => {
        if(!isTheDark){
            country.classList.remove("country-dark");  
        }else{
            country.classList.add("country-dark");  
        }
    })

    alllinkCountry.forEach(link => {
        if(!isTheDark){
            link.classList.add("textBgLight")
        }else{
            link.classList.remove("textBgLight")
        }
    })
}


const url = window.location.href;
const urlParams = new URLSearchParams(new URL(url).search);
const alpha3Code = urlParams.get("alpha3Code");

const dataURL = "./data.json";

const flag = document.getElementById("flag")
const nameCountry = document.getElementById("nameCountry")
const nativeName = document.getElementById("nativeName")
const popu = document.getElementById("population")
const region = document.getElementById("region")
const subRegion = document.getElementById("subRegion")
const capital = document.getElementById("capital")
const topLevelDomain = document.getElementById("topLevelDomain")
const currencies = document.getElementById("currencies")
const languages = document.getElementById("languages")
const borderCountries = document.getElementById("border")

fetch(dataURL)
    .then(response => response.json())
    .then(data => {
        const country = data.find(countryData => countryData.alpha3Code === alpha3Code);
        if(country){
            flag.src = country.flags.svg
            nameCountry.innerHTML = country.name
            nativeName.innerHTML = country.nativeName
            popu.innerHTML = country.population
            region.innerHTML = country.region
            subRegion.innerHTML = country.subregion
            capital.innerHTML = country.capital
            topLevelDomain.innerHTML = country.topLevelDomain
            currencies.innerHTML = country.currencies.map(curr => curr.name).join(', ')
            languages.innerHTML = country.languages.map(lang => lang.name).join(', ')
            if (country.borders && country.borders.length > 0) {
                // Obtener nombres de países vecinos y mostrarlos en elementos <p>
                const neighborCountryNames = country.borders.map(borderCode => {
                    const neighbor = data.find(countryData => countryData.alpha3Code === borderCode);
                    return neighbor ? neighbor.name : borderCode; // Usa el código si el nombre no está disponible
                });

                // Limpiar cualquier contenido previo en borderCountries
                borderCountries.innerHTML = "";

                // Agregar los nombres de los países vecinos a elementos <p>
                const tittleBorder = document.createElement("p");
                tittleBorder.textContent = "Border Countries:"
                borderCountries.appendChild(tittleBorder)
                const countriesBorders = document.createElement("div")
                countriesBorders.classList.add("allCountsBorder")
                borderCountries.appendChild(countriesBorders)
                neighborCountryNames.forEach(neighborName => {
                    const pElement = document.createElement("p");
                    pElement.classList.add("countryBorder");
                    pElement.textContent = neighborName;
                    countriesBorders.appendChild(pElement);
                });
            }
        }
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
    

const btnBack = document.getElementById("back")
btnBack.addEventListener("click", ()=>{
    window.location.href = `../`;
})