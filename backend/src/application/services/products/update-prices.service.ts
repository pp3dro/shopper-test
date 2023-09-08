import ProductInterface from "../../../entity/products/product.interface";
import ProductRepositoryInterface from "../../../entity/products/repository.interface";
import UpdatePriceDto from "./update-price.dto";
import ValidatedPricesDto, { ProductError, ProductInfo } from "./validated-prices.dto";

export default class UpdatePricesService {
    private _repository: ProductRepositoryInterface;

    public constructor(repository: ProductRepositoryInterface) {
        this._repository = repository
    }

    async execute(listDto: UpdatePriceDto[]): Promise<void> {
        const products = await this._repository.getProductsByCodes(listDto.map(productDto => productDto.productCode))

        products.forEach(product => {
            const newPrice = listDto.find(productDto => productDto.productCode === product.code)?.newPrice
            if (newPrice == undefined) {
                console.log({
                    level: 'error',
                    message: 'Preço não encontrado na planilha',
                    productCode: product.code,
                    product,
                    dto: listDto.find(productDto => productDto.productCode === product.code),
                    listDto,
                })
                throw new Error("Ocorreu um erro interno no sistema, favor contate o suporte")
            }
            product.price = newPrice
            if (product.packItems.length > 0) {
                product.cost = product.packItems.reduce((acc, packItem) => acc + packItem.product.cost * packItem.quantity, 0)
            }
        })

        await this._repository.updatePrices(products)
    }


}
