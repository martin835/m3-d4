/* GLOBAL VARIABLES */
let cart = [];
/* GLOBAL VARIABLES END */

/*FETCH FUNCTIONS  */

const fetchBooksOnLoad = function () {
    fetch("https://striveschool-api.herokuapp.com/books", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetch 1:", data);
        loadCards(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }


const fetchFilteredBooks = function (str) {
    fetch("https://striveschool-api.herokuapp.com/books", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
          
        let filteredData = data.filter((item) =>
          item.title.toLowerCase().includes(str)
        );  
        
        loadCards(filteredData); 

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }

const fetchCart = function() {
    fetch("https://striveschool-api.herokuapp.com/books", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
        let itemsInCart = data.filter((item) => cart.includes(item.asin));
        showCart(itemsInCart);
        countCartItemsWithReduce(cart);  //stupid function with arr.reduce() - replace with smth better
        })
        .catch((error) => {
        console.error("Error:", error);
        });
}


/*FETCH FUNCTIONS END  */

/* OTHER FUNCTIONS */

const loadCards = function (arr) {
    let cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = " ";
    arr.forEach((item) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `<div class="card" style="width: 18rem;">
                                <img src="${item.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text">${item.price} USD</p>
                                    <a href="#" class="btn btn-primary" onclick="addToCart(event)" id="${item.asin}">Add to cart <i class="bi bi-cart-plus-fill"></i></a>
                                    <a href="#" class="btn btn-secondary" onclick="removeBook(event)">Skip</a>
                                </div>
                            </div>`;

        cardsContainer.appendChild(newCol);
    })
};

const addToCart = function(e) {
    let idOfTheClickedBook = e.target.id;
    cart.push(idOfTheClickedBook);
    console.log(cart);
    e.target.style.backgroundColor = "green";
    e.preventDefault();
    countBooksInCart();    
}

const countBooksInCart = function () {
    let counterSpan = document.getElementById("cart-counter");
    counterSpan.innerHTML = cart.length;
} 

const removeBook = function(e) {
    let colToHide = e.target.closest(".col")
    colToHide.classList.add("d-none");
    e.preventDefault(); 
}

const searchBooks = function (e) {
    let searchString = e.target.value.toLowerCase(); 
    if (searchString.length > 3) {
        fetchFilteredBooks(searchString);
    } else {
        fetchBooksOnLoad();
    }
}

const showCart = function(arr) {
    let modalBody = document.getElementById("modalbody");
    modalBody.innerHTML = " ";
    console.log(arr);
    arr.forEach((item) => {
      let newDiv= document.createElement("div");
      newDiv.innerHTML = `<div class="card" style="width: 18rem;">
                                <img src="${item.img}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text">${item.price} USD</p>
                                    <a href="#" class="btn btn-secondary" id="cart-${item.asin}" onclick="removeBookFromCart(event)" >Remove</a>
                                </div>
                            </div>`;

      modalBody.appendChild(newDiv);
    });
}

const removeBookFromCart = function (e) {
    let idBookToRemove =  e.target.id.slice(5);    
    cart.splice(cart.indexOf(idBookToRemove),1);
    countBooksInCart();
    fetchCart();
}

const countCartItemsWithReduce = function (arr) {
    const cartHeader = document.getElementById("exampleModalLabel");
    
    let count = arr.reduce(
        (previousValue, currentValue) => {
            
            if (typeof currentValue === "string") return previousValue += 1
        }, 0
    )

    console.log(count);
    cartHeader.innerText = `${count} books in the cart`;
}

const emptyCart = function () {
    cart = [];
    countCartItemsWithReduce(cart);
    countBooksInCart();
    let modalBody = document.getElementById("modalbody");
    modalBody.innerHTML = "<span>Nothing in the cart </span><i class='bi bi-emoji-frown'></i>"; 
}

/* OTHER FUNCTIONS END */

/* EVENT LISTENERS */


/* EVENT LISTENERS END */






window.onload = function () {
  fetchBooksOnLoad();
};