import { PaymentService } from '../../services/payment/payment.service.js';

export class OrderForm {

    setup() {
        const paymentService = new PaymentService();
        const elForm = document.querySelector('#frm-order');
        elForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const elInputs = Array.from(elForm.querySelectorAll('input'));
            const paymentRequest = elInputs.reduce((res, elInput) => ({ ...res, [elInput.name]: elInput.value }), {});

            const paymentUrl = await paymentService.getPaymentUrl(paymentRequest);
            window.location.replace(paymentUrl);
        });
    }
}