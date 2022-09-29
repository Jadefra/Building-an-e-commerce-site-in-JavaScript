let object;

// Fetching data from API couch with url + id
function getObject(idProduct) {
	fetch("http://localhost:3000/api/products/" + idProduct) 
	.then((res) => { 
		return res.json();
	})
	// API Data Redistribution
	.then(function (resultatAPI) { 
		object = resultatAPI;
		if (object) {	
			let itemLocalStorage = JSON.parse(localStorage.getItem("item")); 
			if (itemLocalStorage) { 
				for (let item in itemLocalStorage) { 
					if(idProduct == itemLocalStorage[item].itemId){ 
						document.querySelector("#quantity").value = itemLocalStorage[item].itemQuantity; 
					}
				}
			}			
			insertObjectToHTMLPage(object);}
	})
	.catch((error) => {});
}

// Display of the sofa and the choice of colors
function insertObjectToHTMLPage (object) {  
	// Added photograph of an "img" sofa
	let productImg = document.createElement("img");
	document.querySelector(".item__img").appendChild(productImg);
	productImg.src = object.imageUrl;
	productImg.alt = object.altTxt;

	// Added the sofa name in the "h1"
	document.getElementById("title").innerHTML = object.name;

	// Page name transformation
	document.title = object.name

	// Add price in the "p" - "span"
	document.getElementById("price").innerHTML = object.price;

	// Add the description in the "p"
    document.getElementById("description").innerHTML = object.description;

	// Add "option" to choose colors
  	for (let colors of object.colors) {
  		let productColors = document.createElement("option");
  		document.querySelector("#colors").appendChild(productColors); 
  		productColors.value = colors;
  		productColors.innerHTML = colors;
  	}
}

const params = new URLSearchParams(window.location.search); 
getObject (params.get("id"))  

//Panier
const addCart = document.querySelector("#addToCart"); 
const quantitySelection = document.querySelector("#quantity"); 
const colorSelection = document.querySelector("#colors"); 

// Condition on the cart with a quantity ranging from 0 to 100
addCart.addEventListener("click", (event) => { 
	if (
		// Quantity greater than 0
		quantitySelection.value > 0 && 
		// Quantity less than or equal to 100
		quantitySelection.value <= 100 &&
		// Whole number
		quantitySelection.value == parseInt(quantitySelection.value) && 
		// Selecting a color
		colorSelection.value != 0 
	) {
		// Retrieve the selected quantity
		let selectionAmount = quantitySelection.value;

		//Get selected color 
		let selectionColours = colorSelection.value;

		//Retrieve the information of the article and insert in the cart the colors and the quantities selected
		let overviewitem = { 
			itemId: object._id, 
			itemColor: selectionColours, 
			itemQuantity: Number(selectionAmount),
			itemName: object.name, 
			itemDescription: object.description, 
			itemImage: object.imageUrl, 
			itemAltImage: object.altTxt, 
		};

		//Local storage initialization
		let itemLocalStorage = JSON.parse(localStorage.getItem("item"));

		//Import to local storage according to conditions
		if (itemLocalStorage) {
			const resultObtained = itemLocalStorage.find(
				(el) => 
				el.itemId === object._id && el.itemColor === selectionColours);
			//The ordered item is already in the shopping cart
			if (resultObtained) {
				console.log("article deja dans panier, on met à jour la quantité");
				resultObtained.itemQuantity = quantitySelection.value;
				localStorage.setItem("item", JSON.stringify(itemLocalStorage)); 
				//The article is not yet in the basket
			} else {
				console.log("on insere un nouvel article dans le panier");
				itemLocalStorage.push(overviewitem);
				localStorage.setItem("item", JSON.stringify(itemLocalStorage)); 
			}
			//The cart is empty
		} else {
			console.log("le panier est vide");
			itemLocalStorage = [];
			itemLocalStorage.push(overviewitem);
			localStorage.setItem("item", JSON.stringify(itemLocalStorage)); 
		}

		//Pop-up window to confirm
		window.alert(
			`Votre selection de ${selectionAmount} ${object.name} ${selectionColours} est insérée au panier`
			);
		window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/cart.html"; 
	} else window.alert("Veuillez saisir la couleur et la quantité avant de valider");
});
