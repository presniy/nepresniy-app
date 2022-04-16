import { EnvBanner } from '../../scripts/components/env-banner/env-banner.js';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component.js';
import { GiftService } from './services/gift/gift.service.js';
import { PaymentFailComponent } from './components/payment-fail/payment-fail.component.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let gift;
    try {
        const giftService = new GiftService();
        gift = await giftService.getGift(params.token);
    } catch (e) {
        const paymentFailComponent = new PaymentFailComponent();
        paymentFailComponent.setup(e);
        return;
    }

    const paymentSuccessComponent = new PaymentSuccessComponent();
    paymentSuccessComponent.setup(gift);
}