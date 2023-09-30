import { handleError, handleResponse } from "./apiUtils";

// const baseUrl = process.env.API_URL + "/products/";

export async function getProducts() {
  //return fetch(baseUrl);
  return await fetch("http://localhost:8010/Catalog")
    .then(handleResponse)
    .catch(handleError);
  //return productsMock();
}

// function productsMock() {
//   return [
//     {
//       id: "602d2149e773f2a3990b47f5",
//       name: "IPhone X",
//       category: "Smart Phone",
//       summary:
//         "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
//       imageFile: "product-1.png",
//       price: 950.0,
//     },
//     {
//       id: "602d2149e773f2a3990b47f6",
//       name: "Samsung 10",
//       category: "Smart Phone",
//       summary:
//         "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
//       imageFile: "product-2.png",
//       price: 840.0,
//     },
//     {
//       id: "602d2149e773f2a3990b47f7",
//       name: "Huawei Plus",
//       category: "White Appliances",
//       summary:
//         "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
//       imageFile: "product-3.png",
//       price: 650.0,
//     },
//     {
//       id: "602d2149e773f2a3990b47f8",
//       name: "Xiaomi Mi 9",
//       category: "White Appliances",
//       summary:
//         "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
//       imageFile: "product-4.png",
//       price: 470.0,
//     },
//     {
//       id: "602d2149e773f2a3990b47f9",
//       name: "HTC U11+ Plus",
//       category: "Smart Phone",
//       summary:
//         "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
//       imageFile: "product-5.png",
//       price: 380.0,
//     },
//     {
//       id: "602d2149e773f2a3990b47fa",
//       name: "LG G7 ThinQ",
//       category: "Home Kitchen",
//       summary:
//         "This phone is the company's biggest change to its flagship smartphone in years. It includes a borderless.",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.",
//       imageFile: "product-6.png",
//       price: 240.0,
//     },
//   ];
// }

//TODO Leverage Redux
