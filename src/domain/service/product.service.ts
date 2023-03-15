import Product from "../domain/entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.changePrice((product.price * percentage) / 100 + product.price);
        });
    }
}