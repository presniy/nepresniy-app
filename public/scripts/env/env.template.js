export const env = {
    app: {
        env: '${ENV_NAME}'
    },
    bff: {
        urls: {
            base: '${BFF_API_URL}/api',
            payment: '/payment'
        }
    }
};