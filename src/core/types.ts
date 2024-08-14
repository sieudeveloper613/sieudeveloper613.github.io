export interface IValidateResult {
    status: 'valid' | 'invalid';
    invalidColor?: string;
    message?: string;
}
