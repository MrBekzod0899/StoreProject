let menu = document.querySelector(".menu");
let menuitem;
let text = "all";
let cardlist = document.querySelector("main .row");
let loader=document.querySelector('.loading')
let product=document.querySelector('.product')
let saveCart=[]

// if(localStorage.getItem('product')){
//     saveCart=JSON.parse(localStorage.getItem('product'))
//     console.log(saveCart);
// }

loader.style.display='flex'
product.style.display='none'


fetch("https://fakestoreapi.com/products/categories")
.then((res) => res.json())
.then((data) => {
  data.forEach((element) => {
     menu.innerHTML += `<a href="#!" data-category="${element}" onclick="filterCategory(event)">${element.toUpperCase()}</a>`;
  })
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
        show(data)
  }).finally(()=>{
      loader.style.display='none'
      product.style.display='block'
  })

function show(arr){
    cardlist.innerHTML=''
    arr.forEach((item) => {
        cardlist.innerHTML += `
        <div class="col-md-3 col-lg-3 col-sm-6 col-12">
        <div class="card">
        <div class="card-img">
            <img src="${item.image}" alt="product" />
        </div>
        <div class="card-body">
            <div class="card-title">${item.title.slice(0,50)}</div>
            <div class='product_price'>${item.price}$</div>
            <div class="card-content">
                <p class="product-description">${item.description.slice(0,120)}</p>
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
                    <span onclick="addToCart(${item.id})"><i class='fas fa-cart-plus'></i></span>
                </div>
                </div>
        </div>
        </div>
    </div>
    `;
    })
    loader.style.display='none'
    product.style.display='block'
}

function filterCategory(e){
    e.preventDefault()
    loader.style.display='flex'
    product.style.display='none'
    let cat=e.target.getAttribute('data-category')
    if(document.querySelector('.menu a.active')){
        document.querySelector('.menu a.active').classList.remove('active')
        e.target.classList.add('active')
    }
    if(cat=='all'){
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
                show(data)
        });
    }
    else{
        fetch(`https://fakestoreapi.com/products/category/${cat}`)
        .then(res=>res.json())
        .then(data=>show(data))
    }
}

function addToCart(id){

fetch(`https://fakestoreapi.com/products/${id}`)
.then((res) => res.json())
.then((data) => {
    let cart={
        id:id,
        title:data.title
    }
    saveCart.push(cart)
    localStorage.setItem('product',JSON.stringify(saveCart)) 
}); 
  
}