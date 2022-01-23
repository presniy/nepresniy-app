import { AuthService } from './services/auth/auth.service.js';
import { ProfileService } from './services/profile/profile.service.js';
import { env } from './env/env.js';

const authService = new AuthService();
const profileService = new ProfileService();

main();

async function main() {
    const hasProfile = Boolean(localStorage.getItem('profile'));

    if (hasProfile) {
        personalizePage();
        return;
    }

    const url = new URL(document.location);
    const authCode = url.searchParams.get('code');
    if (authCode) {
        try {
            await authService.auth(authCode);
            const profile = await profileService.me();
            localStorage.setItem('profile', JSON.stringify(profile));
            return;
        } catch (e) {
            console.error(e);
        }
    }

    showAuthDialog();
}

function personalizePage() {
    const profile = JSON.parse(localStorage.getItem('profile'));

    const elProfilePhoto = document.querySelector('.profile-photo');
    elProfilePhoto.setAttribute('data', profile.photoUrl);
    reloadElement(elProfilePhoto);

    const elGreeting = document.querySelector('.greeting');
    elGreeting.innerHTML = `${profile.name}, Вы`;
}

function reloadElement(el) {
    el.style.display = 'none';
    el.style.display = 'block';
}

function showAuthDialog() {
    const elAuthDialog = document.querySelector('.dialog');
    setupAuthUrl();
    elAuthDialog.classList.add('dialog_opened');
}

function setupAuthUrl() {
    const elBtnAuth = document.querySelector('.btn-auth');
    const { clientId, redirectUri, scope } = env.instagram.app;
    const authUrl = env.instagram.urls.auth.replace(':clientId', clientId)
        .replace(':redirectUri', redirectUri)
        .replace(':scope', scope);
    elBtnAuth.setAttribute('href', authUrl);
}