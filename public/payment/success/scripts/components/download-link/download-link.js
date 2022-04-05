export class DownloadLink {

    setup() {
        const elLink = document.querySelector('.action_type_download-recipe a');
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        elLink.setAttribute('href', decodeURIComponent(params.recipeUrl));
    }
}