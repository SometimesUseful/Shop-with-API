let main = document.querySelector('main');
let input = document.querySelector('.s-input');
let select = document.getElementById('showItemsSelect');

let preloaderEl = document.createElement('div');
preloaderEl.classList.add('preloader')
preloaderEl.innerText = 'Waiting for the response';

function createProduct(name,id,img,desc,price){
    let product = document.createElement('article');
    product.classList.add('product');
    product.id = id;

    let image = document.createElement('img');
    image.src = img;
    image.classList.add('product-img');
    product.append(image);

    let title = document.createElement('h2');
    title.classList.add('product-name');
    title.innerText = name;
    product.append(title);

    let description = document.createElement('p');
    description.classList.add('description');
    description.innerText = desc;
    product.append(description);

    let pricing = document.createElement('p');
    pricing.classList.add('price');
    pricing.innerText = price;
    product.append(price);
    main.append(product);
}

function showAllProducts(){
    main.innerHTML = '';
    main.append(preloaderEl);
    fetch(`https://fakestoreapi.com/products`)
        .then(response => response.json())
        .then(data => {
            preloaderEl.remove();

            for (const product of data) {
                createProduct(
                    product.title,
                    product.id,
                    product.image,
                    product.description,
                    `${product.price}$`
                );
            }

        })
}

function showProductsByCriteria(criteria){
    main.innerHTML = '';
    main.append(preloaderEl);
    fetch(`https://fakestoreapi.com/products/category/${criteria}`)
        .then(response => response.json())
        .then(data => {
            preloaderEl.remove();

            for (const product of data) {
                createProduct(
                    product.title,
                    product.id,
                    product.image,
                    product.description,
                    `${product.price}$`
                );
            }
        })
}

function showProductsByInput(inputVal){
    main.innerHTML = '';
    main.append(preloaderEl);
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data=>{
            preloaderEl.remove();

            for (const product of data) {
                if (product.title.includes(inputVal)){
                    createProduct(
                        product.title,
                        product.id,
                        product.image,
                        product.description,
                        `${product.price}$`
                    );
                }
            }

            if (main.innerHTML === ""){
                main.innerHTML = '<h1>There is no items found</h1>'
            }})
}
input.addEventListener('keyup',(e)=>{
    if (e.keyCode === 13){
        showProductsByInput(input.value);
    }
});
document.querySelector('.s-input-btn').addEventListener('click',() => showProductsByInput(input.value));
select.addEventListener('change', () => showProductsByCriteria(select.value));
document.querySelector('.s-btn').addEventListener('click', showAllProducts);