import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test for product update use case", () => {

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

    it("should update a product", async () => {
        const productRepository = new ProductRepository;
        const product = new Product("123", "Product1", 89);
        productRepository.create(product);

        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: "Liquidificador",
            price: 58
        };

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});