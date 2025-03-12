import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";
import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Liquidificador",
  price: 100,
};

const inputError = {
  type: uuid().toString(),
  name: "Liquidificador",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(input)),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {

  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should'nt create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    await expect(productCreateUseCase.execute(inputError)).rejects.toThrowError("Product type not supported");
  });




});