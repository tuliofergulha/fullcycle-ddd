import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John")
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "")
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        // arrange
        const customer = new Customer("1", "John");

        // act
        customer.changeName("Jane");

        // assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12345-678", "São Paulo");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
    
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer")
    });

    it("should add reward points", () => {
        const customer = new Customer("c1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20);
    });
});