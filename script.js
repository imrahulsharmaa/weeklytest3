const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

let cart = {};

let container = document.getElementsByClassName("left-container")[0];
Products.forEach((product, index) => {
  container.innerHTML += `<div class="product">
    <h2>${product.name}</h2>
    <h2 class="price">${product.price}</h2>
    <div class="button">
        <button class="decrease" onClick="updateQuantity(${index}, -1)">-</button>
        <span class="quantity" data-index="${index}">0</span>
        <button class="increase" onClick="updateQuantity(${index}, 1)">+</button>
    </div>
    </div>`;
});

function updateQuantity(index, change) {
  let quantityElement = document.querySelector(
    `.quantity[data-index="${index}"]`
  );
  let value = parseInt(quantityElement.innerText) + change;
  if (value < 0) {
    value = 0;
  }
  quantityElement.innerText = value;

  cart[Products[index].name] = value;
  updateCartDisplay();
}

function updateCartDisplay() {
  let rightContainer = document.getElementsByClassName("right-container")[0];
  rightContainer.innerHTML = "<h1 class='cart'>Cart</h1>";

  let total = 0;
  let hasItems = false;

  Products.forEach((product) => {
    let quantity = cart[product.name] || 0;
    if (quantity > 0) {
      rightContainer.innerHTML += `
            <div>
                <h2>${product.name}</h2>
                <span>${quantity}</span>
                <h2 class="price">${product.price * quantity}</h2>
            </div>`;
      total += product.price * quantity;
      hasItems = true;
    }
  });

  if (!hasItems) {
    rightContainer.innerHTML += `<h3>No Product added to the cart.</h3>`;
  } else {
    rightContainer.innerHTML += `<h1>Total: ${total}</h1>`;
  }
}

updateCartDisplay();
