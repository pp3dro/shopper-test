export default class InvalidProductPrice extends Error {
    private _productCode: number
    private _type: string
    constructor(type: string, message: string, productCode: number) {
        super(message)
        this._type = type
        this._productCode = productCode
        this.name = 'InvalidProductPrice'
    }

    get productCode(): number {
        return this._productCode
    }

    get type(): string {
        return this._type
    }
}