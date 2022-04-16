export class InfoSection {

    setup(product) {
        const elSection = document.querySelector('.section-info');

        elSection.querySelector('.product__sprint-full-name').textContent = product.sprintFullName;
        elSection.querySelector('.product__bonus-recipe-name').textContent = product.bonusRecipeName;
        Array.from(elSection.querySelectorAll('.product__offer-name')).map(el => el.textContent = product.offerName);
    }
}