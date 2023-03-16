import Customer from "../entity/customer";
import EventDispatcher from "../event/@shared/event-dispatcher";
import { v4 as uuid } from "uuid";
import CustomerCreatedEvent from "../event/@shared/customer/customer-created.event";
import Address from "../entity/address";
import CustomerChangedAddressEvent from "../event/@shared/customer/customer-changed-address.event";

export default class CustomerService {

    static createCustomerAndNotifyEvents(name: string, eventDispatcher: EventDispatcher): Customer {
        const customer = new Customer(uuid(), name);
        eventDispatcher.notify(new CustomerCreatedEvent({
            name: customer.name,
        }));
        return customer;
    }

    static changeCustomerAddressAndNotifyEvents(customer: Customer, address: Address, eventDispatcher: EventDispatcher): void {
        customer.changeAddress(address);
        eventDispatcher.notify(new CustomerChangedAddressEvent({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zip: customer.address.zip,
            city: customer.address.city,
        }));
    }
}