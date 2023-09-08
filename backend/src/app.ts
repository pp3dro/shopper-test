import { PrismaClient } from "@prisma/client";
import ProductController from "./application/controllers/products.controller";
import ValidatePricesService from "./application/services/products/validate-prices.service";
import { server } from "./infrastructure/express/express";
import ProductRepository from "./infrastructure/sql/prisma/product.repository";
import UpdatePricesService from "./application/services/products/update-prices.service";

const prisma = new PrismaClient();
const productRepository = new ProductRepository(prisma);
const validateProductPrices = new ValidatePricesService(productRepository);
const updateProductPrices = new UpdatePricesService(productRepository);
const productController = new ProductController(validateProductPrices, updateProductPrices);

server(productController);