export const env = {
    app: {
        env: '${ENV_NAME}',
        hideEnvBanner: '${HIDE_ENV_BANNER}' === 'true'
    },
    bff: {
        urls: {
            base: '${BFF_API_URL}/api',
            payment: '/payment'
        }
    }
};