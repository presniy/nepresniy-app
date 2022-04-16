export class PaymentSuccessComponent {

    setup(gift) {
        const elPaymentSuccess = document.querySelector('.content_type_payment-success');
        elPaymentSuccess.classList.remove('hidden');
        const elWaitStatus = document.querySelector('.content_type_wait-status');
        elWaitStatus.classList.add('hidden');

        const elLink = elPaymentSuccess.querySelector('.recipe-download-link');
        elLink.setAttribute('href', gift.recipeUrl);
    }
}