main();

function main() {
    const product = {
        text: 'Премиальный пакет',
        quantity: '1',
        price: {
            amount: '1000'
        },
        paymentSubjectType: 'service',
        paymentMethodType: 'full_prepayment',
        tax: '1'
    };

    const paymentFormService = {
        validatePaymentForm(form) {
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
        handleErrors(errors) {
            errors.forEach(error => {
                let wrapper = document.createElement('div');
                wrapper.innerHTML = '<div class="ym-hint">' + error.text + '</div>';
                wrapper.appendChild(error.field.cloneNode());
                wrapper.classList.add('ym-block-with-hint');
                error.field.parentNode.replaceChild(wrapper, error.field);
                wrapper.classList.add('ym-visible-hint');
                setTimeout(() => wrapper.classList.remove('ym-visible-hint'), 5000);
            });
        },
        buildReceipt(form) {
            const elEmail = this.getEmailField(form);

            const receipt = {
                customer: { email: elEmail.value },
                items: [product]
            };

            return JSON.stringify(receipt);
        }
    };

    init();

    function init() {
        const elForm = document.querySelector('.yoomoney-payment-form');
        elForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.target;

            const errors = paymentFormService.validatePaymentForm(form);
            if (0 < errors.length) {
                paymentFormService.handleErrors(errors);
                return;
            }

            form.querySelector('input[name="ym_merchant_receipt"]').value = paymentFormService.buildReceipt(form);
            form.querySelector('input[name="shopSuccessURL"]').value = `${location.origin}/payment/success`
            form.querySelector('input[name="shopFailURL"]').value = `${location.origin}/payment/fail`

            form.submit();
        });
    }
}