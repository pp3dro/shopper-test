export default interface ProductControllerInterface {
    validatePrices(req: any, res: any): Promise<void>
    updatePrices(req: any, res: any): Promise<void>
}