import { Sequelize } from "sequelize-typescript";

describe("Product repository test", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: 'memory',
            logging: false,
            sync: { force: true },
        })
    });

    afterEach(async () => {
        await sequilize.close();
    });

    
});