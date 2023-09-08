import InvalidProductPrice from "./invalid-product-price.error";
import PackItemInterface from "./pack-item.interface";

export default interface ProductInterface {
    get code(): number
    get name(): string
    get cost(): number
    set cost(newCost: number)
    get price(): number
    set price(newPrice: number)
    
    get packItems(): PackItemInterface[]
    get parents(): ProductInterface[]

    validateNewPrice(newPrice: number): InvalidProductPrice[]
}