import InvalidProductPrice from "./invalid-product-price.error"
import PackItemInterface from "./pack-item.interface"
import ProductInterface from "./product.interface"

export default class Product implements ProductInterface {
    private _code: number
    private _name: string
    private _cost: number
    private _price: number
    private _packItems: PackItemInterface[]
    private _parents: ProductInterface[]

    constructor(code: number, name: string, cost: number, price: number, packItems: PackItemInterface[], parents: ProductInterface[]) {
        this._code = code
        this._name = name
        this._price = price
        this._cost = cost
        this._packItems = packItems
        this._parents = parents
    }

    get code(): number {
        return this._code
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }

    set price(newPrice: number) {
        if(this.validateNewPrice(newPrice).length > 0) {
            throw new Error("Ocorreu um erro interno no sistema, favor contate o suporte")
        }
        this._price = newPrice
    }

    set cost(newCost: number) {
        this._cost = newCost
    }

    get cost(): number {
        return this._cost
    }

    get packItems(): PackItemInterface[] {
        return this._packItems
    }

    get parents(): ProductInterface[] {
        return this._parents
    }

    validateNewPrice(newPrice: number): InvalidProductPrice[] {
        const errors: InvalidProductPrice[] = []
        if (newPrice < this._cost) {
            errors.push(new InvalidProductPrice('Financeiro', `Preço de venda não pode ser menor que o preço de custo (R$ ${this._cost.toFixed(2)})`, this._code))
        }
        if (newPrice > this._price*1.1 || newPrice < this._price*0.9) {
            errors.push(new InvalidProductPrice('Marketing', 'O Preço do produto não pode ter um reajuste maior que 10%', this._code))
        }
        return errors
    }
}