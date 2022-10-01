# Website

https://user-images.githubusercontent.com/91191428/193252577-797836fc-5d2d-4fc3-b834-47edd9d9ac4f.mp4

### Back end Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Back end Installation ###

Clone this repo. From the "back" folder of the project, run `npm install`. You can then run the server with `node server`. The server should run on `localhost` with default port `3000`. If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

### Missions ###
● Dynamic implementation of the Kanap site.

● Unify the work already done by the team by dynamically integrating API elements into the different web pages with JavaScript.

● Set up an acceptance test plan

# General Architecture

### The web application is composed of 4 pages: ###

### ● A home page ###
This page presents all the products returned by the API.
For each product, the image is displayed, as well as its name and the beginning of its description.
By clicking on the product, the user will be redirected to the product page to consult this one in more detail.

### ● A “product” page ###

That displays (dynamically) product details on which the user clicked from the home page. From this page, the user can select a quantity, a color, and add the product to their basket.

### ● A “basket” page ### 

This contains several parts:

○ A summary of the products in the cart, the total price and the possibility of modify the quantity of a selected product or delete it.

○ A form for placing an order. The data of form are correctly formatted before being returned to the back end. For example, no number in a first name field.

○ Item prices are not stored locally. Data stored locally are not secure and the user could then change the price himself.

### ● A “confirmation” page: ###

○ An order confirmation message, thanking the user for his order, and indicating the order identifier sent by the API. This number is not stored anywhere.

### Test planning ###

Plan a suite of acceptance tests to cover all the features listed.

# The source code

The source code be split into several reusable functions (named). A function must be short and meet a specific need. You don't have to have long functions that meets multiple needs at once. Example: he would not be accepted to put a single function in place to collect, process and send data.

# API

Regarding the API, promises are used to avoid callbacks. Alternative solutions, like fetch, this one encompassing the promise. The API is currently only in its first version. The post query that is formulated to place an order does not yet take into consideration the quantity or the color products purchased.

# Operation of the shopping cart

In the basket, the products appear grouped by model and by color.
If a product is added to the basket several times, with the same color, it appears only once, but with the number of copies adjusted.
If a product is added to the cart multiple times, but with colors different, it must appear in two separate lines with the color and quantity corresponding indicated each time.

# API URLs

● Sofa catalog: http://localhost:3000/api/products

# Data Validation

For POST routes, the contact object sent to the server contains the fields firstName, lastName, address, city and email. The array of products sent to the back-end is a array of product-ID strings. The types of these fields and their presence are validated before sending data to the server.

# Steps

### All products are integrated from the API into the home page of the website. ###
- Request the API to request all the products;
- Retrieve the response sent, and browse it to insert each element (each product) in the home page
- Display products dynamically, not statically.
### The link between a product on the home page and the Product page ###
- Get organized on the home page so that, once on the Product page, you know which of the different API products to display.
- Open a Product page knowing which product to display with URLSearchParams
- Each of the products on the home page, parameter of the “a” tag and its “href” attribute.
### Retrieve the id of the product to display in order to know which product we are talking about in the URL (URLSearchParams) ###
- Insert a product and its details in the Product page (retrieve a single product, not all the products.)
### Add products to the cart with an array that would contain three things: ###
- Product ID
- The quantity of the product
- Product color 
Use localStorage to be able to access this array from the Cart page.
- When a product is added to the basket, if it was not already present in the basket, a new element is added to the array.
- When adding a product to the cart, if it was already present in the cart (same id + same color), you simply increment the quantity of the corresponding product in the array.
### Display a summary table of purchases in the Cart page ###
- From the Basket page, retrieve the basket (the array) via localStorage.
### Manage the modification and deletion of products in the Shopping Cart page ###
- Concerning the modification, to use the modification event (addEventListener of type change) to observe the change in quantity.
- Modify the DOM, but also localStorage, otherwise the modifications made in the basket will not be kept
### To order ###
- Retrieve and analyze the data entered by the user in the form.
- Display an error message if needed
### Show order number ###
- Make a POST request on the API
- Retrieve the command id in the response
- Redirect the user to the Confirmation page, passing the order id in the URL, in order to display the order number.

# Skills

● Create a test plan for an application

● Validate data from external sources

● Interact with a web service with JavaScript

● Handle JavaScript events
