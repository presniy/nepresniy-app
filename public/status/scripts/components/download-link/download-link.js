import { ProductService } from '../../services/product/product.service.js';

export class DownloadLink {

    constructor() {
        this.productService = new ProductService();
    }

    async setup() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        const product = await this.productService.getProduct(params.token);

        const elLink = document.querySelector('.action_type_download-recipe a');
        elLink.setAttribute('href', product.recipeUrl);
    }
}