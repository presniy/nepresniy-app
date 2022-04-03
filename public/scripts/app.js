import { PaymentService } from './services/payment/payment.service.js';
import { env } from './env/env.js';

main();

async function main() {
    setupEnvBanner();
    setupOrderForm();
}

function setupEnvBanner() {
    if (env.app.hideEnvBanner) {
        return;
    }

    const elEnvBanner = document.querySelector('.env-banner');
    elEnvBanner.addEventListener('click', () => elEnvBanner.remove());
    elEnvBanner.classList.add(`env-banner_type_${env.app.env}`);
    elEnvBanner.innerHTML = `${env.app.env} environment`
}

function setupOrderForm() {
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