import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class PaymentService {

    constructor() {
        this.httpClient = new HttpService();
    }

    async getPaymentUrl() {
        const { base, payment } = env.bff.urls;
        const result = await this.httpClient.get(`${base}${payment}`);
        return result.confirmation.confirmation_url;
    }
}