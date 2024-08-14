import UserFormData from '../../../../sharetype/form-data/resources/master/UserFormData';
import IAddress from '../../../../sharetype/types/IAddress';
import Validate from '../../../../utils/Validate';
import UserProviderPage from './UserProviderPage';

export type TFormData = Partial<
    Omit<UserFormData.IData, 'address'> & {
        address: Partial<IAddress>;
    }
>;

export const userAccountValidate = Object.freeze({
    name: Validate.minLengthWithTrim(1),
    phone: Validate.phoneNumber,
    address: {
        city: Validate.minLengthWithTrim(1),
        district: Validate.minLengthWithTrim(1),
        ward: Validate.minLengthWithTrim(1),
        addressLine: Validate.minLengthWithTrim(1),
    },
    email: Validate.email,
    taxCode: Validate.minLengthWithTrim(10),
});
export const userAccountValidate_Agri = Object.freeze({
    name: Validate.minLengthWithTrim(1),
    gln: Validate.minLengthWithTrim(1),
    address: {
        city: Validate.minLengthWithTrim(1),
        district: Validate.minLengthWithTrim(1),
        ward: Validate.minLengthWithTrim(1),
        addressLine: Validate.minLengthWithTrim(1),
    },
    email: Validate.email,
    taxCode: Validate.minLengthWithTrim(10),
});
export const userAccountValidate_Orther = Object.freeze({
    phone: Validate.phoneNumberNotRequired,
    name: Validate.minLengthWithTrim(1),
    gln: Validate.minLengthWithTrim(1),
    address: {
        city: Validate.minLengthWithTrim(1),
        district: Validate.minLengthWithTrim(1),
        ward: Validate.minLengthWithTrim(1),
        addressLine: Validate.minLengthWithTrim(1),
    },
    email: Validate.email,
});

export default UserProviderPage;
