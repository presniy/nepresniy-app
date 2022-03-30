main();

function main() {
    const _suppMethods = {
        validatePaymentForm(form) {
            if (!this.isNeedReceipt(form)) {
                return [];
            }

            let errors = [];
            const elEmail = this.getEmailField(form);
            const contactPattern = /^([+]?[0-9]{9})|((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})))$/;
            if (elEmail !== null && !contactPattern.test(String(elEmail.value).toLowerCase())) {
                errors.push({ field: elEmail, text: 'Укажите email для чека' });
            }

            return errors;
        },
        getEmailField(form) {
            return form.querySelector('input[name="cps_email"]');
        },
        formErrorHandler(errors) {
            errors.forEach(function (error) {
                let wrapper = document.createElement('div');
                wrapper.innerHTML = '<div class="ym-hint">' + error.text + '</div>';
                wrapper.appendChild(error.field.cloneNode());
                wrapper.classList.add('ym-block-with-hint');
                error.field.parentNode.replaceChild(wrapper, error.field);
                wrapper.classList.add('ym-visible-hint');
                setTimeout(() => wrapper.classList.remove('ym-visible-hint'), 5000);
            });
        },
        isNeedReceipt(form) {
            let products = form.querySelectorAll('.ym-product');
            return 0 < products.length;
        },
        buildReceipt(form) {
            let receipt = { customer: {}, items: [] };
            let contactInput = this.getEmailField(form);
            receipt.customer.email = contactInput.value;

            let products = form.querySelectorAll('.ym-product');
            products.forEach(function (product) {
                receipt.items.push({
                    text: product.querySelector('input[name="text"]').value,
                    quantity: product.querySelector('input[name="quantity"]').value,
                    price: {
                        amount: product.querySelector('input[name="price"]').value
                    },
                    paymentSubjectType: product.querySelector('input[name="paymentSubjectType"]').value,
                    paymentMethodType: product.querySelector('input[name="paymentMethodType"]').value,
                    tax: product.querySelector('input[name="tax"]').value
                });
            });

            return JSON.stringify(receipt);
        }
    };

    init();

    function init() {
        const elForm = document.querySelector('.yoomoney-payment-form');
        elForm.addEventListener('submit', e => {
            e.preventDefault();
            let form = e.target;

            let errors = _suppMethods.validatePaymentForm(form);
            if (0 < errors.length) {
                _suppMethods.formErrorHandler(errors);
                return;
            }

            if (_suppMethods.isNeedReceipt(form)) {
                form.querySelector('input[name="ym_merchant_receipt"]').value = _suppMethods.buildReceipt(form);
            }

            form.submit();
        });
    }
}