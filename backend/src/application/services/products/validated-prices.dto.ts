export type ProductError = {
    type: string
    message: string
}

export type ProductInfo = {
    code: number
    name: string
    price: number
    newPrice: number
    errors: ProductError[]
}

export default class ValidatedPricesDto {
    public isValid: boolean = true
    public products: ProductInfo[] = []
}