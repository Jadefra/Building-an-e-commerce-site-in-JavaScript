// Embedding elements in HTML after fetching elements in API
(async function () { 
	const objects = await getObjects(); 
	for (object of objects) {
		insertObject(object);
	}
})();

// Using GET to retrieve products using the API
async function getObjects() { 
	try {  
		const res = await fetch ("http://localhost:3000/api/products"); 
		const objects = await res.json(); 
		return objects;
		}

	catch (error) { 
		alert(
			"Erreur le port 3000 est-il chargé ?" 
			);
	};
}

// Page display with the correct sofa (dynamically call the correct sofa)
function insertObject(object) { 
	// Add the "a" element: link with the id
	let productLink = document.createElement("a"); 
	document.querySelector(".items").appendChild(productLink); 
	productLink.href = `product.html?id=${object._id}`; 


	// Add the "article" element: layout for the visualization of sofas
	let productArticle = document.createElement("article");
	productLink.appendChild(productArticle);

	// Add the "img" element: image of the sofa
	let productImg = document.createElement("img");
	productArticle.appendChild(productImg);
	productImg.src = object.imageUrl; 
	productImg.alt = object.altTxt;

	// Add the "h3" element: sofa name
	let productName = document.createElement("h3"); 
	productArticle.appendChild(productName); 
	productName.classList.add("productName"); 
	productName.innerHTML = object.name; 

	// Add the "p" element: sofa explanation
	let productDescription = document.createElement("p");
	productArticle.appendChild(productDescription);
	productDescription.classList.add("productName");
	productDescription.innerHTML = object.description;
}
