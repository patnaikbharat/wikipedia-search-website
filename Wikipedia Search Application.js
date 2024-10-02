let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");
        let userInput = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.toggle("d-none");
                let {
                    search_results
                } = jsonData;
                for (let result of search_results) {
                    let {
                        title,
                        link,
                        description
                    } = result;
                    let divContainer = document.createElement("div");
                    divContainer.classList.add("search-results");
                    searchResults.appendChild(divContainer);
                    let titleElement = document.createElement("a");
                    titleElement.href = link;
                    titleElement.target = "_blank";
                    titleElement.textContent = title;
                    titleElement.classList.add("result-title");
                    divContainer.appendChild(titleElement);
                    let breakElement = document.createElement("br");
                    divContainer.appendChild(breakElement);
                    let urlElement = document.createElement("a");
                    urlElement.href = link;
                    urlElement.target = "_blank";
                    urlElement.textContent = link;
                    urlElement.classList.add("result-url");
                    divContainer.appendChild(urlElement);
                    let lineBreake = document.createElement("br");
                    divContainer.appendChild(lineBreake);
                    let paragraphElement = document.createElement("p");
                    paragraphElement.textContent = description;
                    paragraphElement.classList.add("link-description");
                    divContainer.appendChild(paragraphElement);
                }
            });
    }
});