import api from '../../../../api';
import ParticipantsFormData from '../../../../sharetype/form-data/resources/ParticipantsFormData';
import ParticipantsResponse from '../../../../sharetype/response/resources/ParticipantsResponse';

import IAddress from '../../../../sharetype/types/IAddress';
import Validate from '../../../../utils/Validate';
import ParticipantsPage from './ParticipantsPage';

export namespace Self {
    export type TFormData = Partial<
        Omit<ParticipantsFormData.IData, 'address'> & {
            address: Partial<IAddress>;
        }
    >;

    export type TFormDataProcessed = ParticipantsFormData.IData;
    export type TCreateFormData = ParticipantsFormData.ICreate;
    export type TUpdateFormData = ParticipantsFormData.IUpdate;
    export type TResponseData = ParticipantsResponse.TList;

    export const contextApi = api.participants;

    export const validateKernel = Object.freeze({
        name: Validate.minLengthWithTrim(1),
        phone: Validate.phoneNumber,
        address: {
            city: Validate.minLengthWithTrim(1),
            district: Validate.minLengthWithTrim(1),
            ward: Validate.minLengthWithTrim(1),
            addressLine: Validate.minLengthWithTrim(1),
        },
        email: Validate.email, // using Validate.emailExists if want to check does the email already exist?
    } as Validate.TValidateKernel<TFormDataProcessed>);
}

export default ParticipantsPage;
