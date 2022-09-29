let itemLocalStorage = JSON.parse(localStorage.getItem("item"));
let totalPrice = 0;

//Security not to display the price for the 2 functions below

//Show the price of each sofa in the cart
function setPriceFromServer(idProduct, productRate) { 
	fetch("http://localhost:3000/api/products/" + idProduct) 
	.then((res) => { 
		return res.json();
	})	
	// API Data Redistribution
	.then(function (resultatAPI) { 
		productRate.innerHTML = resultatAPI.price + "€";
	})
	.catch((error) => {});	
}

//Show total cart price
function setTotalPrice(productTotalPrice){
	let totalPrice = 0;
	for (let item in itemLocalStorage) {	
		let idProduct = itemLocalStorage[item].itemId;
		let itemQuantity = itemLocalStorage[item].itemQuantity;
		fetch("http://localhost:3000/api/products/" + idProduct) 
		.then((res) => { return res.json();})		
		.then(function (resultatAPI) {  
			totalPrice += resultatAPI.price * itemQuantity ;
			console.log("totalPrice : "+totalPrice);
			productTotalPrice.innerHTML = totalPrice ;
		})
		.catch((error) => {});
	}	
}

// Strengthen form security

const inspectFirstNameLastNameTown = (value) => {
	return /^([A-Z a-z]{3,20})?([-]{0,1})?([A-Z a-z]{3,20})$/.test(value); 
}; 

const inspectAdress = (value) => {	
	return /^[A-Za-z0-9\s]{3,100}$/.test(value);
};

const inspectEmail = (value) => {	
	return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
};

// Cart organization
function getCart() {
	// If the cart is absolutely empty 
	if (itemLocalStorage === null || itemLocalStorage == 0) { 
		let itemEmptyBasket = document.querySelector("#cart__items"); 
		itemEmptyBasket.innerHTML = "votre panier est actuellement vide... Souhaitez-vous une assistance ? ";
		itemEmptyBasket.style.textAlign = "center"; 
		itemEmptyBasket.style.fontWeight = "bold"; 
		itemEmptyBasket.style.fontSize = "32px"; 
	} // If the cart contains items
	else {
		for (let item in itemLocalStorage) { 
			// Inserting the article class element and data-id="{product-ID}"
			let productObject = document.createElement("article");
			document.querySelector("#cart__items").appendChild(productObject);
			productObject.className = "cart__items";
			productObject.setAttribute("data-id", itemLocalStorage[item].itemId);

			// Inserting the div class that contains the img element
			let productImg = document.createElement("div");
			productObject.appendChild(productImg);
			productImg.className = "cart__item__img";

			//Inserting the product image
			let productSofa = document.createElement("img");
			productImg.appendChild(productSofa);
			productSofa.src = itemLocalStorage[item].itemImage;
			productSofa.alt = itemLocalStorage[item].itemAltImage;

			//Inserting the class "content" div
			let productCartItemContent = document.createElement("div");
			productObject.appendChild(productCartItemContent);
			productCartItemContent.className = "cart__item__content";

			//Insertion of the div class which contains the description of an article (h2, p, p)
			let productCartItemDescription = document.createElement("div");
			productCartItemContent.appendChild(productCartItemDescription);
			productCartItemDescription.className = "cart__item__content__description";

			//Inserting the sofa name "h2"
			let productHdeux = document.createElement("h2");
			productCartItemDescription.appendChild(productHdeux);
			productHdeux.innerHTML = itemLocalStorage[item].itemName;

			//Insert sofa color "p"
			let productColored = document.createElement("p");
			productCartItemDescription.appendChild(productColored);
			productColored.innerHTML = itemLocalStorage[item].itemColor;
			productColored.style.fontSize = "16px";

			//Inserting the price of the sofa "p"
			let productRate = document.createElement("p");
			productCartItemDescription.appendChild(productRate);			
			setPriceFromServer(itemLocalStorage[item].itemId, productRate);	

			//The "cart__item__content__settings" div class 
			let productContentSettings = document.createElement("div");
			productCartItemContent.appendChild(productContentSettings);
			productContentSettings.className = "cart__item__content__settings";

			//The div class "cart__item__content__settings__quantity"
			let productContentSettingsQuantity = document.createElement("div");
			productContentSettings.appendChild(productContentSettingsQuantity);
			productContentSettingsQuantity.className = "cart__item__content__settings__quantity";

			//Insertion of the writing "quantity"
			let productWritingQuantity = document.createElement("p");
			productContentSettingsQuantity.appendChild(productWritingQuantity);
			productWritingQuantity.innerHTML = "Qté  : ";

			//Inserting the quantity with the "input"
			let productQuantityInput = document.createElement("input");
			productContentSettingsQuantity.appendChild(productQuantityInput);
			productQuantityInput.value = itemLocalStorage[item].itemQuantity;
			productQuantityInput.className = "itemQuantity";
			productQuantityInput.setAttribute("type", "number");
			productQuantityInput.setAttribute("name", "itemQuantity");
			productQuantityInput.setAttribute("min", "1");
			productQuantityInput.setAttribute("max", "100");

			//Inserting the div class "cart__item__content__settings__delete"
			let productCartItemContentSettingsDelete = document.createElement("div");
			productContentSettings.appendChild(productCartItemContentSettingsDelete);
			productCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

			//Deleting an entire item reference
			let productRemove = document.createElement("p");
			productCartItemContentSettingsDelete.appendChild(productRemove);
			productRemove.className = "deleteItem";
			productRemove.innerHTML = "Supprimer";

		}
	}
}

getCart (); 

function overallQuantity() {
	// Retrieve total quantity
	const sofaQuantity = document.getElementsByClassName("itemQuantity"); 
	const sofaLength = sofaQuantity.length;
	totalQuantity = 0; 


	for (let i = 0; i < sofaLength; ++i) { 
		totalQuantity += sofaQuantity[i].valueAsNumber; 		
	} 

	let productTotalQuantity = document.getElementById("totalQuantity");
	productTotalQuantity.innerHTML = totalQuantity;

	//Have the total price
	let productTotalPrice = document.getElementById("totalPrice");
	setTotalPrice(productTotalPrice);
  	//productTotalPrice.innerHTML = totalPrice;
}	

overallQuantity();

//Delete an article
function eraseItem() {
	let eraseKnob = document.querySelectorAll(".deleteItem"); 

	for (let j = 0; j < eraseKnob.length; j++) { 
		eraseKnob[j].addEventListener("click", (event) => { 
			event.preventDefault();

			//Selection of the data to be deleted according to the id and the color
			let idErase = itemLocalStorage[j].itemId;
			let colorErase = itemLocalStorage[j].itemColor;

			itemLocalStorage = itemLocalStorage.filter(
				(el) => el.itemId !== idErase || el.itemColor !== colorErase 
			); 

			localStorage.setItem("item", JSON.stringify(itemLocalStorage));

			//Deleted article warning
			alert("Cet article est supprimé de votre panier");
			location.reload(); 
		});
	}
}
eraseItem();

//Change the quantity of an item
function changeQuantity() {
	let modifyQuantity = document.querySelectorAll(".itemQuantity");

	for (let k = 0; k < modifyQuantity.length; k++) {
		modifyQuantity[k].addEventListener("change", (event) => {
			event.preventDefault();

			//Selection of the data to modify according to the id and the color
			let quantityChange = itemLocalStorage[k].itemQuantity; 
			let quantityModifValue = modifyQuantity[k].valueAsNumber;

			const resultGet = itemLocalStorage.find( 
				(el) => el.quantityModifValue !== quantityChange 
			);

			resultGet.itemQuantity = quantityModifValue;
			itemLocalStorage[k].itemQuantity = resultGet.itemQuantity;

			localStorage.setItem("item", JSON.stringify(itemLocalStorage)); 

			location.reload(); 
		});
	}
}
changeQuantity();

formToFill();

function formToFill() {
	if (itemLocalStorage === null || itemLocalStorage == 0) { 
		alert("Le panier est vide veuillez insérer la quantité souhaitée afin de poursuivre vos achats");
	} else {
		// When you click on the order button to send the form
		const orderKnob = document.querySelector("#order");
		orderKnob.addEventListener("click", (valid) => {
			valid.preventDefault();
		
			const products = []
			for( var i=0;i<itemLocalStorage.length;i++){ 
				products.push({productId : itemLocalStorage[i].itemId});
			}

			const contact = {
				firstName: document.querySelector("#firstName").value,
        		lastName: document.querySelector("#lastName").value,
        		address: document.querySelector("#address").value,
        		city: document.querySelector("#city").value,
        		email: document.querySelector("#email").value,
			};
			const firstNameOk = contact.firstName;
			const lastNameOk = contact.lastName;
			const addressOk = contact.address;
			const cityOk = contact.city;
			const emailOk = contact.email;

			//Integration of information to warn if the entry is correct or not
			const controlFirstName = document.querySelector("#firstNameErrorMsg");
      		const controllastName = document.querySelector("#lastNameErrorMsg");
     		const controlAddress = document.querySelector("#addressErrorMsg");
      		const controlCity = document.querySelector("#cityErrorMsg");
      		const controlEmail = document.querySelector("#emailErrorMsg");

			controlFirstName.innerHTML = "";
			controllastName.innerHTML = "";
			controlAddress.innerHTML = "";
			controlCity.innerHTML = "";
			controlEmail.innerHTML = "";
      		if (!inspectFirstNameLastNameTown(firstNameOk)) {
      			controlFirstName.innerHTML = "Le prénom contient des caractères spéciaux, veuillez corriger le prénom";
      		}
      		if (!inspectFirstNameLastNameTown(lastNameOk)) {
      			controllastName.innerHTML = "Le nom contient des caractères spéciaux, veuillez corriger le nom";
      		}
      		if (!inspectAdress(addressOk)) {
      			controlAddress.innerHTML = "l'adresse contient des caractères spéciaux, veuillez corriger l'adresse";
      		}
      		if (!inspectFirstNameLastNameTown(cityOk)) {
      			controlCity.innerHTML = "la ville contient des caractères spéciaux, veuillez corriger la ville";
      		}
      		if (!inspectEmail(emailOk)) {
      			controlEmail.innerHTML = "le format du mail est incorrect, veuillez corriger le mail";
      		}
      		let contacts = []; 
      		contacts.push(contact); 
      		const submitContactForm = {
      			contact,
				products
      		};

      		//Send the form to the localStorage (only if the coordinates are correct)
      		if (
      			inspectFirstNameLastNameTown(firstNameOk) &
      			inspectFirstNameLastNameTown(lastNameOk) &
      			inspectAdress(addressOk) &
      			inspectFirstNameLastNameTown(cityOk) &
      			inspectEmail(emailOk)
      		) {
      			localStorage.setItem("contact", JSON.stringify(contact)); 

      			return fetch("http://localhost:3000/api/products/order", {
      				method: "POST", 
      				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json' 
      				},
      				body: JSON.stringify(submitContactForm), 
      			}) 
      				.then((response) => response.json())
      				.then ((order) => {
      					localStorage.setItem("orderId", order.orderId);
      					window.location.href = 
      						"confirmation.html" + "?" + "name" + "=" + order.orderId;
      					localStorage.clear();
      				})
      				.catch((err) => ("Il y a un dysfonctionnement: ", err));			
      		} else {
      			alert("Veuillez corriger vos informations présentes dans le formulaire");
      		}
		});
	}
}
















