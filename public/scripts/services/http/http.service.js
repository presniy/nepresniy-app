export class HttpService {

    get(url) {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        return this.request(fetch(url, { headers }));
    }

    post(url) {
        return this.request(fetch(url, { method: 'POST' }));
    }

    request(fetchRequest) {
        return fetchRequest.then(async (response) => {
            const payload = await response.json();

            if (response.ok) {
                return payload;
            }

            throw new Error(`${response.statusText}: ${JSON.stringify(payload)}`);
        });
    }
}