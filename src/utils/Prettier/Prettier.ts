import preProcess from '../preProcess';

namespace Prettier {
    const phoneNumberRegex1 = /^(\d{3})(\d{3})(\d{4})$/i;
    const phoneNumberRegex2 = /^(\+\d{2})(\d{2})(\d{3})(\d{4})$/i;
    export const phoneNumber = (v: string, comma: string = ' ') => {
        const phoneNumberStandard = preProcess.removeAllSpace(v);

        const matchResult1 = phoneNumberStandard.match(phoneNumberRegex1);
        // ('0368337235').match(phoneNumberRegex1) = [
        //     '0368337235',
        //     '036',
        //     '833',
        //     '7235',
        //     index: 0,
        //     input: '0368337235',
        //     groups: undefined
        // ]
        if (matchResult1) {
            return matchResult1.slice(1, 4).join(comma);
        }

        const matchResult2 = phoneNumberStandard.match(phoneNumberRegex2);
        // ('+84368667326').match(phoneNumberRegex2) = [
        //     '+84368667326',
        //     '+84',
        //     '36',
        //     '866',
        //     '7326',
        //     index: 0,
        //     input: '+84368667326',
        //     groups: undefined
        // ]
        if (matchResult2) {
            return matchResult2.slice(1, 4).join(comma);
        }

        return v;
    };
}

export default Prettier;
