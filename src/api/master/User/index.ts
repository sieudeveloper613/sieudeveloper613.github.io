import create from './create';
import list from './list';
import remove from './remove';
import update from './update';
import listPartner from './listPartner';
import listParticipants from './listParticipants';
import uploadCertificate from './uploadCertificate';
import deleteCertificate from './deleteCertificate';
import deleteManyCertificate from './deleteManyCertificate';
import deleteDraftCertificate from './deleteDraftCertificate';
import listAllParticipants from './listAllParticipants';
import listAllCity from './listAllCity';
import listAllDistrict from './listAllDistrict';
import listAllWard from './listAllWard';
import modifyProvince from './ModifyProvince';
import listSearch from './listSearch';
const user = {
    update,
    remove,
    create,
    list,
    listPartner,
    listParticipants,
    uploadCertificate,
    deleteManyCertificate,
    deleteCertificate,
    deleteDraftCertificate,
    listAllParticipants,
    listAllWard,
    listAllCity,
    listAllDistrict,
    modifyProvince,
    listSearch
    
};

export default user;
