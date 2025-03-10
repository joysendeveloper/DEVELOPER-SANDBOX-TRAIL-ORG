import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import jsPDF from '@salesforce/resourceUrl/jsPDF';
import html2canvas from '@salesforce/resourceUrl/html2canvas';
import dompurify from '@salesforce/resourceUrl/DOMPurify';

export default class GeneratePDF extends LightningElement {
    jsPDFInitialized = false;
    // static renderMode = 'light';
    htmlContent = '<header style="margin: 0 0 3em;"><h1 style="background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase;">Invoice</h1><address contenteditable style="float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0;"><p style="margin: 0 0 0.25em;">Jonathan Neal</p><p style="margin: 0 0 0.25em;">101 E. Chapman Ave<br>Orange, CA 92866</p><p style="margin: 0 0 0.25em;">(800) 555-1234</p></address><span style="display: block; float: right; margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative;"><img alt="" src="http://www.jonathantneal.com/examples/invoice/logo.png" style="max-height: 100%; max-width: 100%;"><input type="file" accept="image/*" style="cursor: pointer; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%;"></span></header><article style="margin: 0 0 3em;"><h1 style="clip: rect(0 0 0 0); position: absolute;">Recipient</h1><address contenteditable style="float: left; font-size: 125%; font-weight: bold;"><p>Some Company<br>c/o Some Guy</p></address><table class="meta" style="float: right; width: 36%; margin: 0 0 3em;"><tr><th style="width: 40%; background: #EEE; border-color: #BBB; border-radius: 0.25em; border-style: solid; border-width: 1px; padding: 0.5em; text-align: left;"><span contenteditable>Invoice #</span></th><td style="width: 60%; border-color: #DDD; border-radius: 0.25em; border-style: solid; border-width: 1px; padding: 0.5em; text-align: left;"><span contenteditable>101138</span></td></tr><tr><th><span contenteditable>Date</span></th><td><span contenteditable>January 1, 2012</span></td></tr><tr><th><span contenteditable>Amount Due</span></th><td><span id="prefix" contenteditable>$</span><span>600.00</span></td></tr></table><table class="inventory" style="clear: both; width: 100%; font-size: 75%; table-layout: fixed; border-collapse: separate; border-spacing: 2px;"><thead><tr><th style="background: #EEE; border-color: #BBB; font-weight: bold; text-align: center; border-radius: 0.25em; border-style: solid; border-width: 1px; padding: 0.5em;"><span contenteditable>Item</span></th><th><span contenteditable>Description</span></th><th><span contenteditable>Rate</span></th><th><span contenteditable>Quantity</span></th><th><span contenteditable>Price</span></th></tr></thead><tbody><tr><td style="width: 26%; border-color: #DDD; border-radius: 0.25em; border-style: solid; border-width: 1px; padding: 0.5em;"><a class="cut" style="opacity: 0; position: absolute; top: 0; left: -1.5em; -webkit-transition: opacity 100ms ease-in;">-</a><span contenteditable>Front End Consultation</span></td><td style="width: 38%;"><span contenteditable>Experience Review</span></td><td style="text-align: right; width: 12%;"><span data-prefix="$"></span><span contenteditable>150.00</span></td><td style="text-align: right; width: 12%;"><span contenteditable>4</span></td><td style="text-align: right; width: 12%;"><span data-prefix="$"></span><span>600.00</span></td></tr></tbody></table><a class="add" style="border-width: 1px; display: block; font-size: .8rem; padding: 0.25em 0.5em; float: left; text-align: center; width: 0.6em; background: #9AF; box-shadow: 0 1px 2px rgba(0,0,0,0.2); background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%); background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%); border-radius: 0.5em; border-color: #0076A3; color: #FFF; cursor: pointer; font-weight: bold; text-shadow: 0 -1px 2px rgba(0,0,0,0.333);">+</a><table class="balance" style="float: right; width: 36%;"><tr><th style="width: 50%;"><span contenteditable>Total</span></th><td style="text-align: right; width: 50%;"><span data-prefix="$"></span><span>600.00</span></td></tr><tr><th><span contenteditable>Amount Paid</span></th><td><span data-prefix="$"></span><span contenteditable>0.00</span></td></tr><tr><th><span contenteditable>Balance Due</span></th><td><span data-prefix="$"></span><span>600.00</span></td></tr></table></article><aside style="margin: 0 0 3em;"><h1 style="border: none; border-width: 0 0 1px; margin: 0 0 1em; border-color: #999; border-bottom-style: solid;"><span contenteditable>Additional Notes</span></h1><div contenteditable><p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p></div></aside>'; // Replace with API response
    


    renderedCallback() {
        if (!this.jsPDFInitialized) {
            this.jsPDFInitialized = true;
            Promise.all([
                loadScript(this, jsPDF),
                loadScript(this, html2canvas),
                loadScript(this, dompurify)
            ])
            .then(() => {
                console.log('Libraries loaded successfully');
                console.log('this.jsPDFInitialized -> ', this.jsPDFInitialized);
            })
            .catch((error) => {
                console.error('Error loading libraries', error);
            });
        }
    }

    generatePDF() {
        console.log('1');
            const container = this.template.querySelector('.pdf-content');
            container.innerHTML = this.htmlContent;
        console.log('2');
        console.log('this.jsPDFInitialized -> ', this.jsPDFInitialized);
        if (this.jsPDFInitialized) {

            const doc = new window.jspdf.jsPDF();
            
            doc.html(container, {
                callback: function (doc) {
                    doc.save();
                }
            });

            // doc.text('Opportunity Report', 70, 20);
            //Image in base64 format
            // const imgData = 'data:image/png;base64,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';
            // doc.addImage(imgData, 'png', 140, 25, 55, 35);
            // doc.setLineWidth(2);
            // doc.setFontSize(14);
            // doc.save("OpportunityReport.pdf");
            
            // doc.setFontSize(18);
            // doc.text('Invoice', 105, 20, null, null, 'center');
            // doc.setLineWidth(0.5);
            // doc.line(20, 25, 190, 25);
            // doc.setFontSize(12);
            // doc.text('Bootdey.com', 20, 35);
            // const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASgAAAFHCAYAAAASpdGWAAAACXBIWXMAACxKAAAsSgF3enRNAAARwElEQVR4nO3dT2wc53nH8Z8U2pZjhWQSKFm5SbkuiAqNAnO37cWBC23gS2/iMYM9iLrwauaai6l7AdNXokAotItpkINXCJBTUy0PcYsCxS6LJkgKtV2ibkpHSErKtCJFltjDzJpLkVzO7J95n5n3+wEWXlK73Eew9NXM7Lsz5w4ODjSK0nq7Jql3K0uaG+kHwrm3PtnWF377n3q695H273/oehzYtiWpI6klqRmGjd1x/vBzwwSqtN6elbQiaUkEqTD+8sG/6/y9n+p3e79xPQry67ak1TBsdMfxw1IHqrTeXpS0JsJUGPOf7uvqf/y9HvzqnutRUBy3wrCxOuoPSRWo0np7TdLbo74o7Kj+/re69C9/pyePHroeBcVzR9LSKLt9iQNVWm9vSLox7AvBHuKEDGxJqg0bqfNJHkScimf22e+JE7KwIGlj2CefGajSentFxKlwrnV/QpyQletBUF8Z5okDd/FK6+2ypP8acigY9dYn23r2zz90PQb8siepkvbdvbO2oDaGnQZ2vfTLf3A9AvwzI2k17ZNODVRpvV2RdG2EgWDQW59ss84JrtwIgno5zRMGbUENtc8I2y5+9HPXI8Bvi2kePChQqX4Q8uHB9s9cjwC/jR6oePduZizjwIw3H+24HgFIddjotC2oyhgGgTFf+vh/XI8AKAjqtaSPPS1Q5bFMAlPOP3rgegQglUQryVEMBw/3XI8ASCk2gAgUgKyVkz6QXTwAZhEoAGaxiwfALAIFwCwCBcAsAgUga+WkDyRQALJWTvpA3sUDYNZpgeKSUgCcYxcPgFmnBWo70ykA4ASnBaqb5RAAvJL4GnkECkDWOkkfeFqgEv8AAEiplfSBU6d8vynp3bGMAhTfto7udXR0fDemq9H2TMo6vvynImm27+tZRVfytWwvDButpA8+MVA7y9Vuab29Jfu/WWBS9nS4J9GK/9vVYWQ6YdhIfCwla0FQ78Wr/NzN9fUG1tI8+LQtKCm6aCdbUQXy7Mkj1yNY0tvqOXZLe/Vbi8KwMfAwTXxe8FlFwerdJr3+cSsMG6tpnnBWoFbF1V0KY//+h65HyFovQr1drpak3bP+8vqgbzer2f/9OFy9YNU0vmjtSVpK+6RzBwcHp/5iab29KumdoUeCKd+++1euR5iULR2GqKNoK8j7CI1DENRnFYWqF6xhrja+JWlxmC3TswI1q+h/PFtRBVCgQO0p+pe/GYaN5lkPxnjFW1mLioI16Dj1lqS1MGxsDPtaAwMlSaX19qKk94d9AdhRgEDtKTrIumb5ALVv+q5zV9HhGwtjeRPhzEBJUmm9vSHpxqgvBrdyHqg7klaKcAAbyQ06SN5vRVEdWXYAF74bho1Ub0+jGBKdzWBnubqraH+TKz8iazeJk78Sn26lL1Kc6QBZuTnKAVbkX6rzQe0sVzuKdvW2JjMO8Jn3iBNSn7BuZ7m6u7NcrUi6NYF5AClacbziegi4N/QZNXeWq6uSqpI2xzYNEFlyPQBsGOmUvzvL1c7OcrUm6TVJ74njUxjdbVaBoyfpMoOBdparXUVLEVZK6+2yooPpvRsXYEAaq64HgB2JFmqOIg5W73M8FQ33WR4cnv6jq8NTfpSVYn1aDhZqboVho+J6CNgxli2oQeKtq676PjVdWm/3Pi1d1mG4+Lzf8U/fdyTt7ixXW4OeFH9mclHR1keet1j5XB2OmPgWVFLxX7JetMo6PFtgkba4em8o9ALU7d3ikI9s0BkocrAF9e00Z1tE8ZkJ1FlK6+1afLf/NKe1voe4CFn/O5i9LZ7n748tPknFW6gtPbdVaj1QYdg453oG2JKbQKUV/yWdPfOByWUemlGcFCkChbyZ+DEoV+JV797aWa52SuvtJXGqHOQYlz4vsJ3lalPSbddzAMMiUMW36noAYFgEquDi42ZsRSGXCJQfWF+EXCJQHoiPRQG5Q6D8wVknkDsEyh9eL7tAPhEof3CZJuQOgQJg1okryfsuxGfd7rAnN3vp+/d6H07Og+7jm/Nd10MAWTvtoy53M51ieJs6+oHhNCrKz+/zllhwCQ+xiwfALAIFwCwCBcAsAgXALAIFwCwCBcAsAgXALAIFwCwCBcAsAgXALAIFwCwCBcAsAgXALAIFwCwCBcAsAgXALAIFwCwC5Yk/evrJBdczAGkRKE9c2f/vkusZgLQIFACzCBQAswgUALMIFACzCBQAswgUALMIFACzCJQnnkxdmHc9A5AWgfLEs3PnL7qeAUiLQAEwi0ABMItAATCLQAEwi0ABMItAATCLQAEwi0DBjCCoz7qeAbYQKFhScT0AbCFQAMwiUADMIlAAzCJQAMyaOuX7m5lOMbzOCM/dVX5+n13XA2Rh5sobFUkt13PAjhMDFYaNWsZzZO7xzfmOpJrrOQCcjl08AGYRKABmESgAZhEoAGYRKABmESgAZhEoAGYRKABmESgAZhEoAGYRKABmESgAZhEoAGaddrqVwotP0J+Xc2B3w7DRdT0EkguCellS/006evaMa0P82C1FpwmSolMN7So6FU9XUicMG7snPy2/vA2UojjddT1EQrckrboeAscFQb2mwwj17s9N6OUW+u4fC1wQ1KXoHGddRQHrhGGjNaFZMuFzoIBU4hhV+m4LA5/gxrX4dkM6Eq2OopMBtvK0pUWgYMbB/v151zP0xIcAan03izFKqhettyUpCOqbkpqSmtYPHRAomPFkf9dZoAoWpLP0gvVuENS3FcVqIwwbo5xCeyIIFMx49PH/vZnl6wVBvSJpUVGQhjloXQRziras3g6C+pakDUWxMrEbSKBgxsGzp68EQX0pDBsbk3qNIKgv6jBKkzqYnVcLkt5VtGV1W1GoWi4HIlCwZi0I6s1x/Qse77r1onR9HD/TEzck3Yh3AVcn+Y/GIATKEy8/2rvw0PUQycxIagVBvTZspIjSWM1J+n4Q1FcV7f6tZbn7R6A88cKjBxdcz5DCgqJILSZ9l4koTdycpHckrQRBfU0ZhYpAwaoFSZ0gqG/olHeY4tXaNRGlLM3oMFSrYdhYm+SLEShYNqPDd5ikw496zKrYywDyYEbRwfQVSSth2GhO4kX4sDDyZEHRcgDiZMecpPeDoN6Kl22MFYECMA7XJLXjg+ljQ6AAjNM7QVBvxm9ajIxAeeLZ56bG8gcGSOC6ondhR/4zR6B8cX5qxvUI8EpvqchIkSJQACZl5EgRKACTtKDobAlDIVAAJu1avPo8NQIFIAtvx2eSSIVAAcjKRtrjUQQKQFZmFJ0RITECBSBL19Ps6hEoAFlLfMCcQAHI2lzSz+wRKAAurCQ5YE6gALgwI2nlrAcRKACuLJ31AAIFwJW5IKgvDXoAgQLg0sAlBwQKgEvXBx0sJ1AAXDt1K4pAAXCNQAEwq3baLxAoAK7NxBdhPYZAAbCgfNI3CRQAC0686CeBAmDBiUsNCBQAswgUALOmXA8AeGaz7343viVVjm/XxjaNcQQKGK9NSbuSOjoMUDcMG91xvkh82txFSTfG+XOt8TlQXUm3XA+RUMv1ADhmS4cRamkCERokDBtNSc34zJRrkq5n9doTcuK7eN4GKv7DtOp4DOTDnqIIdSS1wrDRcjpNn/jP8WJ82pI1RSeCy6MT38XzNlDAANuKgtRSFKSuy2GSCMPGRhDUO4pmzmukjiFQwOEWUlM5CdJJwrDRCYJ6TQWKFIGCr7YU/UXeCMNGx/EsY1O0SBEo+OSOcr6VlEQcqSVJ77ueZVQECkXWv+vWDMPGrttxshOGjWYQ1O8o5+/uESgU0W1FQWq6HsSxJUXLIPKwq8eHhVFodyTdlPTFMGwsEScp3mJMfJlxx06MKFtQyLMtRX8Bvdp9S2lN0juuhxgWgfLE+U8fux5hXLYlbSh6963rdhT7wrCxGwT128rpR2IIlCcOHvza9Qij2FN0oHutSEsCMtQUgQLGblPRltKG4zlyLX5Hz/UYQyFQsIZduMnYVA5P00KgYML03FU9nb78g7/+3s3vuJ6loLoyHqggqFee34UnUHDm5Zkva+rrr+vnX7yie1MXJekXrmcqsK7rARI4dkYDAuWB0np79voLL7ke4zPTc1e1/9Vv6MevzLkeBcYRKD9UDr7wFUk/czbACVtLwJkIlCeefu5FJ687/eq8Hl/+hn48/cdOXh/5RqA88cvp1/T1jF7rhQuf1+fLFf3bpdfZWrKjpRyuKCdQnrg3dVF/culr2r//4cRe4+Klr+nJH/6p/uliWbvn3WyxoVgIlEcevvaGdP+HY/+5M/N/pu2vLujui18a+8+GVyp67gIhBMojP3llTtfnrurB9ugHy1+e+bLOlf9cP529wtYSxoVlBr7bLL+lv3i4N/Su3vTcVf3m1aruXiiNeTLgOALlmd3zL+pH3/yOFv/3A+394oNEz2GJAFwhUJ5qXv6W5i+9rm/e/1cdPPi1Hvzq3pFfn351Xuemv6KPp/+ABZVwhkB57N7URd27/C3psqQrrqcBjuOUvwDMIlAArDh24QQCBfih63qABI4tMyBQgAfyevI/AgXALAIFwCwCBcAsAgXALAIFwAqWGQAwa+b5bxAoAGYRKABmESgAZhEowB9brgdIi0AB/th1PUBaBAqAGUFQP7LUgEABsOTIGQ0IFACzCBQAswgUALMIFACzCBQAswgUAEvK/V8QKACWlPu/IFCAP1quB0iLQAEwi0ABMItAATCLQAEwi0ABsKTc/wWBgiU11wPAuXL/FwQKgFkEyg9l1wMAwyBQfii7HgAYBoEC/ME5yQGY1XE9QFoECoAl5f4vCBQAS+b6vyBQAMwiUADMIlAAzCJQAMwiUADMIlAATAmCerl3n0ABsKbcu0OgAJhFoABPhGGj5XqGtAgUALMIFACzCBQAswgUAGvKvTsECoA15d4dAgXALAIFwCwCBcAsAgXALAIFwCwCBfhly/UACZR7dwgU4Jc8XBuv3LtDoACYRaAAmEWgAJhFoACYRaAAmEWgAFhT7t0hUACsmevdIVAAzCJQAMwiUIBfuq4HSINAAX7puh4gDQIF+KXmeoA0CBQAc4KgPisRKMA3FdcDJFSRCJQvZl0PAPeCoF6WNON6jjQIlB/y8q8mJqvmeoC0CBTgj0XXA6RFoAAPxLt3113PkRaBAvyw6nqAYRAooODiracbrudIiWUGgCeargcYAssMgKILgvqGpAXXcwyLQAEFFccpb7t2RxAooICKECdJmnI9AIDxCYJ6TdKacrxb149AAQUQh2lFOVzrNAiBAjIUBPWKkn02sv9xHR2/ZPls/JiKoo+w5OozdgnMSgQKSC1eV1SOv+y/34uG+n5tThhGRSJQwBHxrpJ0uAVT1mGArmU/kd8IFLzSF6Dn/0t8DCJQKJw4Qr3drXJ8q6h4x2kKj0DBktTnrYqPBy3GNyJUMAQKliSOS7yVtCp2zQqNQCFX4rfp10SYio6zGSBfgqC+Iqkt4uSDBYktKOREUT5bhnTYgoJ5xMlfBAqmESe/ESiYFQT1JREnrxEomBSvb1pzPQfcIlCwakMsuvRaENRnCRTMiRdhspQAFQIFi1ZcDwAbCBRMyesVcDEZBArWLLoeAHYQKFhDoPAZAgVrODiOzxAomDH/6b7rEWALywxgR4lA4SiWGQCwi0ABMItAATCLQAEwi0ABMItA+WHW9QDAEFhm4IkF1wMAQ2CZAQC7CBQAswgUALMIFACzCBQAswgUAKtYZgDArAUCBcAsAgXAqk0C5Ydt1wMAwyBQfui6HgAYQotA+aHlegBgCE0C5YcN1wMAKW2FYaNDoDyws1ztStp0PQeQwprEMSifrLgeAEhoMwwbGxKB8sbOcrUj6ZbrOYAz7Ela6n1BoDyys1xdlXTb9RzAAEth2Oj2viBQntlZri6JSMGePUk3w7DR7P8mgfJQHKnvup4DiG1LqvWOO/UjUJ7aWa6uSXpNvLsHt96TVAnDRuekXzx3cHCQ8TywprTerih6l29R0oyrOd58tKMX/vFvXb08srOnaG3eWv/xppMQKBxRWm/XJFUkleP/ZuaNxx9dvPDB3+xn+ZrITFdSR1LrtK2lk/w/ufkdU/36mUwAAAAASUVORK5CYII=';
            // doc.addImage(imgData, 'png', 165, 35, 15, 15);
            // doc.setFontSize(10);
            // doc.text('Maxwell admin Inc, 45 NorthWest Street.\nSunrise Blvd, San Francisco.\n00000 00000', 20, 40);
            // doc.text('Bill To:', 20, 65);
            // doc.text('Alex Maxwell\n150-600 Church Street\nFlorida, USA', 20, 70);
            // doc.text('Invoice Number: #009', 150, 65);
            // doc.text('Date: January 10th 2020', 150, 70);
            // doc.setFontSize(12);
            // doc.text('Items', 20, 90);
            // doc.text('Product ID', 90, 90);
            // doc.text('Quantity', 130, 90);
            // doc.text('Sub Total', 160, 90);
            // doc.line(20, 92, 190, 92);
            // const items = [
            //     { description: 'Wordpress Template', id: '#50000981', qty: 9, price: '$5000.00' },
            //     { description: 'Maxwell Admin Template', id: '#50000126', qty: 5, price: '$100.00' },
            //     { description: 'Unify Admin Template', id: '#50000821', qty: 6, price: '$49.99' }
            //   ];
              
            //   let yPosition = 100;
            //   items.forEach(item => {
            //     doc.text(item.description, 20, yPosition);
            //     doc.text(item.id, 90, yPosition);
            //     doc.text(item.qty.toString(), 130, yPosition);
            //     doc.text(item.price, 160, yPosition);
            //     yPosition += 10;
            //   });
            //   doc.line(20, yPosition, 190, yPosition);
            //   yPosition += 10;
            //   doc.text('Subtotal', 130, yPosition);
            //   doc.text('$5000.00', 160, yPosition);
            //   yPosition += 10;
            //   doc.text('Shipping & Handling', 130, yPosition);
            //   doc.text('$100.00', 160, yPosition);
            //   yPosition += 10;
            //   doc.text('Tax', 130, yPosition);
            //   doc.text('$49.00', 160, yPosition);
            //   yPosition += 10;
            //   doc.setFontSize(12);
            //   doc.text('Grand Total', 130, yPosition);
            //   doc.text('$5150.99', 160, yPosition);
            //   doc.setFontSize(10);
            //   doc.text('Thank you for your Business.', 105, yPosition + 20, null, null, 'center');
            //   doc.save('Invoice.pdf');


        } else {
            console.error('jsPDF library not initialized');
        }
    }
}