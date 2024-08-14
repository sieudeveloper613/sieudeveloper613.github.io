import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';
interface IFarm {
    qrcode: string;
    farmOwnerName: string;
    farmOwnerAddress:any;
    gardenCodeName: string;
    agricultureProduceName?:string;
    plantVarietyName?: string;
    plantVarietySupplierName?: string;
    lastFertilizing?: {
        fertilizerName?: string;
        fertilizerSupplierName?: string;
    }
    lastSpraying?: {
        pesticideName?: string;
        pesticideSupplierName?: string;
    }
    createdAt: Date;
    weight?: number;
}

interface IExportImport {
    status: string;
    owner: {
        permission: {
            role: string;
        }
        name: string;
        address: {
            addressLine: string;
        }
    }
    createdAt: Date;
    details: {
        transportServiceName: string;
        nameCompany?:string
    };
    nameCompany:string;
}

export interface IContainerDetail{
        productName:string,
        productlId?:string,
        quantityNumber: number,
        typeNumber:number,
        supplier:string,
        codeMaterial:string,
        idEX?:string
}
export interface IFind extends IFarm {
    farmgardent?: IFarm;
    farmxuatnhap?: IExportImport[];
    ex_agriculture_containerxuatnhap?: IExportImport[];
    split?:boolean;
    containerDetail?: IContainerDetail[] | [];
    ownerId:string;
    typePackage?:string,
    products_info?: ProductsNamesResponse.IData
}

const find = async (qrcode: string): TAPIResponse<IFind> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'agricultural-container', 'find-traceability'].join(
        '/',
    );

    try {
        const res = await axiosClient.get(url, {
            params: {
                qrcode,
            }
        });

        if (res.status !== 200) {
            return {
                status: 'failure',
                statusCode: res.status,
            };
        }

        return {
            status: 'successfully',
            data: res.data,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default find;