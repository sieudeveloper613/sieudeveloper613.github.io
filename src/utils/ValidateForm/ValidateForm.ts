import { IValidateResult } from '../../core/types';
import Validate from '../Validate';

export const phoneNumber =
    (msg: string = 'Số điện thoại không hợp lệ') =>
    (v: string): IValidateResult => {
        if (!Validate.phoneNumber(v)) {
            return {
                status: 'invalid',
                invalidColor: 'red',
                message: msg,
            };
        }

        return {
            status: 'valid',
            invalidColor: '#000',
            message: '',
        };
    };

export const email =
    (msg: string = 'Email không hợp lệ') =>
    (v: string): IValidateResult => {
        if (!Validate.email(v)) {
            return {
                status: 'invalid',
                invalidColor: 'red',
                message: msg,
            };
        }

        return {
            status: 'valid',
            invalidColor: '#000',
            message: '',
        };
    };

export const withRegex =
    (regex: RegExp, msg: string) =>
    (v: string): IValidateResult => {
        if (!regex.test(v)) {
            return {
                status: 'invalid',
                invalidColor: 'red',
                message: msg,
            };
        }

        return {
            status: 'valid',
            invalidColor: '#000',
            message: '',
        };
    };
