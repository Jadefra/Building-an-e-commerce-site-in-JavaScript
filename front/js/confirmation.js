const findId = document.querySelector("#orderId");
const takeUrl = window.location.search;
const takeOrderWithId = new URLSearchParams(takeUrl);
const addOrderIdinUrl = takeOrderWithId.get("name");
findId.textContent = addOrderIdinUrl;