import { EnvBanner } from './components/env-banner/env-banner.js';
import { OrderForm } from './components/order-form/order-form.js';
import { ProductService } from './services/product/product.service.js';
import { env } from './env/env.js';
import { InfoSection } from './components/info-section/info-section.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const productService = new ProductService();
    const product = await productService.findOne(env.app.productId);

    document.querySelector('.sections-container').classList.remove('hidden');
    document.querySelector('footer').classList.remove('hidden');

    const infoSection = new InfoSection();
    infoSection.setup(product);

    const orderForm = new OrderForm();
    orderForm.setup(product);
}