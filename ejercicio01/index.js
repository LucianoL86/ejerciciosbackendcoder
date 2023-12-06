const ManagerProducts = require('./managerProducts');

const PM = new ManagerProducts();

const product1 = {
    title: 'Smart TV',
    price: 1000,
    description: '32 Pulgadas HD',
    code: 'juanito1234',
}

const product2 = {
    title: 'Heladera',
    price: 2000,
    description: 'De 382 litros con dispenser color Inox',
    code: 'juanito1234',
}

const product3 = {
    title: 'Notebook',
    price: 3000,
    description: 'R7 - 512ssd - 8gb',
    code: 'juanito4321',
}

const product4 = {
    title: 'Cocina',
    price: 4000,
    description: '4 Hornallas 56cm',
    code: 'juanito123'
}

const product5 = {
    title: 'Celular',
    price: 5000,
    code: 'juanito1236'
}

console.log(PM.addProduct(product1));
console.log(PM.addProduct(product2));
console.log(PM.addProduct(product3));
console.log(PM.addProduct(product4));
console.log(PM.addProduct(product5));

console.log('========getProducts========');

console.log(PM.getProducts());

console.log('========id 2========');
console.log(PM.getProductById(2));
console.log('========id 1========');
console.log(PM.getProductById(1));
console.log('========id 3========');
console.log(PM.getProductById(3));
console.log('========id 4========');
console.log(PM.getProductById(4));
console.log('========id 5========');
console.log(PM.getProductById(5));

