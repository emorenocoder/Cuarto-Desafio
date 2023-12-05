const socket = io();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const product = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
  };

  socket.emit("post_send", { action: "add", product });
  form.reset();
});

socket.on("updateProducts", (data) => {
  const productsContainer = document.querySelector("#products");

  productsContainer.innerHTML = data
    .map((product) => {
      return `
      <p>
        Title: ${product.title} -
        Description: ${product.description} -
        Price: ${product.price} -
        <button onclick="deleteProduct('${product.id}')">Eliminar</button>
      </p>
    `;
    })
    .join(" ");
});

function deleteProduct(productId) {
  socket.emit("post_send", { action: "delete", productId });
}
