var kassaConstructForm = kassaConstructForm || {};
(function (namespace) {
    if (typeof namespace.main !== 'undefined') {
        namespace.main.updateHandlers();
        return namespace;
    }

    namespace.main = (function () {
        const _suppMethods = {
            formatPrice(price) {
                return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
            },
            validatePaymentForm(form) {
                let errors = [];
                let contactInput = null;

                if (this.isNeedReceipt(form)) {
                    contactInput = this.getAvailableCustomerContact(form);
                }

                const contactPattern = /^([+]?[0-9]{9})|((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})))$/;
                if (contactInput !== null && !contactPattern.test(String(contactInput.value).toLowerCase())) {
                    let inputType = contactInput.getAttribute('name');

                    let errorText = 'Укажите телефон или email для чека';
                    if (inputType === 'cps_phone') {
                        errorText = 'Укажите телефон для чека';
                    } else if (inputType === 'cps_email') {
                        errorText = 'Укажите email для чека';
                    }

                    errors.push({ field: contactInput, text: errorText });
                }

                return errors;
            },
            getAvailableCustomerContact(form) {
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
                    setTimeout(() => (wrapper.classList.remove('ym-visible-hint')), 5000);
                });
            },
            isNeedReceipt(form) {
                let products = form.querySelectorAll('.ym-product');
                return products.length > 0;
            },
            buildReceipt(form) {
                let receipt = { customer: {}, items: [] };
                let contactInput = this.getAvailableCustomerContact(form);

                if (contactInput.value.indexOf('@') > -1) {
                    receipt.customer.email = contactInput.value;
                } else {
                    receipt.customer.phone = contactInput.value;
                }

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

        const _handlers = {
            sendForm(e) {
                e.preventDefault();
                let form = e.target;


                let errors = _suppMethods.validatePaymentForm(form);
                if (errors.length > 0) {
                    _suppMethods.formErrorHandler(errors);
                    return;
                }

                if (_suppMethods.isNeedReceipt(form)) {
                    form.querySelector('input[name="ym_merchant_receipt"]').value = _suppMethods.buildReceipt(form);
                }

                form.submit();
            }
        };

        const eventChange = new Event('change', { bubbles: true, cancelable: true });

        let _forms;

        /**
         * Constructor
         */
        (function __construct() {
            _setForms();
            _initHandlers();
        })();

        return {
            updateHandlers() {
                _setForms();
                _forms.forEach(function (form) {
                    _initFormHandlers(form);
                    _calculateDefaultValues(form);
                });
            }
        };

        function _setForms() {
            _forms = document.querySelectorAll('.yoomoney-payment-form');
        }

        function _initHandlers() {
            _forms.forEach(function (form) {
                _initFormHandlers(form);
                _calculateDefaultValues(form);
            });
        }

        function _initFormHandlers(form) {
            if (form.hasAttribute('data-active-listeners')) {
                return;
            }
            form.addEventListener('submit', _handlers.sendForm.bind(_handlers));
            form.setAttribute('data-active-listeners', 'true');
        }

        function _calculateDefaultValues(form) {
            setTimeout(function () {
                let inputs = form.querySelectorAll('.ym-count-input');
                inputs.forEach(function (input) {
                    input.querySelector('.ym-input').dispatchEvent(eventChange);
                });
            }, 500);
        }
    })();
})(kassaConstructForm);