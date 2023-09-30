import { handleError, handleResponse } from "./apiUtils";
//
// const baseUrl = process.env.API_URL + "/basket/";

export async function getBasket() {
  return await fetch("http://localhost:8010/Basket/swn")
    .then(handleResponse)
    .catch(handleError);
}

export async function createBasket(basket) {
  return await fetch("http://localhost:8010/Basket", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(basket),
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function updateBasket(basket) {
  return await fetch("http://localhost:8010/Basket", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(basket),
  })
    .then(handleResponse)
    .catch(handleError);
}
