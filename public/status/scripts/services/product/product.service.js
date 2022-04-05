import { HttpService } from '../../../../scripts/services/http/http.service.js';
import { env } from '../../../../scripts/env/env.js';

export class ProductService {

    constructor() {
        this.httpClient = new HttpService();
    }

    getProduct(token) {
        const url = `${env.bff.urls.base}${env.bff.urls.product}?token=${token}`;
        return this.httpClient.get(url);
    }
}