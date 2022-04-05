import { EnvBanner } from '../../scripts/components/env-banner/env-banner.js';
import { DownloadLink } from './components/download-link/download-link.js';

main();

async function main() {
    const envBanner = new EnvBanner();
    envBanner.setup();

    const downloadLink = new DownloadLink();
    await downloadLink.setup();
}