const SERVER = "http://localhost:8080";

////////////////AUTH//////////////////////////
export function auth(credentials) {
  console.log(credentials);
  return {
    type: "POST_USER",
    payload: async () => {
      let response = await fetch(`${SERVER}/auth/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    },
  };
}

export function register(credentials) {
  return {
    type: "POST_USER",
    payload: async () => {
      let response = await fetch(`${SERVER}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
    },
  };
}

////PRODUCTS//////
export function getProducts() {
  console.log("get prod");
  let token = localStorage.getItem("token");
  console.log("token: ", token);

  return {
    type: "GET_PRODUCTS",
    payload: async () => {
      let response = await fetch(`${SERVER}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      return data;
    },
  };
}

export function getProductsByCategory(category) {
  console.log("get prod");
  let token = localStorage.getItem("token");
  console.log("token: ", token);

  return {
    type: "GET_PRODUCTS",
    payload: async () => {
      const response = await fetch(`${SERVER}/products?category=${category}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();
      return data;
    },
  };
}

export function getProductById(id) {
  let token = localStorage.getItem("token");

  return {
    type: "GET_PRODUCT",
    payload: async () => {
      const response = await fetch(`${SERVER}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  };
}

/////////////SHOPPING CART///////////////////
export function getShoppingCart(id) {
  let token = localStorage.getItem("token");

  return {
    type: "GET_CART",
    payload: async () => {
      const response = await fetch(`${SERVER}/me/${id}/cart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();
      return data;
    },
  };
}
// export function getShoppingCart(id) {
//     return {
//         type: "GET_SHOPPING_CART",
//         payload: async () => {
//             const token = 'your_bearer_token_here'; // Replace 'your_bearer_token_here' with the actual bearer token
//             const response = await fetch(`${SERVER}/me/${id}/cart`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await response.json();
//             return data;
//         }
//     };
// }

export function addProductToShoppingCart(id, addProductToShoppingCartDto) {
  let token = localStorage.getItem("token");

  return {
    type: "POST_SHOPPING_CART",
    payload: async () => {
      let response = await fetch(`${SERVER}/me/${id}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(addProductToShoppingCartDto),
      });
      const data = await response.json();
      return data;
    },
  };
}

export function editQuantity(id, quantityDto, itemId) {
  let token = localStorage.getItem("token");
  console.log(quantityDto);
  return {
    type: "PUT_SHOPPING_CART",
    payload: async () => {
      let response = await fetch(`${SERVER}/me/${id}/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(quantityDto),
      });
      const data = await response.json();
      return data;
    },
  };
}

export function deleteItemFromShoppingCart(id, itemId) {
  let token = localStorage.getItem("token");

  return {
    type: "DELETE_SHOPPING_CART",
    payload: async () => {
      let response = await fetch(`${SERVER}/me/${id}/cart/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    },
  };
}

//////pay///////
export function pay(total) {
  let token = localStorage.getItem("token");

  return {
    type: "POST_PAYMENT",
    payload: async () => {
      let response = await fetch(`${SERVER}/paypal/pay?total=${total}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    },
  };
}
