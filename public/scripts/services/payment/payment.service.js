import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class PaymentService {

    constructor() {
        this.httpClient = new HttpService();
    }

    async getPaymentUrl(paymentRequest) {
        const { base, payments } = env.bff.urls;
        const queryStr = Array.from(Object.entries(paymentRequest))
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        const result = await this.httpClient.post(`${base}${payments}?${queryStr}`);
        return result.confirmation.confirmation_url;
    }
}