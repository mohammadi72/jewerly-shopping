// http://localhost:3000/items
let allProductsData = [];
const productsDOM = document.querySelector(".products");
const filters = {
  searchItems: "",
};
const searchInput = document.querySelector(".search");
const btns = document.querySelectorAll(".btn");
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductsData = res.data;
      // console.log(allProductsData);
      //render products on DOM
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

searchInput.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});
function renderProducts(_products, _filters) {
  const filterProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
  });
  productsDOM.innerHTML = "";
  //render to DOM
  filterProducts.forEach((item, index) => {
    //create
    //content
    //append to .products
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `
    <div class="product">
    <div class="img-container">
        <img src=${item.image} alt="p-${index}" id="p${index}" class="image">
    </div>
    <div class="product-desc">
        <p class="product-price">${item.price} $</p>
        <p class="product-title">${item.title}</p>
    </div>
</div>`;
    //append to DOM
    productsDOM.appendChild(productsDiv);
  });
}
//filter based on groups:
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    filters.searchItems = filter;
    renderProducts(allProductsData, filters);
  });
});
