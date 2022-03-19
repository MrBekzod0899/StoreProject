let menu = document.querySelector(".menu");
let menuitem;
let text = "all";
let cardlist = document.querySelector("main .row");

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((data) => {
    menu.innerHTML = `<li class='active'><a>All</a></li>`;
    data.forEach((element) => {
      let = text = element;
      menu.innerHTML += `<li>
            <a>${element}</a>            
         </li>`;
    });
  });

function changeCategory(item) {
  console.log(item);
}

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      cardlist.innerHTML += `
        <div class="col-md-3 col-lg-3 col-sm-6 col-12">
        <div class="card">
        <div class="card-img">
            <img src="${item.image}" alt="product" />
        </div>
        <div class="card-body">
            <div class="card-title">${item.title}</div>
            <div class="card-content">
                <p class="product-description">${item.description.slice(0,100)}</p>
                </div>
                <div class="card-footer">
                <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <span>${item.rating.count}</span>
                </div>
                <div class="card_shop">
                    <span><i class='fas fa-cart-plus'></i></span>
                </div>
                </div>
        </div>
        </div>
 </div>
`;
    });
  });
