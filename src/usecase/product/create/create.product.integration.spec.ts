import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import CreateProductUseCase from "./create.product.usecase";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product1 = {
    type: "a",
    name: "Product A",
    price: 100,
}

const product2 = {
    type: uuid(),
    name: "Product C",
    price: 100,
}

describe("Unit test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(product1);

        expect(output).toEqual({
            id: expect.any(String),
            name: product1.name,
            price: product1.price,
        });
    });

    it("should'nt create a product", async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);     
        await expect(productCreateUseCase.execute(product2)).rejects.toThrowError("Product type not supported");
    });




});