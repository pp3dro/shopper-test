import ProductInterface from "./product.interface"

export default interface ProductRepositoryInterface {
    getProductsByCodes(codes: number[]): Promise<ProductInterface[]>
    updatePrices(products: ProductInterface[]): Promise<void>
}