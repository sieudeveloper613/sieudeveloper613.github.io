import api from "../../../../../../api";
import Validate from "../../../../../../utils/Validate";
import AccessInfoManagePage from "./AccessInfoManagePage";
import ProductNamesFormData from "../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData";


export namespace Self {
    export const apiContext = api.enterprise.product;
    export interface IInputs {
        id: string,
        title: string,
        content: string
    };

    export type TCreateFormData = ProductNamesFormData.ICreate;

    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });

    export const title = "sản phẩm";
}

export default AccessInfoManagePage;
