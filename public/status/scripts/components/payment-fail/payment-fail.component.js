import { HttpStatus } from '../../../../scripts/services/http/enums/http-status.enum.js';
import { PaymentStatus } from '../../../../scripts/services/payment/enums/payment-status.enum.js';

export class PaymentFailComponent {

    setup(error) {
        const elPaymentFail = document.querySelector('.content_type_payment-fail');
        elPaymentFail.classList.remove('hidden');
        const elWaitStatus = document.querySelector('.content_type_wait-status');
        elWaitStatus.classList.add('hidden');

        const elLink = elPaymentFail.querySelector('.link-go-to-main');
        elLink.setAttribute('href', window.location.origin);

        const elHeader = elPaymentFail.querySelector('.content__header');
        const elMessagePrimary = elPaymentFail.querySelector('.message__line_type_primary');
        const elMessageSecondary = elPaymentFail.querySelector('.message__line_type_secondary');

        switch (error.status) {
            case HttpStatus.NOT_FOUND:
                elHeader.textContent = 'Отсутствует платеж';
                elMessagePrimary.textContent = [
                    'Выглядит так, что Вы ещё не оплатили заказ',
                    'и здесь Вы случайный гость :)',
                    'Если это так, то просто нужно проследовать на форму заказа и оплатить.'
                ].join(' ');
                elMessageSecondary.textContent = [
                    'Если Вы оплатили, но мы не смогли найти тому подтверждение,',
                    'пожалуйста, свяжитесь со мной! Мы всё решим!'
                ].join(' ');
                break;
            case HttpStatus.FORBIDDEN:
                switch (error.details.paymentStatus) {
                    case PaymentStatus.CANCELED:
                        elHeader.textContent = 'Платеж отменен';
                        elMessagePrimary.textContent = [
                            'Либо Вы отменили платеж, либо не завершили его и',
                            'истекло допустимое время для его завершения.',
                            'Просто нужно проследовать на форму заказа и выполнить оплату.'
                        ].join(' ');
                        elMessageSecondary.textContent = [
                            'Если Вы видите эту страницу, но убеждены, что всё должно быть в порядке,',
                            'пожалуйста, свяжитесь со мной! Мы всё решим!'
                        ].join(' ');
                        break;
                    case PaymentStatus.PENDING:
                        elHeader.textContent = 'Платеж не завершен';
                        elMessagePrimary.textContent = [
                            'Похоже на то, что Вы не завершили оплату.',
                            'Если это так, то просто нужно проследовать на форму заказа',
                            'и пройти оплату до конца.'
                        ].join(' ');
                        elMessageSecondary.textContent = [
                            'Если Вы всё же оплатили, то попробуйте обновить страницу через несколько минут.',
                            'Вы также можете просто закрыть эту страницу и дождаться',
                            'письма об успешной оплате на почту. Как только оплата придёт,',
                            'мы незамедлительно его Вам пришлём!',
                            'Если Вы его не получите в ближайшее время, пожалуйста,',
                            'свяжитесь со мной! Мы всё решим!'
                        ].join(' ');
                        break;
                    case PaymentStatus.WAITING_FOR_CAPTURE:
                        elHeader.textContent = 'Платеж не завершен';
                        elMessagePrimary.textContent = [
                            'Похоже на то, что Вы оплатили, но деньги ещё в пути.',
                            'Если это так, то просто обновите, пожалуйста,',
                            'страницу через некоторое время.',
                            'Вы также можете просто закрыть эту страницу и дождаться',
                            'письма об успешной оплате на почту. Как только оплата придёт,',
                            'мы незамедлительно его Вам пришлём!',
                        ].join(' ');
                        elMessageSecondary.textContent = [
                            'Если Вы его не получите в ближайшее время, пожалуйста,',
                            'свяжитесь со мной! Мы всё решим!'
                        ].join(' ');
                        break;
                    default:
                        console.error('unexpected payment status!');
                }
                break;
            default:
                console.error('something totally wrong happened!');
        }
    }
}