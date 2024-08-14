import create from './create';
import list from './list';
import listPartnerGroupOptions from './listOptionPartner';
import listUsersByPartnerGroupId from './listUserByIdPartner';
import remove from './remove';
import update from './update';

const traceabilityPartner = Object.freeze({
    create,
    update,
    remove,
    list,
    listUsersByPartnerGroupId,
    listPartnerGroupOptions,
});

export default traceabilityPartner;
