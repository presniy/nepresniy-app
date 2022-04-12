import { EnvBanner } from '../../scripts/components/env-banner/env-banner.js';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component.js';
import { ProductService } from './services/product/product.service.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    let product
    try {
        const productService = new ProductService();
        product = await productService.getProduct(params.token);
    } catch (e) {
        window.location.href = window.location.origin;
        return;
    }

    const paymentSuccessComponent = new PaymentSuccessComponent();
    await paymentSuccessComponent.setup(product);
}