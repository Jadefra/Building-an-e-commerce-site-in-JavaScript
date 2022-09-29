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

● A home page showing (dynamically) all the articles available at the sale.

● A “product” page that displays (dynamically) product details on which the user clicked from the home page. From this page, the user can select a quantity, a color, and add the product to their basket.

● A “basket” page. This contains several parts:

○ A summary of the products in the cart, the total price and the possibility of modify the quantity of a selected product or delete it.

○ A form for placing an order. The data of form are correctly formatted before being returned to the back end. For example, no number in a first name field.

● A “confirmation” page:
○ An order confirmation message, thanking the user for his order, and indicating the order identifier sent by the API.
