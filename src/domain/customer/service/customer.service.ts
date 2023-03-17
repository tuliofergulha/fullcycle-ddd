import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerChangedAddressEvent from "../event/customer-changed-address.event";
import Address from "../value-object/address";

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