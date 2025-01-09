import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleChannel__c';


export default class LMSPublisher extends LightningElement {
    @wire(MessageContext)
    messageContext;
    count = 1;

    handlePublish() {
        const message = { text: 'Hello from LMS Publisher! ' + this.count++ };
        publish(this.messageContext, SAMPLE_CHANNEL, message);
    }
}