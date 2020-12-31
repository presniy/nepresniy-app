const url = window.location.href;
const [, queryString] = url.split('?');
const rawParams = queryString.split('&');
const params = rawParams.reduce(
    (prev, current) => {
        const [key, value] = current.split('=');

        return {
            ...prev,
            [kebabCaseToCamelCase(key)]: decodeURIComponent(value)
        };
    },
    {}
);
console.log('params:', params);

const products = new Map([
    [
        1,
        {
            id: 1,
            title: 'Рецептура безглютенового торта «Вайолет»',
            price: 700,
            image: './assets/products/product-01-cake-violet.jpg',
            content: 'https://docs.google.com/document/d/1qZU_R2WPdh88fBCMqF3P2ZzzDypS7XDlxfmM0Hrgo1M/edit?usp=sharing'
        }
    ],
    [
        2,
        {
            id: 2,
            title: 'Вторая половину книги (23 изделия)',
            price: 14500,
            image: './assets/products/product-02-the-part-2-of-the-book.jpg',
            content: 'https://drive.google.com/drive/folders/1NOPuirkPn3C9tmCGJxipaoYDiQX9EPIA?usp=sharing'
        }
    ],
    [
        3,
        {
            id: 3,
            title: 'Полное собрание рецептур «46 недель» (46 изделий)',
            price: 22100,
            image: './assets/products/product-03-the-whole-book.jpg',
            content: 'https://drive.google.com/drive/folders/1dvydeNf4EK1QvBFopyHHo8YNyKVBYBQZ?usp=sharing'
        }
    ]
]);
console.log();

const productId = Number(params.productId);
const product = products.get(productId);
console.info('product:', product);

linkProductToTheCard(product);

function kebabCaseToCamelCase(str) {
    return str.replace(new RegExp('-[a-z]', 'g'), value => value[1].toUpperCase());
}

function linkProductToTheCard(product) {
    const productImageEl = document.querySelector('.product__image');
    productImageEl.setAttribute('src', product.image);
    productImageEl.setAttribute('alt', product.title);

    const productTitleEl = document.querySelector('.product__title');
    productTitleEl.innerHTML = product.title;

    const productPriceEl = document.querySelector('.product__price-value');
    if (productPriceEl) {
        productPriceEl.innerHTML = product.price;
    }

    const productDownloadEl = document.querySelector('.product__content_mode_download');
    if (productDownloadEl) {
        productDownloadEl.setAttribute('href', product.content);
    }
}