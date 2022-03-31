import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class PaymentService {

    constructor() {
        this.httpClient = new HttpService();
    }

    async getPaymentUrl(paymentRequest) {
        const { base, payment } = env.bff.urls;
        const queryStr = Array.from(Object.entries(paymentRequest))
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        const result = await this.httpClient.get(`${base}${payment}?${queryStr}`);
        return result.confirmation.confirmation_url;
    }
}