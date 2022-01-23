import { HttpService } from '../http/http.service.js';
import { env } from '../../env/env.js';

export class AuthService {
    httpClient = new HttpService();

    async auth(authCode) {
        const { base, auth } = env.bff.urls;
        const url = `${base}${auth}`.replace(':code', authCode);

        const { token } = await this.httpClient.post(url);
        localStorage.setItem('token', token);
    }
}