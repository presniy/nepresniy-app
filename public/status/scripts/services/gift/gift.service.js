import { HttpService } from '../../../../scripts/services/http/http.service.js';
import { env } from '../../../../scripts/env/env.js';

export class GiftService {

    constructor() {
        this.httpClient = new HttpService();
    }

    getGift(id) {
        const url = `${env.bff.urls.base}${env.bff.urls.gifts}/${id}`;
        return this.httpClient.get(url);
    }
}