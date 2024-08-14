import api from '../../../../../../api';
import ProductsNamesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';
import messageAlert from '../../../../../../utils/messageAlert';
import Validate from '../../../../../../utils/Validate';
import NameProductPage from './NameProductPage';

export namespace Self {
    export const apiContext = api.agriculturalProduce.wholesaleMarkets.productName;
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });
    export const create = async (formData: ProductsNamesFormData.ICreate) => {
        const res = await Self.apiContext.create(formData);

        if (res.status === 'failure') {
            return messageAlert('error', 'Tạo thất bại !');
        }

        return messageAlert('success', 'Tạo thành công !');
    };
    export const update = async (id: string, formData: ProductsNamesFormData.IUpdate) => {
        const res = await Self.apiContext.update(id, formData);

        if (res.status === 'failure') {
            return messageAlert('error', 'Cập nhật thất bại !');
        }

        return messageAlert('success', 'Cập nhật thành công !');
    };
}

export default NameProductPage;
