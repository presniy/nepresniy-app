import { PaymentService } from '../../services/payment/payment.service.js';
import { EggService } from '../../services/egg/egg.service.js';

export class OrderForm {

    setup(product) {
        const elForm = document.querySelector('#frm-order');

        elForm.querySelector('.product__start-date').textContent = product.startDate;
        elForm.querySelector('.product__finish-date').textContent = product.finishDate;
        elForm.querySelector('.product__price').textContent = product.price;
        elForm.querySelector('input[name="productId"]').value = product.id;
        elForm.querySelector('.btn-submit').toggleAttribute('disabled', product.isOutOfDate);

        elForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const eggService = new EggService();
            const email = elForm.querySelector('input[name="email"]').value;
            const instagram = elForm.querySelector('input[name="instagram"]').value;
            const eggId = btoa([email, instagram].join('&'));
            const egg = await eggService.findOne(eggId);

            if (egg) {
                window.location.href = `${window.location.origin}/egg?id=${eggId}`;
                return;
            }

            const elInputs = Array.from(elForm.querySelectorAll('input'));
            const paymentRequest = elInputs.reduce((res, elInput) => ({ ...res, [elInput.name]: elInput.value }), {});

            const paymentService = new PaymentService();
            window.location.href = await paymentService.getPaymentUrl(paymentRequest);
        });
    }
}