import Address from "./address";
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
        // arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12345-678", "São Paulo");
        customer.Address = address;

        // act
        customer.activate();

        // assert
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        // arrange
        const customer = new Customer("1", "Customer 1");
    
        // act
        customer.deactivate();

        // assert
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer")
    });
});