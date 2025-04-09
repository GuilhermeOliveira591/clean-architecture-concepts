import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Bicicleta aro 25",
        price: 2500
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Bicicleta aro 25");
    expect(response.body.price).toBe(2500);
  });

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Bicicleta aro 25",
      });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response1 = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Bicicleta aro 25",
        price: 2500
      });

      expect(response1.status).toBe(200);
      expect(response1.body.name).toBe("Bicicleta aro 25");
      expect(response1.body.price).toBe(2500);

      const response2 = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Liquidificador Novo",
        price: 195.50
      });

      expect(response2.status).toBe(200);
      expect(response2.body.name).toBe("Liquidificador Novo");
      expect(response2.body.price).toBe(195.50);

      const listResponse = await request(app).get("/product").send();

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.products.length).toBe(2);

  });
});
