import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class EggService {

    constructor() {
        this.httpClient = new HttpService();
    }

    async findOne(id, { shouldNotify } = {}) {
        const { base, eggs } = env.bff.urls;
        try {
            return await this.httpClient.get(`${base}${eggs}/${id}${shouldNotify ? '?notify=true' : ''}`);
        } catch (e) {
            return undefined;
        }
    }
}