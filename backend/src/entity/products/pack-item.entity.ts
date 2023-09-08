import PackItemInterface from "./pack-item.interface";
import ProductInterface from "./product.interface";

export default class PackItem implements PackItemInterface {
    private _quantity: number
    private _product: ProductInterface

    constructor(quantity: number, product: ProductInterface) {
        this._quantity = quantity
        this._product = product
    }

    get quantity(): number {
        return this._quantity
    }

    get product(): ProductInterface {
        return this._product
    }
}