import PackItem from "../../entity/products/pack-item.entity";
import Product from "../../entity/products/product.entity";
import ProductInterface from "../../entity/products/product.interface";
import ProductRepositoryInterface from "../../entity/products/repository.interface";

const products: ProductInterface[] = [
    new Product(16,'AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML',26.44,28.49, [], null),
    new Product(18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99, [], [new Product(1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94, [
        new PackItem(6, new Product(18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99, [], null))
    ], null)]),
    new Product(19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29, [], [new Product(1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00, [
        new PackItem(2, new Product(19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29, [], null)),
        new PackItem(2, new Product(20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79, [], null)),
    ], null)]),
    new Product(20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79, [], [new Product(1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00, [
        new PackItem(2, new Product(19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29, [], null)),
        new PackItem(2, new Product(20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79, [], null)),
    ], null)]),
    new Product(21,'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML',10.71,11.71, [], null),
    new Product(22,'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇUCAR 250ML',6.74,7.49, [], null),
    new Product(23,'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L',2.15,2.39, [], null),
    new Product(24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99, [], [new Product(1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78, [
        new PackItem(1, new Product(24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99, [], null)),
        new PackItem(1, new Product(26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79, [], null))
    ], null)]),
    new Product(26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79, [], [new Product(1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78, [
        new PackItem(1, new Product(24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99, [], null)),
        new PackItem(1, new Product(26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79, [], null))
    ], null)]),
    new Product(1000,'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES',48.54,53.94, [
        new PackItem(6, new Product(18,'BEBIDA ENERGÉTICA VIBE 2L',8.09,8.99, [], null))
    ], null),
    new Product(1010,'KIT ROLO DE ALUMINIO + FILME PVC WYDA',8.80,9.78, [
        new PackItem(1, new Product(24,'FILME DE PVC WYDA 28CMX15M',3.59,3.99, [], null)),
        new PackItem(1, new Product(26,'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M',5.21,5.79, [], null))
    ], null),
    new Product(1020,'SUPER PACK RED BULL VARIADOS - 6 UNIDADES',51.81,57.00, [
        new PackItem(2, new Product(19,'ENERGÉTICO  RED BULL ENERGY DRINK 250ML',6.56,7.29, [], null)),
        new PackItem(2, new Product(20,'ENERGÉTICO RED BULL ENERGY DRINK 355ML',9.71,10.79, [], null)),
    ], null),
]

export default class ProductRepositoryMock implements ProductRepositoryInterface {
    getProductsByCodes(codes: number[]): Promise<ProductInterface[]> {
        return Promise.resolve(products.filter(product => codes.includes(product.code)));
    }
    updatePrices(products: ProductInterface[]): Promise<void> {
        return Promise.resolve();
    }

}