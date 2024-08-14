import create from './create';
import list from './list';
import listPartnerGroupOptions from './listOptionPartner';
import listPartnerEnterpriseOptions from './listPartnerEnterprice';
import listPartnerById from './listRoleById';
import listUsersByPartnerGroupId from './listUserByIdPartner';
import listUsersByRole from './listUserByRole';
import remove from './remove';
import update from './update';

const partner = Object.freeze({
    create,
    update,
    remove,
    list,
    listUsersByPartnerGroupId,
    listPartnerGroupOptions,
    listUsersByRole,
    listPartnerEnterpriseOptions,
    listPartnerById,
});

export default partner;
