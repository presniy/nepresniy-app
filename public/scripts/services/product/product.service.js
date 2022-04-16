import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class ProductService {

    constructor() {
        this.httpClient = new HttpService();
    }

    async findOne(id) {
        const { base, products } = env.bff.urls;
        try {
            return await this.httpClient.get(`${base}${products}/${id}`);
        } catch (e) {
            return undefined;
        }
    }
}