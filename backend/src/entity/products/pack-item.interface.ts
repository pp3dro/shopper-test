import ProductInterface from "./product.interface";

export default interface PackItemInterface {
    get quantity(): number
    get product(): ProductInterface
}