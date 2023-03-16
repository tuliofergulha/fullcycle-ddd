import EventHandlerInterface from "../../event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendConsoleLog3Handler implements EventHandlerInterface<CustomerChangedAddressEvent> {

    handle(event: CustomerChangedAddressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: 
        ${event.eventData.street}, ${event.eventData.number} - ${event.eventData.zip} - ${event.eventData.city}`);
    }
}