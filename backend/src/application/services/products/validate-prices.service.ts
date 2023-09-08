import ProductInterface from "../../../entity/products/product.interface";
import ProductRepositoryInterface from "../../../entity/products/repository.interface";
import UpdatePriceDto from "./update-price.dto";
import ValidatedPricesDto, { ProductError, ProductInfo } from "./validated-prices.dto";

export default class ValidatePricesService {
    private _repository: ProductRepositoryInterface;

    public constructor(repository: ProductRepositoryInterface) {
        this._repository = repository
    }

    async execute(listDto: UpdatePriceDto[]): Promise<ValidatedPricesDto> {
        if (listDto.length == 0) {
            throw new Error('Nenhum produto encontrado na planilha')
        }
        const products = await this._repository.getProductsByCodes(listDto.map(productDto => productDto.productCode))

        let validatedPrices: ValidatedPricesDto = new ValidatedPricesDto

        products.forEach(product => {
            const productValidated = this.validate(product, listDto)
            validatedPrices.products.push(productValidated)
            if (productValidated.errors.length > 0) {
                validatedPrices.isValid = false
            }
        })
        
        return validatedPrices;
    }

    private validate(product: ProductInterface, listDto: UpdatePriceDto[]): ProductInfo {
        const productDto = listDto.find(productDto => productDto.productCode === product.code)
        let errors = product.validateNewPrice(productDto.newPrice).map(error => {
            return {
                type: error.type,
                message: error.message
            }
        })

        if (product.packItems.length > 0) {
            errors = errors.concat(this.validatePackage(product, listDto, true))
        }

        product.parents.forEach(parent => {
            errors = errors.concat(this.validatePackage(parent, listDto))
        })

        return {code: product.code, name: product.name, price: product.price, newPrice: productDto.newPrice, errors}
    }

    private validatePackage(pack: ProductInterface, listDto: UpdatePriceDto[], selfPackage: boolean = false): ProductError[] {
        let totalNewPrice = 0;
        const packageDto = listDto.find(productDto => productDto.productCode === pack.code)
        const childMessage = `O item pertence ao pacote ${pack.name} e a planilha deve conter todos os produtos que compõem este pacote`
        const packageMessage = `É um pacote e a planilha deve conter todos os produtos que compõem este pacote`
        const packagePriceMessage = `É um pacote e seu preço deve ser igual à soma dos preços dos produtos que o compõem`

        if (packageDto == undefined) {
            return [{
                type: 'Entrada inválida',
                message: childMessage
            }]
        }
        pack.packItems.forEach(child => {
            const childDto = listDto.find(productDto => productDto.productCode === child.product.code)
            if (childDto === undefined) {
                return [{
                    type: 'Entrada inválida',
                    message: selfPackage ? packageMessage : childMessage
                }]
            }
            totalNewPrice += childDto.newPrice*child.quantity
        })

        if (totalNewPrice != packageDto.newPrice && selfPackage) {
            return [{
                type: 'Entrada inválida',
                message: packagePriceMessage
            }]
        }
        return []
    }

}
