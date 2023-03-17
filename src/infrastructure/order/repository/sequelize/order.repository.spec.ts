
import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Order from "../../../../domain/checkout/entity/order";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderModel from "./order.model";

describe("Order repository test", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequilize.addModels([OrderModel, OrderItemModel, ProductModel, CustomerModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "12345-678", "São Paulo");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "oi1",
            product.id,
            product.name,
            product.price,
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId,
                },
            ],
        });
    });

    it("should update a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "12345-678", "São Paulo");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        await productRepository.create(product1);
        const product2 = new Product("p2", "Product 2", 5);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "oi1",
            product1.id,
            product1.name,
            product1.price,
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem1]);
        await orderRepository.create(order);

        const orderItem2 = new OrderItem(
            "oi2",
            product2.id,
            product2.name,
            product2.price,
            5
        );

        order.addItem(orderItem2);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    order_id: order.id,
                    product_id: orderItem1.productId,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId,
                },
            ],
        });
    });

    it("should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "12345-678", "São Paulo");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("p1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "oi1",
            product.id,
            product.name,
            product.price,
            2
        );

        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);

        expect(order).toStrictEqual(orderResult);
    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("not-found-id");
        }).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "12345-678", "São Paulo");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        await productRepository.create(product1);
        const product2 = new Product("p2", "Product 2", 5);
        await productRepository.create(product2);
        const product3 = new Product("p3", "Product 3", 50);
        await productRepository.create(product3);

        const orderItem1 = new OrderItem(
            "oi1",
            product1.id,
            product1.name,
            product1.price,
            2
        );

        const orderItem2 = new OrderItem(
            "oi2",
            product2.id,
            product2.name,
            product2.price,
            5
        );

        const orderItem3 = new OrderItem(
            "oi3",
            product3.id,
            product3.name,
            product3.price,
            2
        );

        const orderRepository = new OrderRepository();
        const order1 = new Order("o1", customer.id, [orderItem1]);
        const order2 = new Order("o2", customer.id, [orderItem2, orderItem3]);
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);        
    });
});