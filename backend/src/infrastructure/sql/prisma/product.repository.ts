import { PrismaClient } from "@prisma/client";
import ProductInterface from "../../../entity/products/product.interface";
import ProductRepositoryInterface from "../../../entity/products/repository.interface";
import Product from "../../../entity/products/product.entity";
import PackItem from "../../../entity/products/pack-item.entity";

export default class ProductRepository implements ProductRepositoryInterface {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async getProductsByCodes(codes: number[]): Promise<ProductInterface[]> {
        const result = await this.client.product.findMany({
            where: {
                code: {
                    in: codes
                }
            },
            include: {
                pack_items: {
                    include: {
                        product: true
                    }
                },
                parents: {
                    include: {
                        pack: {
                            include: {
                                pack_items: {
                                    include: {
                                        product: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });

        return result.map((product) => new Product(
            parseInt(product.code.toString()),
            product.name,
            parseFloat(product.cost_price.toString()),
            parseFloat(product.sales_price.toString()),
            product.pack_items.map((packItem) => new PackItem(
                parseInt(packItem.qty.toString()),
                new Product(
                    parseInt(packItem.product.code.toString()),
                    packItem.product.name,
                    parseFloat(packItem.product.cost_price.toString()),
                    parseFloat(packItem.product.sales_price.toString()),
                    [],
                    []
                )
            )),
            product.parents.map(parent => new Product(
                parseInt(parent.pack.code.toString()),
                parent.pack.name,
                parseFloat(parent.pack.cost_price.toString()),
                parseFloat(parent.pack.sales_price.toString()),
                parent.pack.pack_items.map((packItem) => new PackItem(
                    parseInt(packItem.qty.toString()),
                    new Product(
                        parseInt(packItem.product.code.toString()),
                        packItem.product.name,
                        parseFloat(packItem.product.cost_price.toString()),
                        parseFloat(packItem.product.sales_price.toString()),
                        [],
                        []
                    )
                )),
                []
            ))
        ));
    }

    async updatePrices(products: ProductInterface[]): Promise<void> {
        await this.client.$transaction(products.map((product) => {
            return this.client.product.update({
                where: {
                    code: product.code
                },
                data: {
                    sales_price: product.price,
                    cost_price: product.cost
                }
            })
        }))
    }
}