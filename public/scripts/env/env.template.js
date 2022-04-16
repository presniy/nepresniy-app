export const env = {
    app: {
        env: '${ENV_NAME}',
        productId: '28cb14dc-6adb-46db-ae84-5693f3d1777f',
        hideEnvBanner: '${HIDE_ENV_BANNER}' === 'true'
    },
    bff: {
        urls: {
            base: '${BFF_API_URL}/api',
            payments: '/payments',
            products: '/products',
            gifts: '/gifts',
            eggs: '/eggs'
        }
    }
};