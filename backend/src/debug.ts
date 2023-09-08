import { PrismaClient } from "@prisma/client";
import ProductRepository from "./infrastructure/sql/prisma/product.repository";

const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);

const main = async () => {
    const products = await productRepository.getProductsByCodes([26, 1000, 1010]);
}

main();