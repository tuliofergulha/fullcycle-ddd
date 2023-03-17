import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";


let customer = new Customer("1", "Túlio Fergulha")
const address = new Address("Rua dois", 2, "12345-678", "São Paulo")
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "1", "Item 1", 10, 2);
const item2 = new OrderItem("2", "2", "Item 2", 15, 3);
const order = new Order("1", "1", [item1, item2]);