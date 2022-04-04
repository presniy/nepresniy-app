import { EnvBanner } from './components/env-banner/env-banner.js';

main();

function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();
}