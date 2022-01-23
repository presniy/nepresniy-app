export const env = {
    instagram: {
        app: {
            clientId: '1097997194309214',
            redirectUri: 'https://presniy.ru/',
            scope: 'user_profile'
        },
        urls: {
            auth: [
                'https://api.instagram.com/oauth/authorize',
                '?client_id=:clientId',
                '&redirect_uri=:redirectUri',
                '&scope=:scope',
                '&response_type=code'
            ].join('')
        }
    },
    bff: {
        urls: {
            base: 'http://localhost:3000/api',
            auth: '/auth?code=:code',
            me: '/user/me',
            payment: '/payment'
        }
    }
};