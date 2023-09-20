const btnChangeTheme = document.getElementById("mode");
const body = document.querySelector("body");
const iconMoon = document.querySelector("i");

let searchText = localStorage.getItem("searchText") || "";
let selectedRegion = localStorage.getItem("selectedRegion") || "all";

let originalData = [];
const savedClasses = localStorage.getItem("savedClasses");
if (savedClasses) {
    const classesArray = savedClasses.split(",").filter(className => className.trim() !== "");
    // Filtra las clases que no sean "fa-solid" o "fa-regular" y agrega las otras a body
    const otherClasses = classesArray.filter(className => className !== "fa-solid" && className !== "fa-regular");
    body.classList.add(...otherClasses);
    iconMoon.classList.add(...classesArray);
}

btnChangeTheme.addEventListener("click", () => {
    body.classList.toggle("light");
    iconMoon.classList.toggle("fa-regular");
    iconMoon.classList.toggle("fa-solid");

    // Filtra las clases que no sean "fa-solid" o "fa-regular" y las guarda en currentClasses
    const currentClasses = [
        body.classList.contains("light") ? "light" : ""
    ].filter(className => className.trim() !== "");

    // Agrega "fa-regular" o "fa-solid" según corresponda
    if (iconMoon.classList.contains("fa-regular")) {
        currentClasses.push("fa-regular");
    } else if (iconMoon.classList.contains("fa-solid")) {
        currentClasses.push("fa-solid");
    }

    localStorage.setItem("savedClasses", currentClasses.join(","));
});

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    const dataURL = "./data.json";
    const countriesContainer = document.getElementById('countries');
    const searchInput = document.getElementById("search");
    const paginationContainer = document.getElementById('pagination');
    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredData = [];
    fetch(dataURL)
        .then(response => response.json())
        .then(data => {
            originalData = data;
            filteredData = originalData;
            renderPage(currentPage);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });

    function renderPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        currentPage = page;
        localStorage.setItem("currentPage", currentPage);

        filteredData = originalData.filter(country =>
            (selectedRegion === 'all' || country.region === selectedRegion) &&
            country.name.toLowerCase().includes(searchText)
        );

        const limitedStartIndex = Math.min(startIndex, filteredData.length);
        const limitedEndIndex = Math.min(endIndex, filteredData.length);

        countriesContainer.innerHTML = '';

        for (let i = limitedStartIndex; i < limitedEndIndex; i++) {
            const country = filteredData[i];
            const countryElement = document.createElement('div');
            countryElement.classList.add('country');
            countryElement.innerHTML = `
            <a href="country.html?alpha3Code=${country.alpha3Code}">
                <div class="flag">
                    <img src="${country.flags.png}" alt="">
                </div>
                <div class="content">
                    <h2 class="mgpd-0">${country.name}</h2>
                    <p class="mgpd-0"><span class="fw-800">Population:</span> ${country.population}</p>
                    <p class="mgpd-0"><span class="fw-800">Region:</span> ${country.region}</p>
                    <p class="mgpd-0"><span class="fw-800">Capital:</span> ${country.capital}</p>
                </div>
            </a>
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
            paginationContainer.appendChild(pageLink);
        }
    }

    const selectHeader = document.getElementById("regionFilter");
    const selectOptions = document.getElementById("selectOptions");
    const selectedRegionText = document.getElementById("selectedRegion");

    function toggleOptions() {
        selectOptions.classList.toggle("show-options");
    }

    function selectRegion(region) {
        selectedRegionText.textContent = region;
        toggleOptions();
        currentPage = 1;
        selectedRegion = region;
        renderPage(currentPage);

        // Actualiza el filtro de región en localStorage
        localStorage.setItem("selectedRegion", region);
    }

    selectHeader.addEventListener("click", toggleOptions);

    selectOptions.addEventListener("click", function (event) {
        if (event.target.classList.contains("option")) {
            const region = event.target.getAttribute("data-value");
            selectRegion(region.toString());
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const top = document.getElementById("top");
        const search = document.querySelector(".search");
        const searchInput = document.getElementById("search");

        searchInput.value = searchText;

        if (top && search) {
            searchInput.addEventListener('input', function () {
                searchText = searchInput.value.toLowerCase().trim();
                currentPage = 1;
                renderPage(currentPage);
                localStorage.setItem("searchText", searchText);
            });
        }

        selectedRegionText.textContent = selectedRegion;
        // Renderiza la página con la región seleccionada

        let currentPage = localStorage.getItem("currentPage");
        if (currentPage) {
            currentPage = parseInt(currentPage); // Asegúrate de convertirlo a un número
        } else {
            currentPage = 1; // Valor predeterminado si no se encuentra en el almacenamiento local
        }
        renderPage(currentPage);

        // Obtén la información del país desde la URL
        const params = new URLSearchParams(window.location.search);
        const alpha3Code = params.get("alpha3Code");

        if (alpha3Code) {
            window.location.href = `country.html?alpha3Code=${alpha3Code}`;
        }
    });
} else {

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
            if (country) {
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
                    const tittleBorder = document.createElement("p");
                    tittleBorder.textContent = "Border Countries:";
                    borderCountries.appendChild(tittleBorder);

                    // Crear un contenedor para los enlaces de los países fronterizos
                    const countriesBorders = document.createElement("div");
                    countriesBorders.classList.add("allCountsBorder");
                    borderCountries.appendChild(countriesBorders);

                    // Iterar sobre los países fronterizos y crear enlaces para cada uno
                    country.borders.forEach(neighborAlpha3Code => {
                        const neighborCountry = data.find(countryData => countryData.alpha3Code === neighborAlpha3Code);
                        if (neighborCountry) {
                            // Crear un enlace para el país fronterizo
                            const neighborLink = document.createElement("a");
                            neighborLink.href = `country.html?alpha3Code=${neighborCountry.alpha3Code}`;
                            neighborLink.textContent = neighborCountry.name;

                            // Agregar el enlace al contenedor de países fronterizos
                            countriesBorders.appendChild(neighborLink);
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });

    const btnBack = document.getElementById("back")
    btnBack.addEventListener("click", () => {
        window.location.href = `../`;
    })
}
