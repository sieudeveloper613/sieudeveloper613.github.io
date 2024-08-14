import api from '../../api';
import preProcess from '../preProcess';

export type TJsTypes = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

export type TValidateFunction = (v: any) => boolean | Promise<boolean>;
export type TValidateKernel<T> = Record<keyof T, TValidateFunction | any>;

export const check = async <T>(obj: T, kernel: TValidateKernel<T> | any): Promise<boolean> => {
    console.log('nhatlog---check',obj,kernel)
    for (const [key, _validateKernel] of Object.entries(kernel)) {
        const value = (obj as any)[key];

        switch (typeof _validateKernel) {
            case 'function': {
                const validateFunc = _validateKernel as TValidateFunction;
                if (typeof validateFunc !== 'function') {
                    throw new Error(
                        'kernel must have the object value is a function with return type is boolean or object',
                    );
                }
                const validateResult = await validateFunc(value);
                if (!validateResult) return false;
                break;
            }
            case 'object': {
                if (typeof value !== 'object') return false;
                const validateResult = await check(value, _validateKernel);
                if (!validateResult) return false;
                break;
            }
            default: {
                throw new Error(
                    'kernel must have the object value is a function with return type is boolean or object',
                );
            }
        }
    }

    return true;
};

const emailRegex = /^([a-z0-9]+(\.)?)*([a-z0-9])+@[a-z]{1,10}.[a-z]{2,3}$/i;
export const email = (v: any): boolean => {
    if (typeof v !== 'string') return false;
    return emailRegex.test(v.trim());
};

export const emailExists = async (v: any): Promise<boolean> => {
    if (!email(v)) return false;

    const res = await api.globalApi.emailAlreadyExists(v);

    if (res.status === 'failure') {
        alert('Kết nối tới máy chủ thất bại !');
        return false;
    }

    return !res.data.alreadyExist;
};

const phoneNumberRegex = /^(((\+)\d{11})|(\d{10}))$/i;
export const phoneNumber = (v: any): boolean => {
    if (typeof v !== 'string') return false;
    const phoneNumberStandard = v.replace(/\s/g, '');
    return phoneNumberRegex.test(phoneNumberStandard);
};
export const phoneNumberNotRequired = (v: any): boolean => {
    if (v === "" || v === undefined ) return true;
    if (typeof v !== 'string' ) return false;
    const phoneNumberStandard = v.replace(/\s/g, '');
    return phoneNumberRegex.test(phoneNumberStandard);
};

export const minLengthWithTrim =
    (minLength: number) =>
        (v: any): boolean => {
            if (typeof v !== 'string') return false;
            return v.trim().length >= minLength;
        };
export const requireAndIsNum =
    () =>
        (v: any): boolean => {
            if (typeof v == 'string' && v.trim().length == 0) return false;
            const  numV = Number(v as string);
            return !isNaN(numV) && Number.isInteger(numV) && numV > 0;
        };

export const maxLengthWithTrim =
    (maxLength: number) =>
        (v: any): boolean => {
            if (typeof v !== 'string') return false;
            return v.trim().length <= maxLength;
        };

export const hasType =
    (types: TJsTypes[]) =>
        (v: any): boolean => {
            return types.includes(typeof v);
        };

export const withRegex =
    (regex: RegExp) =>
        (v: any): boolean => {
            if (typeof v !== 'string') return false;
            return regex.test(v);
        }; //=

const numberRegex = /^(\-)?\d+(\.)?\d*$/i;
export const isStrNumberWithRemoveAllSpace = (v: any): boolean => {
    if (typeof v !== 'string') return false;
    return numberRegex.test(preProcess.removeAllSpace(v));
};

export const checkCode =
    (minLength: number) =>
        (v: any): boolean => {
            if (typeof v !== 'string') return false;
            const _v = Number(v)
            return (v.trim().length >= minLength) && !isNaN(_v);
        };

export const smallerThan =
    (max: number) =>
        (v: any): boolean => {
            return Number(v) <= max;
        };

export const isNumber =
    () =>
        (v: any): boolean => {
            return !isNaN(v)
        };
export const isString =
    () =>
        (v: any): boolean => {
            return (typeof v == 'string')
        };
export const isArray =
    () =>
        (v: any): boolean => {
            return (Array.isArray(v))
        };
