/* GLOBAL VARIABLES */

/* GLOBAL VARIABLES END */

/*FETCH FUNCTIONS  */

const fetchBooks = function () {
    fetch("https://striveschool-api.herokuapp.com/books", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        loadCards(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

/*FETCH FUNCTIONS END  */

/* OTHER FUNCTIONS */

const loadCards = function (arr) {
    let cardsContainer = document.getElementById("cards-container");
    
    for (i=0; i<arr.length; i++) {
        let newCol = document.createElement("div");
        newCol.classList.add("col")
        newCol.innerHTML = `<div class="card" style="width: 18rem;">
                                <img src="${arr[i].img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>`;
    
        cardsContainer.appendChild(newCol);
    }
}


/* OTHER FUNCTIONS END */

/* EVENT LISTENERS */

/* EVENT LISTENERS END */






window.onload = function () {
  fetchBooks();
};