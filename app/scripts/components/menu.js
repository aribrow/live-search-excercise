/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchResults: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        const _self = this;
        const sUrl = 'http://localhost:3035/api/getData?';
        const sQuery = e.target.value;        
        const $searchResults = document.getElementById("searchResults");
        const $resultsList = $searchResults.querySelector("ul");
        const $overflow = $searchResults.querySelector("div.overflow");
        let aResults;
        
        if (sQuery.length > 0) {
            fetch(sUrl + new URLSearchParams({ search: sQuery }),
                {
                    method: "get",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(oResponse => oResponse.json())
                .then(oData => {
                    try {                        
                        $overflow.classList.add("hidden");
                        aResults = oData.results;
                        _self.setState({
                            searchResults: aResults
                        });

                        if (aResults.length > 0) {                            
                            if (sQuery.length > 0) {
                                let iResultsLength = aResults.length;

                                if (aResults.length > 4) {
                                    iResultsLength = 4;
                                    $overflow.querySelector("span").innerText = `Displaying 4 of ${aResults.length} results.`;
                                    $overflow.classList.remove("hidden");
                                } else {
                                    $overflow.classList.add("hidden");
                                }

                                _self.buildSearchResults(aResults, iResultsLength);
                            } else {
                                $overflow.classList.add("hidden");
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                });            
        } else {
            $resultsList.innerHTML = "";
            $overflow.classList.add("hidden");
        }
    }

    buildSearchResults(aResults, iLength) {
        const $searchResults = document.getElementById("searchResults");
        const $resultsList = $searchResults.querySelector("ul");        
        
        $resultsList.innerHTML = "";

        for (let iIndex = 0; iIndex < iLength; iIndex++) {
            const $listItem = document.createElement('li');
            const $productTemplate = document.getElementById('productTemplate');
            const $product = $productTemplate.querySelector("div").cloneNode(true);
            const $image = $product.querySelector("img");
            const $name = $product.querySelector("h1");
            const $about = $product.querySelector("h2");
            const $price = $product.querySelector("span.price");
            $image.src = aResults[iIndex].picture;
            $image.alt = aResults[iIndex].name;
            $name.innerText = aResults[iIndex].name;
            $about.innerText = aResults[iIndex].about;
            $price.innerText = `$${aResults[iIndex].price}`;
            
            $listItem.appendChild($product);
            $resultsList.appendChild($listItem);
        }    
    }
    
    /**
     * Displays all of the search results
     * @memberof Menu
     * @param e [Object] - the event from a link press handler
     */
    onDisplayAll(e) {
        const $overflow = document.querySelector("div.overflow");
        $overflow.classList.add("hidden");
        this.buildSearchResults(this.state.searchResults, this.state.searchResults.length);
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div className="results" id="searchResults">
                        <div className="overflow hidden">
                            <span></span>
                            <a href="#" onClick={(e) => this.onDisplayAll(e)}>See all results</a>
                        </div>
                        <ul></ul>
                    </div>
                </div>
                <template id="productTemplate">
                    <div className="productContainer">
                        <img />
                        <div className="details">
                            <h1></h1>
                            <h2></h2>
                            <span className="price"></span>
                        </div>
                    </div>
                </template>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;