import { EnvBanner } from '../../scripts/components/env-banner/env-banner.js';
import { EggService } from '../../scripts/services/egg/egg.service.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const eggService = new EggService();
    const egg = await eggService.findOne(params.id || '', { shouldNotify: true });

    if (egg) {
        document.querySelector('.content__header').textContent = egg.title;
        document.querySelector('.content__body').textContent = egg.content;
    }

    document.querySelector('.content').classList.remove('hidden');
}