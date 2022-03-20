export class HttpService {

    get(url) {
        return this.request(fetch(url));
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