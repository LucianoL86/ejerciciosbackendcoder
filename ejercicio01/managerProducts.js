class ManagerProducts {
    #products = [];

    constructor() {
        this.#products = [{ countId: 0, products: [] }]
    }

    addProduct = (newProduct) => {
        const { title, price, description, code } = newProduct;

        if (!title || !price || !description || !code) {
            return "Todos los campos son obligatorios";
        }

        const codeExists = this.#products[0].products.find(p => p.code === code);

        if (codeExists) return "El código ya existe";

        this.#products[0].countId += 1;
        newProduct._id = this.#products[0].countId;

        this.#products[0].products.push(newProduct);
        return `${newProduct.title} ha sigo agregado con éxito.`;
    }

    getProducts = () => {
        return this.#products[0].products;
    }

    getProductById = (id) => {
        const product = this.#products[0].products.find(p => p._id === id);
        if (!product) return 'Not Found';
        return product;
    }
}

module.exports = ManagerProducts;