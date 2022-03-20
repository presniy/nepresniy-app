import { PaymentService } from './services/payment/payment.service.js';

main();

async function main() {
    const paymentService = new PaymentService();
    const elForm = document.querySelector('#frm-order');
    elForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const paymentUrl = await paymentService.getPaymentUrl();
        window.location.replace(paymentUrl);
    });
}