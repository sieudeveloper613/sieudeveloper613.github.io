import create from './create';
import list from './list';
import listEnterprise from './listEnterprise';
import listPartnerById from './listPartnerById'
import remove from './remove';
import update from './update';

const partner = Object.freeze({
    create,
    update,
    remove,
    list,
    listEnterprise,
    listPartnerById,  
});

export default partner;
