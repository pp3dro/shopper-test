export default class UpdatePriceDto {
    public productCode: number
    public newPrice: number

    constructor(productCode: number, newPrice: number) {
        this.productCode = productCode
        this.newPrice = newPrice
    }
}