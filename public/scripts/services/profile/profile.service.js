import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class ProfileService {
    httpClient = new HttpService();

    me() {
        const { base, me } = env.bff.urls;
        return this.httpClient.get(`${base}${me}`);
    }
}