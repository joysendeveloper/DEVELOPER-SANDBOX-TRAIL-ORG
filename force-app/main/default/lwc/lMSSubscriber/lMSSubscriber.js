import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SAMPLE_CHANNEL from '@salesforce/messageChannel/SampleChannel__c';

export default class LMSSubscriber extends LightningElement {
    @wire(MessageContext)
    messageContext;

    subscription = null;
    message = '';

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            SAMPLE_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.message = message.text;
        console.log('Message -> ', this.message);
    }
}