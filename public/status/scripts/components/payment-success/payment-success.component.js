export class PaymentSuccessComponent {

    async setup(gift) {
        const elPaymentSuccess = document.querySelector('.content_type_payment-success');
        elPaymentSuccess.classList.remove('hidden');
        const elWaitStatus = document.querySelector('.content_type_wait-status');
        elWaitStatus.classList.add('hidden');

        const elLink = document.querySelector('.recipe-download-link');
        elLink.setAttribute('href', gift.recipeUrl);
    }
}