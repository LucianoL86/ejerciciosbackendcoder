
const fs = require('fs')

class ProductManager {

    constructor(route) {
        this.route = route
    }

    async getProducts() {
        if (fs.existsSync(this.route)) {
            const savedProducts = await fs.promises.readFile(this.route, 'utf-8')
            return JSON.parse(savedProducts)
        } else {
            return []
        }
    }

    async addProduct(product) {
        const savedProducts = await this.getProducts()
        let id
        if (!savedProducts.length) {
            id = 1
        } else {
            id = savedProducts[savedProducts.length - 1].id + 1
        }
        savedProducts.push({ id, ...product })
        await fs.promises.writeFile(this.route, JSON.stringify(savedProducts))
        console.log('Producto cargado')
    }

    async editProduct(idProduct, updateField, newData) {
        const savedProducts = await this.getProducts()
        const updateProduct = savedProducts.find(u => u.id === idProduct)
        if (updateProduct) {
            updateProduct[updateField] = newData
            await fs.promises.writeFile(this.route, JSON.stringify(savedProducts))
        } else {
            return 'Producto no encontrado'
        }
    }

    async deleteProductById(idProduct) {
        const savedProducts = await this.getProducts()
        const newSavedProduct = savedProducts.filter(u => u.id !== idProduct)
        await fs.promises.writeFile(this.route, JSON.stringify(newSavedProduct))
    }

    async getProductById(idProduct) {
        const savedProducts = await this.getProducts()
        const ProdAux = savedProducts.find(u => u.id === idProduct)
        if (ProdAux) {
            return ProdAux
        } else {
            return 'Producto no encontrado'
        }
    }

    async deleteFile() {
        await fs.promises.unlink(this.route)
    }
}

//Instancio productos
const product1 = {
    titulo: "Smart TV",
    descripcion: "32 Pulgadas HD",
    precio: 250000,
    imagen: "Sin imagen",
    codigo: "AAA001",
    stock: 10
}
const product2 = {
    titulo: "Notebook",
    descripcion: "R7 - 512ssd - 8gb",
    precio: 320000,
    imagen: "Sin imagen",
    codigo: "AAA002",
    stock: 15
}
const product3 = {
    titulo: "Celular",
    descripcion: "Moto g32, 6GB RAM, 3 Cámaras",
    precio: 97000,
    imagen: "Sin imagen",
    codigo: "AAA003",
    stock: 20
}
const product4 = {
    titulo: "Heladera",
    descripcion: "De 382 litros con dispenser color Inox",
    precio: 280000,
    imagen: "Sin imagen",
    codigo: "AAA004",
    stock: 25
}

const route = './productos.json'
async function test() {
    const PM = new ProductManager(route)
    await PM.addProduct(product1)
    await PM.addProduct(product2)
    await PM.addProduct(product3)
    await PM.addProduct(product4)
    console.log('============== Obtener productos ==============')
    const aux1 = await PM.getProducts()
    console.log(aux1);
    console.log('============== Obtener producto por ID, el 3 ==============')
    const aux2 = await PM.getProductById(3)
    console.log(aux2);
    console.log('============== Borrar un producto, el 2 ==============')
    await PM.deleteProductById(2)
    const aux3 = await PM.getProducts()
    console.log(aux3);
    console.log('============== Editar un producto, el código del 4 ==============')
    await PM.editProduct(4, 'codigo', 'BBB001')
    const aux4 = await PM.getProducts()
    console.log(aux4);
    console.log('============== Borro archivo ==============')
    await PM.deleteFile()
}
test()