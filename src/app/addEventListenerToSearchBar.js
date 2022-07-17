import { htmlElements } from "./htmlElements";

export function addEventListenerToSearchBar () {
    htmlElements.searchBar.addEventListener("mouseover", () => {
        htmlElements.searchBox.focus();
    });

    htmlElements.searchBox.addEventListener("input", () => {
        htmlElements.searchBar.classList.add("search-bar-hover");
        htmlElements.searchBox.classList.add("search-box-hover");
        htmlElements.magnifyingGlass.classList.add("fa-magnifying-glass-hover");
    });


    htmlElements.searchBox.addEventListener("focusout", () => {
        htmlElements.searchBar.classList.remove("search-bar-hover");
        htmlElements.searchBox.classList.remove("search-box-hover");
        htmlElements.magnifyingGlass.classList.remove("fa-magnifying-glass-hover");
        document.querySelector(".pac-container").style.display = "none";
        htmlElements.searchBox.value = "";
    })
    
}