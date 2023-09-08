import csvtojson from "csvtojson";

import ValidatePricesService from "../services/products/validate-prices.service";
import ProductControllerInterface from "./product.interface";
import UpdatePriceDto from "../services/products/update-price.dto";
import InvalidProductRequestError from "./invalid-product-resquest.error";
import UpdatePricesService from "../services/products/update-prices.service";

type RequestFile = {
    product_code: number
    new_price: number
}

export default class ProductController implements ProductControllerInterface {
    private _validatePricesService: ValidatePricesService
    private _updatePricesService: UpdatePricesService

    constructor(validatePricesService: ValidatePricesService, updatePricesService: UpdatePricesService) {
        this._validatePricesService = validatePricesService
        this._updatePricesService = updatePricesService
    }

    public async validatePrices(req: any, res: any): Promise<void> {
        if (req.files.sheet == undefined) {
            res.status(400).send({status: 'error', message: 'Necessário enviar planilha de preços'})
            return
        }

        const sheetData = req.files.sheet.data.toString('utf8')
        
        try {
            const data = await csvtojson().fromString(sheetData)
            if (data.length == 0) {
                throw new InvalidProductRequestError('Nenhum produto encontrado na planilha')
            }
            
            const productsDto = data.map((product: RequestFile) => {
                if (product.product_code == undefined || product.new_price == undefined) {
                    throw new InvalidProductRequestError('Planilha inválida')
                }
                return new UpdatePriceDto(
                    parseInt(product.product_code.toString()),
                    parseFloat(product.new_price.toString())
                )
            })
            const validatedProducts = await this._validatePricesService.execute(productsDto)
            res.send({status: 'success', message: "Preços validados com sucesso", data: validatedProducts})
        } catch (error) {
            const message = error instanceof InvalidProductRequestError ? error.message : 'Planilha inválida'
            res.status(400).send({status: 'error', message})
        }
    }

    public async updatePrices(req: any, res: any): Promise<void> {
        if (req.files.sheet == undefined) {
            res.status(400).send({status: 'error', message: 'Necessário enviar planilha de preços'})
            return
        }

        const sheetData = req.files.sheet.data.toString('utf8')
        let productsDto: UpdatePriceDto[] = []
        try {
            const data = await csvtojson().fromString(sheetData)
            if (data.length == 0) {
                throw new InvalidProductRequestError('Nenhum produto encontrado na planilha')
            }
            
            productsDto = data.map((product: RequestFile) => {
                if (product.product_code == undefined || product.new_price == undefined) {
                    throw new InvalidProductRequestError('Planilha inválida')
                }
                return new UpdatePriceDto(
                    parseInt(product.product_code.toString()),
                    parseFloat(product.new_price.toString())
                )
            })
            const validatedProducts = await this._validatePricesService.execute(productsDto) // re-validate prices to ensure that the new prices are not changed by frontend
            if(validatedProducts.isValid == false) {
                res.status(400).send({status: 'error', message: "Não foi possível atualizar o preço dos produtos, verifique os dados e tente novamente!", data: validatedProducts})
                return
            }
        } catch (error) {
            const message = error instanceof InvalidProductRequestError ? error.message : 'Planilha inválida'
            res.status(400).send({status: 'error', message})
        }

        try {
            await this._updatePricesService.execute(productsDto)
            res.send({status: 'success', message: 'Preços atualizados com sucesso'})
        } catch (error) {
            res.status(500).send({status: 'error', message: error.message})
        }
    }
}