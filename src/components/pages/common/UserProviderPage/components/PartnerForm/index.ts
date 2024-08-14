import api from '../../../../../../api';
import { EParticipantsRole, EResource, ETypeUser, EnterpriseRole } from '../../../../../../sharetype/TPermission';
import Validate from '../../../../../../utils/Validate';
import { IOption } from '../../../../../common/Selection';
import PartnerForm from './PartnerForm';
export namespace Self {
    export const KEY_SELECT = { partner: 'partner', participant: 'participant' };
    export const typeOptions = [
        { value: KEY_SELECT.partner, label: 'Đối tác' },
        { value: KEY_SELECT.participant, label: 'Đối tượng tham gia' },
    ] as IOption[];
    export const roleOptions = [
        { value: EParticipantsRole.processingFacility, label: 'Cở sở chế biến' },
        { value: EParticipantsRole.distributionCenter, label: 'Nhà phân phối' },
        { value: EParticipantsRole.restaurant, label: 'Nhà hàng' },
        { value: EParticipantsRole.retail, label: 'Cửa hàng bán lẻ - siêu thị' },
    ] as IOption[];
    export const roleEnterprise = [
        { value: EnterpriseRole.farmOrGarden, label: 'Trang trại' },
        { value: EnterpriseRole.processingFacility, label: 'Cở sở chế biến' },
        { value: EnterpriseRole.distributionCenter, label: 'Nhà phân phối' },
        { value: EnterpriseRole.dealerStore, label: 'Cửa hàng bán lẻ' },
        { value: EnterpriseRole.supermarket, label: 'Siêu thị' },
        { value: EnterpriseRole.restaurant, label: 'Nhà hàng' },
    ] as IOption[];
    export const roleOptionsMedicin = [
        { value: EParticipantsRole.processingFacility, label: 'Cở sở chế biến' },
        { value: EParticipantsRole.distributionCenter, label: 'Nhà phân phối' },
        { value: EParticipantsRole.drupStore, label: 'Nhà thuốc' },
        { value: EParticipantsRole.hospital, label: 'Bệnh viện' },
    ] as IOption[];
    // export const typeRole =
    //     {[EParticipantsRole.processingFacility]: 'Cở sở chế biến' ,
    //      [EParticipantsRole.distributionCenter]: 'Nhà phân phối' ,
    //      [EParticipantsRole.restaurant]: 'Nhà hàng' ,
    //      [EParticipantsRole.retail]: 'Cửa hàng bán lẻ - siêu thị',
    //      [EParticipantsRole.supermarket]: 'Siêu thị' ,
    //      [EParticipantsRole.drupStore]: 'Nhà thuốc' ,
    //      [EParticipantsRole.hospital]: 'Bệnh viện' }
    export const typeRole:any =
        {[EnterpriseRole.processingFacility]: 'Cở sở chế biến' ,
         [EnterpriseRole.distributionCenter]: 'Nhà phân phối' ,
         [EnterpriseRole.restaurant]: 'Nhà hàng' ,
         [EnterpriseRole.dealerStore]: 'Cửa hàng bán lẻ',
         [EnterpriseRole.supermarket]: 'Siêu thị' ,
         [EnterpriseRole.farmOrGarden]: 'Trang trại' ,
         [EnterpriseRole.enterprise]: 'Doanh nghiệp' }
    export const typeUser =
        {[ETypeUser.agriculturalProduce]: 'Nông sản' ,
         [ETypeUser.customerProducts]: 'Sản phẩm tiêu dùng',
         [ETypeUser.MeatProduce]: 'Đối tượng khác' ,
         [ETypeUser.fisheries]: 'Đối tượng khác' ,
         [ETypeUser.medicine]: 'Đối tượng khác' ,
         [ETypeUser.other]: 'Đối tượng khác' ,
         [ETypeUser.molluscs]: 'Đối tượng khác' ,
         [ETypeUser.shippingService]: 'Đối tượng khác' ,
         [ETypeUser.enterprise]: 'Đối tượng khác' }
    
    
     
    export const title = 'Các thành phần tham gia';
    export const contextApi = api.user;
    export const validatorContext = Object.freeze({
        partnerGroupSelection: Validate.minLengthWithTrim(1),
        partnerSelection: Validate.minLengthWithTrim(1),
    });
}
export default PartnerForm;
