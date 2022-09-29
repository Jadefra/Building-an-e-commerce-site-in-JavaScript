# Kanap #

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

● A “confirmation” page:

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
