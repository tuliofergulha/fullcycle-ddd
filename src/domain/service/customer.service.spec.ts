import Address from "../entity/address";
import SendConsoleLog1Handler from "../event/@shared/customer/handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "../event/@shared/customer/handler/send-console-log-2.handler";
import SendConsoleLog3Handler from "../event/@shared/customer/handler/send-console-log-3.handler";
import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerService from "./customer.service";

describe("Customer service unit tests", () => {

    it("should create a customer and notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        CustomerService.createCustomerAndNotifyEvents("Túlio Fergulha", eventDispatcher);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should create a customer, update address and notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const eventHandler3 = new SendConsoleLog3Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler3);

        const customer = CustomerService.createCustomerAndNotifyEvents("Túlio Fergulha", eventDispatcher);
        
        const address = new Address("Street 1", 10, "12345-678", "São Paulo");
        
        CustomerService.changeCustomerAddressAndNotifyEvents(customer, address, eventDispatcher);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(spyEventHandler3).toHaveBeenCalled();
    });
});