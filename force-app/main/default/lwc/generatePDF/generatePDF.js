import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import jsPDFLibrary from '@salesforce/resourceUrl/jsPDF';
import html2canvasLibrary from '@salesforce/resourceUrl/html2canvas';
import dompurifyLibrary from '@salesforce/resourceUrl/DOMPurify';

export default class GeneratePDF extends LightningElement {

    jsPDFInitialized = false;
    htmlContent = '<h1>Hello, World!</h1><p>This is a sample PDF generated from HTML content.</p>'; // Replace with API response

    renderedCallback() {
        if (!this.jsPDFInitialized) {
            this.jsPDFInitialized = true;
            Promise.all([
                loadScript(this, jsPDFLibrary),
                loadScript(this, html2canvasLibrary),
                loadScript(this, dompurifyLibrary)
            ])
            .then(() => {
                console.log('jsPDFLibrary -> ', jsPDFLibrary);
                console.log('html2canvasLibrary -> ', html2canvasLibrary);
                console.log('dompurifyLibrary -> ', dompurifyLibrary);
                console.log('Libraries loaded successfully');
            })
            .catch((error) => {
                console.error('Error loading libraries', error);
            });
        }
    }

    generatePDF() {
        console.log('Generate PDF');
        console.log('this.jsPDFInitialized -> ', this.jsPDFInitialized);
        if (this.jsPDFInitialized) {
            // Insert the HTML content into a container element
            const container = this.template.querySelector('#pdf-content');
            container.innerHTML = this.htmlContent;
            console.log('container -> ', container);
            console.log('this.htmlContent -> ', this.htmlContent);
            console.log('container.innerHTML -> ', container.innerHTML);
            
            console.log('Generate PDF 1');
            const doc = new window.jspdf.jsPDF();
            console.log('doc -> ', doc);

            doc.html(container, {
                callback: function (doc) {
                  doc.save('sample.pdf');
                  console.log('Generate PDF 1 - Saved PDF to sample.pdf');
                }
             });


            // doc.html(container, {
            //     callback: function (doc) {
            //         console.log('Generate PDF 2');
            //         doc.save('sample.pdf');
            //     },
            //     x: 10,
            //     y: 10
            // });
        } else {
            console.error('jsPDF library not initialized');
        }
    }
}