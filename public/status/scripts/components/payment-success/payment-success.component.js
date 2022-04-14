export class PaymentSuccessComponent {

    async setup(gift) {
        const elPaymentSuccess = document.querySelector('.content_type_payment-success');
        elPaymentSuccess.classList.remove('hidden');
        const elWaitStatus = document.querySelector('.content_type_wait-status');
        elWaitStatus.classList.add('hidden');

        const elLink = document.querySelector('.action_type_download-recipe a');
        elLink.setAttribute('href', gift.recipeUrl);
    }
}