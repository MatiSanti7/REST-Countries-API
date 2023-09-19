const dataURL = "./data.json";
const countriesContainer = document.getElementById('countries');
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById('regionFilter');
const paginationContainer = document.getElementById('pagination');
const itemsPerPage = 8; 
let selectedRegion = "all"
let currentPage = 1;
let filteredData = [];
let originalData = [];

// Cargar y analizar el archivo JSON
fetch(dataURL)
    .then(response => response.json())
    .then(data => {
        originalData = data
        filteredData = originalData;
        renderPage(currentPage);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    filteredData = originalData.filter(country =>
        (selectedRegion === 'all' || country.region === selectedRegion) &&
        country.name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;

    // Calcular el número de páginas basado en la cantidad de resultados después del filtrado
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    // Renderizar la página con los resultados filtrados y la paginación actualizada
    renderPage(currentPage, totalPages);
});

// Filtrar datos por región
regionFilter.addEventListener('change', () => {
    selectedRegion = regionFilter.value;
    
    filteredData = originalData.filter(country =>
        (selectedRegion === 'all' || country.region === selectedRegion) &&
        country.name.toLowerCase().includes(searchInput.value.toLowerCase().trim())
    );

    currentPage = 1; // Restablecer a la página 1 al cambiar la región
    
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    renderPage(currentPage, totalPages);
    
});


function renderPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const limitedStartIndex = Math.min(startIndex, filteredData.length);
    const limitedEndIndex = Math.min(endIndex, filteredData.length);

    countriesContainer.innerHTML = ''; // Limpiar contenido existente

    for (let i = limitedStartIndex; i < limitedEndIndex; i++) {
        const country = filteredData[i];
        const countryElement = document.createElement('div');
        countryElement.classList.add('country', 'country-dark');
        countryElement.innerHTML = `
            <div class="flag">
                <img src="${country.flags.png}" alt="">
            </div>
            <div class="content">
                <h2 class="mgpd-0">${country.name}</h2>
                <p class="mgpd-0"><span class="fw-800">Population:</span> ${country.population}</p>
                <p class="mgpd-0"><span class="fw-800">Region:</span> ${country.region}</p>
                <p class="mgpd-0"><span class="fw-800">Capital:</span> ${country.capital}</p>
            </div>
        `;
        countriesContainer.appendChild(countryElement);
    }
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // Renderizar los enlaces de paginación
    renderPaginationLinks(totalPages, page);
}

function renderPaginationLinks(totalPages, currentPage) {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.classList.add('page-link');

        if (i === currentPage) {
            pageLink.classList.add('active');
        }

        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = i;
            renderPage(currentPage, totalPages);
        });
        changeTheme()
        paginationContainer.appendChild(pageLink);
    }
}

const mode = document.getElementById("mode")
const iconMode = document.getElementById("iconMode")
const textmode = document.getElementById("textMode")
const body = document.querySelector("body")
const nav = document.querySelector("nav")
const h1 = document.querySelector("h1")
const search = document.querySelector(".search")
const searchSvg = document.querySelector(".searchSvg")
const seaInput = document.querySelector(".searchInput")

let cont = 0

let isTheDark = true

mode.addEventListener("click", ()=>{
    body.classList.toggle("bgLight")
    body.classList.toggle("textBgLight")
    nav.classList.toggle("elementBgLight")
    h1.classList.toggle("textBgLight")
    search.classList.toggle("elementBgLight")
    textmode.classList.toggle("textBgLight")
    searchSvg.classList.toggle("svgBgLight")
    seaInput.classList.toggle("textBgLight")
    regionFilter.classList.toggle("elementBgLight")
    regionFilter.classList.toggle("textBgLight")
    
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
    const pagesLinks = document.querySelectorAll('.page-link')
    pagesLinks.forEach(pl => {
        if (!isTheDark) {
            if (pl.classList.contains('active')) {
                pl.style.color = 'white'; 
            } else {
                pl.classList.add('pag-text')
            }
        } else {
            pl.classList.remove('pag-text')
        }
    })
    
    const allCountry = document.querySelectorAll(".country")
    allCountry.forEach((country) => {
        if(!isTheDark){
            country.classList.remove("country-dark");  
        }else{
            country.classList.add("country-dark");  
        }
    })  
}