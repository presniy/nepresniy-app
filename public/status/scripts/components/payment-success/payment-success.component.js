export class PaymentSuccessComponent {

    setup(gift) {
        const elPaymentSuccess = document.querySelector('.content_type_payment-success');
        elPaymentSuccess.classList.remove('hidden');
        const elWaitStatus = document.querySelector('.content_type_wait-status');
        elWaitStatus.classList.add('hidden');

        const { recipeUrl, product } = gift;

        elPaymentSuccess.querySelector('.product__offer-name').textContent = product.offerName;
        elPaymentSuccess.querySelector('.product__bonus-recipe-name').textContent = product.bonusRecipeName;

        const elLink = elPaymentSuccess.querySelector('.recipe-download-link');
        elLink.setAttribute('href', recipeUrl);
    }
}