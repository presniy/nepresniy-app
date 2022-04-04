import { EnvBanner } from './components/env-banner/env-banner.js';
import { OrderForm } from './components/order-form/order-form.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const orderForm = new OrderForm();
    orderForm.setup();
}