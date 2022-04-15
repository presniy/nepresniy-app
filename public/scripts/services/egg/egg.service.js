import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class EggService {

    constructor() {
        this.httpClient = new HttpService();
    }

    async findOne(id) {
        const { base, eggs } = env.bff.urls;
        try {
            return await this.httpClient.get(`${base}${eggs}/${id}`);
        } catch (e) {
            return undefined;
        }
    }
}