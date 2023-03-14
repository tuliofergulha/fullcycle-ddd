import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("1", "Túlio Fergulha")
const address = new Address("Rua dois", 2, "12345-678", "São Paulo")
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);
const order = new Order("1", "1", [item1, item2]);