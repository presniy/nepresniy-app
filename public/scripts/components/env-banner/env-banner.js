import { env } from '../../env/env.js';

export class EnvBanner {

    setup() {
        if (env.app.hideEnvBanner) {
            return;
        }

        const elEnvBanner = document.querySelector('.env-banner');
        elEnvBanner.addEventListener('click', () => elEnvBanner.remove());
        elEnvBanner.classList.add(`env-banner_type_${env.app.env}`);
        elEnvBanner.innerHTML = `${env.app.env} environment`
    }
}