import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";


const input = {
    id: "123",
    name: "Liquidificador",
    price: 150,
};

const inputError = {
    id: 251,
    name: "Liquidificador",
    price: 100,
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(input)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const result = await findProductUseCase.find(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should'nt find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const result = await findProductUseCase.find(input);

        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });


});
