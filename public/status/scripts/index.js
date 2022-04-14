import { EnvBanner } from '../../scripts/components/env-banner/env-banner.js';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component.js';
import { GiftService } from './services/gift/gift.service.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let gift
    try {
        const giftService = new GiftService();
        gift = await giftService.getGift(params.token);
    } catch (e) {
        window.location.href = window.location.origin;
        return;
    }

    const paymentSuccessComponent = new PaymentSuccessComponent();
    await paymentSuccessComponent.setup(gift);
}